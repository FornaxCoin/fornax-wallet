import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginVertical: 110,
    paddingHorizontal: 41,
    borderRadius: 40,
    width: 300,
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
