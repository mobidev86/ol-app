/**
 * This component is used for custom side bar.
 */
import {Pressable, StyleSheet, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {perfectSize} from '../../helper/perfectSize';
import CustomText from '../custom_text';
import {baseColor} from '../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {drawerData} from '../../const/data';
import {clearAsyncStorate} from '../../utils/utils';
import ScreenName from '../../navigation/ScreenName';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: perfectSize(16),
    marginLeft: perfectSize(15),
  },
  touchContainer: {
    flexDirection: 'row',
    paddingHorizontal: perfectSize(30),
    alignItems: 'center',
    paddingVertical: perfectSize(15),
  },
  headerText: {
    fontSize: perfectSize(15),
    color: baseColor.black,
    textTransform: 'uppercase',
    marginTop: perfectSize(25),
    marginHorizontal: perfectSize(20),
    marginBottom: perfectSize(10),
  },
});

const CustomSidebarMenu = props => {
  const navigation = useNavigation();
  const {onPress} = props;
  const [current, setCurrent] = useState('');
  const setData = async value => {
    try {
      await AsyncStorage.setItem('DrawerItem', value);
    } catch (e) {
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('DrawerItem');
      if (value !== null) {
        setCurrent(value);
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    getData();
  });

  const onClick = item => {
    setData(item.title);
    onPress();
    if (item?.screenName) {
      navigation.navigate(item.screenName);
    } else if (item?.type == 'logout') {
      clearAsyncStorate();
      navigation.navigate(ScreenName.Login);
    }
  };
  return (
    <View style={styles.container}>
      {drawerData.map((item, index) => (
        <>
          {item.header && (
            <CustomText style={styles.headerText}>{item.header}</CustomText>
          )}
          <Pressable
            onPress={() => onClick(item)}
            style={[
              styles.touchContainer,
              {
                backgroundColor:
                  current === item.title ? baseColor.white : baseColor.light,
              },
            ]}>
            <Image
              source={item.icon}
              style={{height: 25, width: 25}}
              tintColor={current === item.title ? baseColor.primary : '#787474'}
            />
            <CustomText
              style={[
                styles.text,
                {
                  color: current === item.title ? baseColor.primary : null,
                },
              ]}>
              {item.title}
            </CustomText>
          </Pressable>
        </>
      ))}
    </View>
  );
};

export default CustomSidebarMenu;
