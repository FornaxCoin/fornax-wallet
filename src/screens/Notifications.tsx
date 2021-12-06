import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NotificationImage = '../../assets/images/Notificationmaga.png';
const NotificationDotImage = '../../assets/images/NotificationDotmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 165,
  },
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  txnText: {
    marginLeft: 17,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    marginTop: -5,
  },
  buttonClose: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
    marginBottom: 43,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 0,
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  backIcon: {
    marginLeft: 26,
    marginTop: 32,
  },
  arrowRightIcon: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  fornaxIcon: {
    // marginTop: -119,
    marginBottom: 44,
  },
  fornaxIconExtra: {
    marginTop: -65,
    marginBottom: 56,
    marginLeft: 40,
  },
  fornaxCenterIcon: {
    marginBottom: 142,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'green',
    // marginTop: 120,
    marginTop: hp('10'),
    marginBottom: hp('4'),
  },
  fornaxMiniText: {
    // marginLeft: 17,
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  camera: {
    height: 288,
    width: 288,
    borderRadius: 120,
    backgroundColor: '#afa2ff',
    marginBottom: 48,
  },
});

const Notifications = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <View style={styles.fornaxIcon}>
          <Image source={require(NotificationImage)} />
          <Image
            style={styles.fornaxIconExtra}
            source={require(NotificationDotImage)}
          />
        </View>
        <Text style={styles.textStyle}>Notifications</Text>
        <Text style={styles.fornaxMiniText}>You have a new notification</Text>
      </View>
      <View style={styles.fornaxBox} />
    </>
  );
};

export default Notifications;
