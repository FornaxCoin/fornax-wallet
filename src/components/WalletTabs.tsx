import * as React from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  // heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const DownArrowImg = '../../assets/images/Bottommini.png';

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
    fontSize: 14,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  bankText: {
    fontSize: 16,
    color: '#363853',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
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
    color: 'white',
    fontSize: 28,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
  scrollTable: {
    flex: 1,
  },
  bankBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: wp('80'),
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  roundBox: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 15,
  },
  downIconBorder: {
    width: 25,
    height: 25,
    borderColor: '#363853',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 15,
  },
  downIcon: {
    height: 5,
  },
});

const FirstRoute = () => (
  <ScrollView style={styles.scrollTable}>
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Text style={styles.amountText}>FRX 830.164</Text>
        <Text style={styles.descriptionText}>This Month</Text>
        <View style={{ marginTop: 10 }}>
          <View style={styles.bankBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.roundBox, { backgroundColor: '#4368c7' }]} />
              <Text style={styles.bankText}>Bank</Text>
            </View>
            <View style={styles.downIconBorder}>
              <Image source={require(DownArrowImg)} style={styles.downIcon} />
            </View>
          </View>
          <View style={styles.bankBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.roundBox, { backgroundColor: '#936ee3' }]} />
              <Text style={styles.bankText}>Bank</Text>
            </View>
            <View style={styles.downIconBorder}>
              <Image source={require(DownArrowImg)} style={styles.downIcon} />
            </View>
          </View>
          <View style={styles.bankBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.roundBox, { backgroundColor: '#fa8315' }]} />
              <Text style={styles.bankText}>Fintech</Text>
            </View>
            <View style={styles.downIconBorder}>
              <Image source={require(DownArrowImg)} style={styles.downIcon} />
            </View>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'transparent' }} />
);

const renderScene = SceneMap({
  balance: FirstRoute,
  spent: SecondRoute,
});

const WalletTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'balance', title: 'Balance' },
    { key: 'spent', title: 'Spent' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={'#ffffff'}
      inactiveColor={'#bdbdbd'}
      renderLabel={({ route, color }) => (
        <Text style={[styles.titleText, { color }]}>{route.title}</Text>
      )}
      indicatorStyle={{
        backgroundColor: '#5671ff',
        width: 15,
        height: 4,
        marginHorizontal: 75,
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

export default WalletTabs;
