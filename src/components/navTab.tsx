import * as React from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
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
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
    color: 'white',
  },
  scanTab: {
    width: 72,
    height: 72,
    backgroundColor: '#936ee3',
    borderRadius: 30,
    position: 'absolute',
    top: -40,
    left: 135,
    right: 0,
    bottom: 0,
  },
  scanIcon: {
    marginBottom: 28,
    marginTop: -18,
  },
});

const NavTab = () => {
  const routes = [
    { key: 'home', title: 'Home', icon: HomeImg },
    {
      key: 'transfer',
      title: 'Transfer',
      icon: TransferImg,
    },
    { key: 'scan', title: 'Scan', icon: ScanImg },
    { key: 'pay', title: 'Pay', icon: PayImg },
    { key: 'topUp', title: 'Top up', icon: TopupImg },
  ];

  return (
    <View style={styles.tabbar}>
      <View style={styles.tab}>
        <View style={styles.scanTab} />
        {routes.length > 0 &&
          routes.map(route => (
            <Animated.View style={[styles.item]}>
              <Image
                source={route.icon}
                style={[styles.icon, route.key === 'scan' && styles.scanIcon]}
              />
              <Text style={[styles.label]}>{route.title}</Text>
            </Animated.View>
          ))}
      </View>
    </View>
  );
};

export default NavTab;
