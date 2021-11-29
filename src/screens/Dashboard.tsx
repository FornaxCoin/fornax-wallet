import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';
import NavTab from '../components/navTab';

const BellIcon = '../../assets/images/bell.png';
const SettingIcon = '../../assets/images/setting.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    marginHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    position: 'relative',
  },
  bellImg: {
    width: 24,
    height: 26,
    marginHorizontal: 27,
  },
  settingImg: {
    width: 26,
    height: 26,
  },
  fornaxText: {
    fontSize: 28,
    color: '#b27f29',
    textAlign: 'left',
    fontFamily: 'Quicksand-Bold',
    marginTop: 5,
    marginBottom: 5,
  },
  txnText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    marginTop: 4,
  },
  buttonClose: {
    backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 18,
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  cardCarousel: {
    height: 260,
    width: 450,
  },
  tabBox: {
    height: 320,
    marginBottom: 30,
  },
  navTabBox: {
    height: 70,
  },
  badge: {
    width: 7,
    height: 7,
    borderRadius: 20,
    backgroundColor: '#ff3333',
    position: 'absolute',
    right: 40,
    top: 0,
  },
});

const Dashboard = () => {
  return (
    <>
      <View style={styles.fornaxBox}>
        <View style={styles.navBar}>
          <View style={styles.badge} />
          <Image source={require(BellIcon)} style={styles.bellImg} />
          <Image source={require(SettingIcon)} style={styles.settingImg} />
        </View>
        <Text style={styles.fornaxText}>Dashboard</Text>
        <View style={styles.cardCarousel}>
          <CardCarousel />
        </View>
        <View style={styles.tabBox}>
          <MainTab />
        </View>
        <View style={styles.navTabBox}>
          <NavTab />
        </View>
      </View>
    </>
  );
};

export default Dashboard;
