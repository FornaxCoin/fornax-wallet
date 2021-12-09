import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  // heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TRANSACTIONS_BY_ADDRESS, GET_TRANSACTIONS_BY_MONTH } from '../utils/query';
import { useSelector } from 'react-redux';
import { BarChart } from "react-native-gifted-charts";
import moment from 'moment';

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  roundIcon: {
    height: 60,
    width: 60,
    backgroundColor: '#936ee3',
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 20,
  },
  symbolText: {
    fontFamily: 'Quicksand-Medium',
    color: '#363853',
    fontSize: 18,
    marginBottom: 4,
    width: wp('35'),
  },
  descriptionText: {
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    fontSize: 14,
  },
  minusIcon: {
    fontFamily: 'Quicksand-Medium',
    color: '#363853',
    fontSize: 20,
    marginRight: 10,
    paddingBottom: 10,
  },
  amountText: {
    fontFamily: 'Quicksand-Medium',
    color: '#363853',
    fontSize: 16,
    paddingTop: 5,
  },
  scrollTable: {
    flex: 1,
  },
  noTxnText: {
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  }
});

const renderItem = ({ item }: any, web3: any, defaultAddress: any, accounts: any) => {
  const getAccountName = () => {
    const found = accounts.length > 0 && accounts.findIndex((acc: any) => acc.address.toLowerCase() === item?.to.toLowerCase());
    if(found !== -1) {
      return 'Account '+(found + 1);
    } else {
      return item?.from;
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.roundIcon, { backgroundColor: '#4368c7' }]} />
        <View>
          <Text 
            style={styles.symbolText}
            numberOfLines={1}
            ellipsizeMode="middle"
          >{getAccountName()}</Text>
          <Text style={styles.descriptionText}>Income</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center', width: 120 }}>
        {defaultAddress && defaultAddress === item.from ? (
          <Text style={[styles.minusIcon, { color: '#ff3333' }]}>-</Text>
        ):(
          <Text style={[styles.minusIcon, { color: '#52e34f' }]}>+</Text>
        )}
        <Text style={styles.amountText}> $ {web3 && parseFloat(web3?.utils?.fromWei(item.value)).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const TransactionList = () => {
  const pageLimit = 10;
  const [offset, setOffset] = useState(0);
  const [txnList, setTxnList] = useState<any>([]);

  const { web3, defaultAddress, accounts } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      defaultAddress: wallet?.defaultAddress,
      accounts: wallet?.accounts,
    };
  });

  const [getTxnList, { loading, error, data }] = useLazyQuery(GET_TRANSACTIONS_BY_ADDRESS, { errorPolicy: 'all' });

  useEffect(() => {
    setTxnList([]);
    defaultAddress && getTxnList({
      variables: {
        offset,
        limit: pageLimit,
        address: defaultAddress,
        sortBy: 'DATE',
      },
    })
  }, [defaultAddress])

  useEffect(() => {
    setOffset(0);
    if (error) {
      console.log(error, loading);
    }
    if (data) {
      setTxnList([]);
      data?.transactionsByAddressWithPagination?.transactions?.length > 0 && setTxnList(data?.transactionsByAddressWithPagination?.transactions);
    }
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 15 }}>
     {txnList.length > 0 ? (
        <FlatList
          data={txnList}
          renderItem={(item) => renderItem(item, web3, defaultAddress, accounts)}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noTxnText}>No Transactions Found</Text>
      )}
    </View>
  );
};

const SavingTxnList = () => {
  const [txnList, setTxnList] = useState<any>([]);
  const { defaultAddress, web3 } = useSelector(({ wallet }: any) => {
    return {
      defaultAddress: wallet?.defaultAddress,
      web3: wallet?.web3,
    };
  });

  const [getTxnByMonth, { loading, error, data }] = useLazyQuery(GET_TRANSACTIONS_BY_MONTH);

  useEffect(() => {
    defaultAddress && getTxnByMonth({
      variables: {
        address: '0xC21a4AD429e4E2E194816d989d9bBd255c67Fd6C',
      },
    })
  }, [defaultAddress])


  useEffect(() => {
    if (error) {
      console.log(error, loading, "saving Error");
    }
    if (data) {
      const newData = data?.transactionsByMonth?.length > 0 && data?.transactionsByMonth.slice(data?.transactionsByMonth?.length - 6, data?.transactionsByMonth?.length)
      const FilterTxns = newData?.length > 0 && newData?.reduce((newtxn: any, txn: any) => {
        newtxn.push({
          value: parseInt(web3.utils.fromWei(txn.fromTotal, 'ether'), 10),
          label: moment.unix(txn.month).format('MMM'),
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#363853',
        }, {
          value: parseInt(web3.utils.fromWei(txn.toTotal, 'ether'), 10),
          frontColor: '#936ee3',
        })      
        return newtxn;
      }, []);
      FilterTxns.length > 0 && setTxnList(FilterTxns);
    }
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5, marginBottom: 10, marginLeft: -70 }}>
      {txnList.length > 0 && 
        <BarChart
          data={txnList}
          barWidth={10}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          hideAxesAndRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          width={wp('90')}
        />
      }
    </View>
  );
};

const renderScene = SceneMap({
  transaction: TransactionList,
  savings: SavingTxnList,
});

const MainTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'transaction', title: 'Transactions' },
    { key: 'savings', title: 'Savings' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={'#ffffff'}
      inactiveColor={'#363853'}
      renderLabel={({ route, color }) => {
        if (route.key === 'transaction') {
          return (
            <Text style={[styles.titleText, { width: 260, color }]}>
              {route.title}
            </Text>
          );
        } else {
          return (
            <Text style={[styles.titleText, { color }]}>{route.title}</Text>
          );
        }
      }}
      indicatorStyle={{
        backgroundColor: '#5671ff',
        width: 20,
        height: 4,
        marginHorizontal: 70,
        marginTop: 30,
      }}
      style={{
        backgroundColor: 'transparent',
      }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default MainTab;
