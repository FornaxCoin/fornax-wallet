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
  fornaxIconExtra: {
    marginTop: -65,
    marginBottom: 56,
    marginLeft: 40,
  },
  fornaxIcon: {
    // width:80,
    // height:80,
    width:  hp(9),
    height: hp(9),
    marginBottom: 30,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('5'),
    marginBottom: hp('4'),
  },
  fornaxMiniText: {
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
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
