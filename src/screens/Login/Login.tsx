import React from 'react';
import {Text, View} from "react-native";
import {styles} from "./styles";
import Button from "../../components/Button/Button";


const Login = (props:any) => {
    const navigate = props.navigation.navigate;
    return (
        <>
            <View>
                <Text>Login</Text>
            </View>
            <Button navigator={navigate} to={'Dashboard'} text={"Login"}/>
        </>
    );
};



export default Login;
