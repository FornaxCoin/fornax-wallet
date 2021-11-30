import React from 'react';
import { View } from 'react-native';
import {Pressable, Text} from "react-native";
import {styles} from "./styles";

const   Button= (props:any) => {
    return (
        <View>
        <Pressable
            onPress={() => props.navigator(props.to)}
            style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </Pressable>
        </View>
    );
};



export default Button;



