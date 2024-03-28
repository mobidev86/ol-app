/**
 * This is the file for using navigation for whole app
 */
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import Loader from '../components/loader/Loader';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LoginScreen from '../screens/login_screen/LoginScreen';
import ProjectListScreen from '../screens/projectlist_screen/ProjectListScreen';
import UserListScreen from '../screens/userlist_screen/UserListScreen';
import {getItem, setItem} from '../utils/utils';
import {navigationRef} from './NavigationService';
import ScreenName from './ScreenName';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const AppWrapper = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const getUserData = async () => {
      setItem('DrawerItem', 'Dashboard');
      setLoading(true);
      const getUserData = await getItem('UserData');
      setLoading(false);
      if (getUserData) {
        navigation.navigate(ScreenName.Dashboard);
      } else {
        navigation.navigate(ScreenName.Login);
      }
    };
    useEffect(() => {
      getUserData();
    }, []);
    return (
      <>
        <Loader loading={loading} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <>
            <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
            <Stack.Screen
              name={ScreenName.Dashboard}
              component={DashboardScreen}
            />
            <Stack.Screen
              name={ScreenName.ProjectList}
              component={ProjectListScreen}
            />
            <Stack.Screen
              name={ScreenName.UserList}
              component={UserListScreen}
            />
          </>
        </Stack.Navigator>
        <FlashMessage position="top" />
      </>
    );
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <AppWrapper />
    </NavigationContainer>
  );
};

export default AppNavigator;
