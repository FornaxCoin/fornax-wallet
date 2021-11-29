import * as React from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

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
});

const FirstRoute = () => (
  <ScrollView style={styles.scrollTable}>
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.roundIcon} />
          <View>
            <Text style={styles.symbolText}>FRX</Text>
            <Text style={styles.descriptionText}>Top up</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: 130,
          }}>
          <Text style={[styles.minusIcon, { color: '#ff3333' }]}>-</Text>
          <Text style={styles.amountText}> FRX 200.000</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.roundIcon, { backgroundColor: '#4368c7' }]} />
          <View>
            <Text style={styles.symbolText}>C-Wallet</Text>
            <Text style={styles.descriptionText}>Income</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', width: 120 }}>
          <Text style={[styles.minusIcon, { color: '#52e34f' }]}>+</Text>
          <Text style={styles.amountText}> $ 980.000</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.roundIcon} />
          <View>
            <Text style={styles.symbolText}>FRX</Text>
            <Text style={styles.descriptionText}>Top up</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: 130,
          }}>
          <Text style={[styles.minusIcon, { color: '#ff3333' }]}>-</Text>
          <Text style={styles.amountText}> FRX 200.000</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.roundIcon} />
          <View>
            <Text style={styles.symbolText}>FRX</Text>
            <Text style={styles.descriptionText}>Top up</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: 130,
          }}>
          <Text style={[styles.minusIcon, { color: '#ff3333' }]}>-</Text>
          <Text style={styles.amountText}> FRX 200.000</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'transparent' }} />
);

const renderScene = SceneMap({
  transaction: FirstRoute,
  savings: SecondRoute,
  bill: SecondRoute,
});

const MainTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'transaction', title: 'Transactions' },
    { key: 'savings', title: 'Savings' },
    { key: 'bill', title: 'Bill' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={'#363853'}
      inactiveColor={'#ffffff'}
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
        marginHorizontal: 54,
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
