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
const TransferImg = require('../../assets/images/Iconly_Curved_Plane.png');
const ScanImg = require('../../assets/images/Scanmini.png');
const PayImg = require('../../assets/images/Iconly_Curved_Upload.png');
const TopupImg = require('../../assets/images/Iconly_Curved_Plusmini.png');

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#363853',
    borderRadius: hp(3),
    padding: hp(1),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
    marginHorizontal: 10,
    flex: 0,
    flexDirection: 'column',
  },
  icon: {
    resizeMode:"contain",
    height: 26,
    width: 26,
    marginBottom: 5,
  },
  scanicon: {
    position: 'absolute',
    top:-hp(2.7),
    left: -26/2,
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
    width: hp(8),
    height: hp(8),
    backgroundColor: '#936ee3',
    borderRadius: hp(3.5),
    position: 'absolute',
    right: 0,
    left: -hp(8)/2,
    top: -hp(5),
  },
  scanIcon: {
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
    },
    { key: 'scan', title: 'Scan', icon: ScanImg, navigate: 'Scan' },
    { key: 'pay', title: 'Pay', icon: PayImg, navigate: 'Pay' },
    { key: 'topUp', title: 'Top up', icon: TopupImg, navigate: 'Dashboard' },
  ];

  return (
    <View style={styles.tabbar}>
      <View style={styles.tab}>
        {/*<View style={styles.scanTab} />*/}
        {routes.length > 0 &&
          routes.map((route, index) => (
            <Animated.View key={index}>
              <Pressable onPress={() => navigate(route.navigate)} style={[styles.item]}>
                <View style={{position:"relative"}}>
                  <>{route.key === 'scan'&&(<View style={styles.scanTab} />)}</>
                  <Image
                      source={route.icon}
                      style={[styles.icon, route.key === 'scan' && styles.scanIcon && styles.scanicon]}
                  />
                </View>
                <Text style={[styles.label, route.key === 'scan' && styles.scanLabel]}>{route.title}</Text>
              </Pressable>
            </Animated.View>
          ))}
      </View>
    </View>
  );
};

export default NavTab;
