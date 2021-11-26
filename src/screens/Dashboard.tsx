import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';

const BellIcon = '../../assets/images/bell.png';
const SettingIcon = '../../assets/images/setting.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  bellImg: {
    width: 26,
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
    marginTop: 25,
    marginBottom: 20,
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
    height: 240,
  },
});

const Dashboard = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View style={styles.fornaxBox}>
        <View style={styles.navBar}>
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
        <View>
          <MainTab />
        </View>
      </View>
    </>
  );
};

export default Dashboard;
