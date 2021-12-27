import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginVertical: hp(23),
    // height: hp(75),
    paddingHorizontal: 41,
    borderRadius: 40,
    width: wp(74.9),
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
});

const PhoneModal = ({ isModalVisible, children }: any) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={{ flex: 1 }}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default PhoneModal;
