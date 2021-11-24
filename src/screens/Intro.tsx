import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 165,
  },
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
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
    marginTop: 185,
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
});

const Intro = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View style={styles.fornaxBox}>
        <Text style={styles.fornaxText}>Fornax Wallet</Text>
        <Text style={styles.txnText}>Easy way for all your transactions</Text>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Get Started</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Intro;
