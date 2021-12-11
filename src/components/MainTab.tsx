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
import _ from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { GET_TRANSACTIONS_BY_ADDRESS, GET_TRANSACTIONS_BY_MONTH } from '../utils/query';
import { useSelector } from 'react-redux';
import { BarChart } from "react-native-gifted-charts";
import moment from 'moment';
import Spinner from 'react-native-spinkit';

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
  },
  footerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5
  },
  incomeText: {
    fontSize: 14,
    fontFamily: 'Quicksand-Medium',
    marginRight: 20,
    color: '#936ee3',
  },
  outcomeText: {
    fontSize: 14,
    fontFamily: 'Quicksand-Medium',
    color: 'gray',
  },
  roundBox: {
    height: 10,
    width: 10,
    borderRadius: 30,
    marginRight: 5
  }
});

const renderItem = ({ item }: any, web3: any, defaultAddress: any, accounts: any) => {
  const getAccountName = () => {
    const found = accounts.length > 0 && accounts.findIndex((acc: any) => acc.address.toLowerCase() === item?.to.toLowerCase());
    if(found !== -1) {
      return 'Account '+(found + 1);
    } else {
      return item?.to;
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
        {defaultAddress && defaultAddress === item?.from ? (
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
  const [loader, setLoader] = useState(true)
  const [pageLimit, setPageLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [txnList, setTxnList] = useState<any>([]);

  const { web3, defaultAddress, accounts } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      defaultAddress: wallet?.defaultAddress,
      accounts: wallet?.accounts,
    };
  });

  const [getTxnList, { loading, error, data, fetchMore }] = useLazyQuery(GET_TRANSACTIONS_BY_ADDRESS, { errorPolicy: 'all' });

  useEffect(() => {
    setTxnList([]);
    setLoader(true);
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
      setLoader(false);
      console.log(error, "Transction list Error");
    }
    if (data) {
      setLoader(false);
      data?.transactionsByAddressWithPagination?.transactions?.length > 0 && 
      setTxnList([..._.uniqBy(data?.transactionsByAddressWithPagination?.transactions, 'id')]);
    }
  }, [data, loading]);

  const handleFetchMore = () => {
    defaultAddress && getTxnList({
      variables: {
        offset: offset + 1,
        limit: pageLimit + pageLimit,
        address: defaultAddress,
        sortBy: 'DATE',
      },
    })
    setOffset(offset + 1);
    setPageLimit(pageLimit + pageLimit);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: 15 }}>
      <Spinner isVisible={loader} size={50} type={'9CubeGrid'} color="#b27f29"/>
      {!loader && ( txnList.length > 0 ? (
        <FlatList
          data={txnList}
          renderItem={(item) => renderItem(item, web3, defaultAddress, accounts)}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={handleFetchMore}
        />
      ) : (
        <Text style={styles.noTxnText}>No Transactions Found</Text>
      ))}
    </View>
  );
};

const SavingTxnList = () => {
  const [txnList, setTxnList] = useState<any>([]);
  const [loader, setLoader] = useState(true)
  const { defaultAddress, web3 } = useSelector(({ wallet }: any) => {
    return {
      defaultAddress: wallet?.defaultAddress,
      web3: wallet?.web3,
    };
  });

  const [getTxnByMonth, { loading, error, data }] = useLazyQuery(GET_TRANSACTIONS_BY_MONTH);

  useEffect(() => {
    setTxnList([]);
    setLoader(true);
    defaultAddress && getTxnByMonth({
      variables: {
        address: defaultAddress,
      },
    })
  }, [defaultAddress])


  useEffect(() => {
    if (error) {
      setLoader(false);
      console.log(error, "Saving list Error");
    }
    if (data) {
      setTxnList([]);
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
      setLoader(false);
      FilterTxns.length > 0 && setTxnList(FilterTxns);
    }
  }, [data, loading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: 5, marginBottom: 20, marginLeft: -20 }}>
      <Spinner isVisible={loader} size={50} type={'9CubeGrid'} color="#b27f29"/>
      <View style={{ marginBottom: 15 }}>
        {!loader && txnList.length > 0 && 
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
      <View style={styles.footerBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.roundBox, { backgroundColor: '#936ee3' }]} />
          <Text style={styles.incomeText}>Income</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.roundBox, { backgroundColor: '#363853' }]} />
          <Text style={styles.outcomeText}>Outcome</Text>
        </View>
      </View>
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
