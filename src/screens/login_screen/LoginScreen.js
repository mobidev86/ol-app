/**
 * This is the screen allow user to login
 */
import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {loginApi} from '../../apiservice/apiservice';
import Checkbox from '../../components/checkbox';
import CustomButton from '../../components/custom_button';
import CustomText from '../../components/custom_text';
import Custom_textinput from '../../components/custom_textinput';
import Loader from '../../components/loader/Loader';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {setItem} from '../../utils/utils';
import ScreenName from '../../navigation/ScreenName';

const LoginScreen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errorMethod = error => {
    setLoading(false);
  };
  const onPressLogin = () => {
    if (!username) {
      showError('Por favor ingrese el nombre de usuario');
    } else if (!password) {
      showError('Por favor, ingrese contraseña');
    } else {
      setLoading(true);
      var query = {
        username: username,
        password: password,
      };
      loginApi(query, {})
        .then(async res => {
          if (res?.length != 0) {
            showSuccess('Login Successfully');
            setItem('UserData', res);
            navigation.navigate(ScreenName.Dashboard);
          } else {
            showError('Username and Password not match');
            setUsername('');
            setPassword('');
          }
          setLoading(false);
        })
        .catch(errorMethod);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Loader loading={loading} />
      <View style={styles.whiteContainer}>
        <Image
          source={{
            uri: 'https://olsoftware.com/wp-content/uploads/2021/04/cropped-Logo-Oficial-OL-Software.png',
          }}
          style={styles.imgStyle}
        />
        <CustomText style={styles.title}>
          {'Hola! Bienvenido a OLSoftware'}
        </CustomText>
        <Custom_textinput
          borderRadius={0}
          value={username}
          onChangeText={val => setUsername(val)}
          placeholder="Correo"
          containerStyle={styles.textInputStyle}
        />
        <Custom_textinput
          borderRadius={0}
          value={password}
          secureTextEntry={true}
          onChangeText={val => setPassword(val.trim())}
          placeholder="Contraseña"
          containerStyle={[styles.textInputStyle, {marginTop: perfectSize(10)}]}
        />
        <CustomButton
          onPress={onPressLogin}
          btnText={'Ingresar'}
          textStyle={{color: baseColor.white}}
          containerStyle={styles.btnContainerStyle}
        />
        <View style={styles.rowStyle}>
          <View style={styles.rowCenter}>
            <Checkbox
              isCheck={isCheck}
              onPressCheckBox={() => setIsCheck(!isCheck)}
              checkBoxContainerStyle={{
                marginTop: perfectSize(5),
              }}
            />
            <CustomText style={styles.desc}>{'Recordarme'}</CustomText>
          </View>
          <CustomText style={styles.desc2}>{'RecuperarContraseña?'}</CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: baseColor.lightPurple,
    justifyContent: 'center',
  },
  title: {
    fontSize: perfectSize(20),
    marginTop: perfectSize(60),
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: baseColor.lightGrey,
    marginTop: perfectSize(25),
  },
  whiteContainer: {
    backgroundColor: baseColor.white,
    paddingHorizontal: perfectSize(20),
    marginHorizontal: perfectSize(20),
  },
  btnContainerStyle: {
    width: '40%',
    marginTop: perfectSize(20),
  },
  imgStyle: {
    height: perfectSize(50),
    width: perfectSize(190),
    marginTop: perfectSize(70),
  },
  desc: {
    fontSize: perfectSize(15),
    marginLeft: perfectSize(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: perfectSize(20),
    justifyContent: 'space-between',
    paddingBottom: perfectSize(60),
  },
  desc2: {
    fontSize: perfectSize(15),
    marginLeft: perfectSize(10),
    color: baseColor.black,
    textDecorationLine: 'underline',
  },
});
