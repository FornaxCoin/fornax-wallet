import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const NotificationImage = '../../assets/images/Notificationmaga.png';
const NotificationDotImage = '../../assets/images/NotificationDotmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const GreenTopMini = '../../assets/images/GreenTopmini.png';
const RedBottommini = '../../assets/images/RedBottommini.png';

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
    // width:  hp(9),
    // height: hp(9),
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
  bankBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: wp('80'),
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  newText: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: '#363853',
    textAlign: 'center',
    marginTop: 10,
  },
  dateTxt: {
    fontSize: 12,
    fontFamily: 'Quicksand-Medium',
    color: '#bdbdbd',
    marginBottom: 5,
  },
  msgTxt: {
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    color: '#000',
    marginBottom: 5,
  },
  badge: {
    width: 9,
    height: 9,
    borderRadius: 20,
    backgroundColor: '#ff3333',
    position: 'absolute',
    right: 10,
    top: 0,
  },
  scrollCards: {
    height: hp('55')
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
      <View style={styles.fornaxBox}>
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
        <View style={styles.scrollCards}>
          <ScrollView>
            <Text style={styles.newText}>New</Text>
            <View style={styles.bankBox}>
              <View style={styles.badge} />
              <View>
                <Text style={styles.dateTxt}>
                  29 June 2021, 9.02 AM
                </Text>
                <Text style={styles.msgTxt}>
                  You spent FRX 32.000 for Coffee Shop Dubai
                </Text>
                <Text style={styles.dateTxt}>
                  ‘Buy drink’
                </Text>
              </View>
              <Image style={{ marginLeft: 10 }} source={require(GreenTopMini)} />
            </View>
            <View style={styles.bankBox}>
              <View style={styles.badge} />
              <View>
                <Text style={styles.dateTxt}>
                  29 June 2021, 9.02 AM
                </Text>
                <Text style={styles.msgTxt}>
                  You spent FRX 32.000 for Coffee Shop Dubai
                </Text>
                <Text style={styles.dateTxt}>
                  ‘Buy drink’
                </Text>
              </View>
              <Image style={{ marginLeft: 10 }} source={require(RedBottommini)} />
            </View>
            <Text style={[styles.newText, { marginTop: 30 }]}>Recent</Text>
            <View style={styles.bankBox}>
              <View style={styles.badge} />
              <View>
                <Text style={styles.dateTxt}>
                  28 June 2021, 8.32 PM
                </Text>
                <Text style={styles.msgTxt}>
                  You spent FRX 210.000 for pay Junaid Kazmi
                </Text>
                <Text style={styles.dateTxt}>
                  ‘Buy items’
                </Text>
              </View>
              <Image style={{ marginLeft: 10 }} source={require(RedBottommini)} />
            </View>
            <View style={styles.bankBox}>
              <View style={styles.badge} />
              <View>
                <Text style={styles.dateTxt}>
                  28 June 2021, 8.32 PM
                </Text>
                <Text style={styles.msgTxt}>
                  You spent FRX 210.000 for pay Junaid Kazmi
                </Text>
                <Text style={styles.dateTxt}>
                  ‘Buy items’
                </Text>
              </View>
              <Image style={{ marginLeft: 10 }} source={require(RedBottommini)} />
            </View>
            <View style={styles.bankBox}>
              <View style={styles.badge} />
              <View>
                <Text style={styles.dateTxt}>
                  28 June 2021, 8.32 PM
                </Text>
                <Text style={styles.msgTxt}>
                  You spent FRX 210.000 for pay Junaid Kazmi
                </Text>
                <Text style={styles.dateTxt}>
                  ‘Buy items’
                </Text>
              </View>
              <Image style={{ marginLeft: 10 }} source={require(RedBottommini)} />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Notifications;
