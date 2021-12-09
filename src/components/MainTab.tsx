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
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 20, frontColor: '#936ee3'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 40, frontColor: '#936ee3'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 25, frontColor: '#936ee3'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 20, frontColor: '#936ee3'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 40, frontColor: '#936ee3'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#363853',
    },
    {value: 30, frontColor: '#936ee3'},
  ];

  const { defaultAddress } = useSelector(({ wallet }: any) => {
    return {
      defaultAddress: wallet?.defaultAddress,
    };
  });

  const [getTxnByMonth, { loading, error, data }] = useLazyQuery(GET_TRANSACTIONS_BY_MONTH);

  useEffect(() => {
    defaultAddress && getTxnByMonth({
      variables: {
        address: defaultAddress,
      },
    })
  }, [defaultAddress])


  useEffect(() => {
    if (error) {
      console.log(error, loading, "saving Error");
    }
    if (data) {
      const FilterTxns = data?.transactionsByMonth?.length > 0 && data?.transactionsByMonth?.reduce((newtxn: any, txn: any) => {
        newtxn.push({
          value: 65,
          label: moment.unix(txn.month).format('MMM'),
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#363853',
        })
        return newtxn;
      }, []);
      FilterTxns.length > 0 && setTxnList(FilterTxns);
    }
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5, marginBottom: 10, marginLeft: -40 }}>
      <BarChart
        data={barData}
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
        width={wp('80')}
      />
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
