/**
 * This component is used as custom header.
 */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import Images from '../../assets/Images/Images';
import CustomText from '../custom_text';
import {getItem, setUserData} from '../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(30),
  },
  logo: {
    width: perfectSize(30),
    height: perfectSize(30),
    backgroundColor: baseColor.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: perfectSize(25),
    width: perfectSize(25),
  },
  menuStyle: {
    height: perfectSize(20),
    width: perfectSize(20),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  desc: {
    fontSize: perfectSize(17),
    color: baseColor.white,
    fontWeight: '400',
  },
});

function Header(props) {
  const {onPress, onPressBell} = props;
  const [username, setUserName] = useState('');

  const getUserData = async () => {
    const getUserData = await getItem('UserData');
    setUserName(getUserData[0]?.user);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <View style={{width: '100%'}}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <CustomText style={styles.desc}>
              {username.charAt(0).toUpperCase()}
            </CustomText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={onPressBell}>
              <Image
                source={Images.bell}
                style={styles.image}
                tintColor={'#787474'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <Image
                source={Images.menu}
                tintColor={'#787474'}
                style={[styles.menuStyle, {marginLeft: perfectSize(20)}]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
export default Header;
