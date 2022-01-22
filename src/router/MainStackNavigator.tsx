import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Intro from '../screens/Intro';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import LoginSetting from '../screens/LoginSetting';
import WalletSetup from '../screens/WalletSetup';
import ImportWallet from '../screens/ImportWallet';
import Wallet from '../screens/Wallet';
import Tokens from '../screens/Tokens';
import Dashboard from '../screens/Dashboard';
import Scan from '../screens/Scan';
import Pay from '../screens/Pay';
import AddCard from '../screens/AddCard';
import ImportCard from '../screens/ImportCard';
import Transfer from '../screens/Transfer';
import SetAmount from '../screens/SetAmount';
import ConfirmTransaction from '../screens/ConfirmTransaction';
import SocialMedia from '../screens/SocialMedia';
import Fingerprint from '../screens/Fingerprint';
import FaceId from '../screens/FaceId';
import ServiceCenter from '../screens/ServiceCenter';
import CriticsSuggestion from '../screens/CriticsSuggestion';
import SetPin from '../screens/SetPin';
import Settings from '../screens/Settings';
import Notifications from '../screens/Notifications';
import LoginPin from '../screens/LoginPin';
import QRScanner from '../screens/QRScanner';
import VerifyMnemonic from '../screens/VerifyMnemonic';
import ConfirmPay from '../screens/ConfirmPay';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'transparent',
  },
};

const MainStackNavigator = ({ initRoute }: any) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="WalletSetup" component={WalletSetup} />
        <Stack.Screen name="Import" component={ImportWallet} />
        <Stack.Screen name="Tokens" component={Tokens} />
        <Stack.Screen name="SetPin" component={SetPin} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginSetting" component={LoginSetting} />
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="CriticsSuggestion" component={CriticsSuggestion} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
        <Stack.Screen name="ServiceCenter" component={ServiceCenter} />
        <Stack.Screen name="FaceId" component={FaceId} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="ImportCard" component={ImportCard} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="SetAmount" component={SetAmount} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="LoginPin" component={LoginPin} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="VerifyMnemonic" component={VerifyMnemonic} />
        <Stack.Screen name="ConfirmPay" component={ConfirmPay} />
        <Stack.Screen
          name="ConfirmTransaction"
          component={ConfirmTransaction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
