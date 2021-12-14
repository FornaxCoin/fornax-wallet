import * as React from 'react';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';
const HomeImg = require('../../assets/images/Homemini.png');
const TransferImg = require('../../assets/images/transfer.png');
const ScanImg = require('../../assets/images/Scan.png');
const PayImg = require('../../assets/images/pay.png');
const TopupImg = require('../../assets/images/Iconly_Curved_Plusmini.png');

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#363853',
    borderRadius: 30,
    padding: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
    marginHorizontal: 10,
  },
  icon: {
    height: 26,
    width: 24,
    marginBottom: 5,
  },
  scanicon: {
    // height: 26,
    // width: 24,
    // marginBottom: 50,
    // backgroundColor: 'red',
    position: 'absolute',
    top:-20,
  },
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
    color: 'white',
  },
  scanLabel:{
    marginTop:32,
  },
  scanTab: {
    width: 72,
    height: 72,
    backgroundColor: '#936ee3',
    borderRadius: 30,
    marginLeft:-61,
    position: 'absolute',
    // right: wp(35),
    left: wp(50),
    top: -40,
    // left: 134,
    // right: 0,
    bottom: 0,
  },
  scanIcon: {
    // marginBottom: 28,
    // marginTop: -18,
  },
});

const NavTab = ({ navigate }: any) => {
  const routes = [
    { key: 'home', title: 'Home', icon: HomeImg, navigate: 'Dashboard' },
    {
      key: 'transfer',
      title: 'Transfer',
      icon: TransferImg,
      navigate: 'Transfer',
      // navigate: 'ConfirmTransaction',
    },
    { key: 'scan', title: 'Scan', icon: ScanImg, navigate: 'Scan' },
    { key: 'pay', title: 'Pay', icon: PayImg, navigate: 'Pay' },
    { key: 'topUp', title: 'Top up', icon: TopupImg, navigate: 'Dashboard' },
  ];

  return (
    <View style={styles.tabbar}>
      <View style={styles.tab}>
        <View style={styles.scanTab} />
        {routes.length > 0 &&
          routes.map((route, index) => (
            <Animated.View key={index} style={[styles.item]}>
              <Pressable onPress={() => navigate(route.navigate)}>
                <Image
                  source={route.icon}
                  style={[styles.icon, route.key === 'scan' && styles.scanIcon && styles.scanicon]}
                />
                <Text style={[styles.label, route.key === 'scan' && styles.scanLabel]}>{route.title}</Text>
              </Pressable>
            </Animated.View>
          ))}
      </View>
    </View>
  );
};

export default NavTab;
