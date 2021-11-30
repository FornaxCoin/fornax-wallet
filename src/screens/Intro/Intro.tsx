import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import Button from "../../components/Button/Button";


const Intro = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View style={styles.fornaxBox}>
        <Text style={styles.fornaxText}>Fornax Wallet</Text>
        <Text style={styles.txnText}>Easy way for all your transactions</Text>
        <Button navigator={navigate} to={'Signup'} text={"Get Started"}/>
      </View>
    </>
  );
};

export default Intro;
