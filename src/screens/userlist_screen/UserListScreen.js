/**
 * This is the screen for listing of users
 */
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  deleteUserByID,
  getNotificationList,
  userListApi,
} from '../../apiservice/apiservice';
import CustomButton from '../../components/custom_button';
import CustomText from '../../components/custom_text';
import Loader from '../../components/loader/Loader';
import UserListTable from '../../components/userlist_table';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../components/header';
import CustomSidebarMenu from '../../components/custom_sidebar_menu';
import {getItem, setItem} from '../../utils/utils';
import NotificationModal from '../../components/notification_modal';

const UserListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const isFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const getUserData = async () => {
    setLoading(true);
    const getUserData = await getItem('UserData');
    setIsAdmin(getUserData[0]?.user == 'admin' ? true : false);
    setLoading(false);
  };
  const errorMethod = error => {
    setLoading(false);
  };
  const userListApiCall = () => {
    setLoading(true);
    userListApi('', {})
      .then(async res => {
        if (res) {
          setUsers(res);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };
  const onPressYes = id => {
    deleteUserByID(id, {})
      .then(async res => {
        if (res) {
          userListApiCall();
        }
      })
      .catch(errorMethod);
  };

  const getAsyncData = async () => {
    const getNotificationList = await getItem('NotificationData');
    if (getNotificationList) {
      const parsed = JSON.parse(getNotificationList);
      setNotificationData(parsed);
    } else {
      getNotificationListApi();
    }
  };
  const getNotificationListApi = () => {
    setLoading(true);
    getNotificationList('', {})
      .then(async res => {
        if (res) {
          setItem('NotificationData', JSON.stringify(res));
          setNotificationData(res);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };

  const onPressDeleteProject = id => {
    Alert.alert('Estas segura ?', 'quieres eliminar usuario', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Sí', onPress: () => onPressYes(id)},
    ]);
  };
  useEffect(() => {
    if (isFocused) {
      userListApiCall();
      getAsyncData();
      getUserData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        onPress={() => setShow(!show)}
        onPressBell={() => setShowNotificationModal(!showNotificationModal)}
      />
      <NotificationModal
        data={notificationData}
        visible={showNotificationModal}
        onDismiss={() => setShowNotificationModal(false)}
      />
      <Loader loading={loading} />
      <CustomButton
        textStyle={{color: baseColor.white}}
        btnText={'Registrar Usuario'}
        containerStyle={styles.btnContainerStyle}
      />
      <View style={styles.whiteContainer}>
        <CustomText style={styles.title}>{'Usuarios'}</CustomText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserListTable
            data={users}
            isAdmin={isAdmin}
            onPressDelete={id => onPressDeleteProject(id)}
          />
        </ScrollView>
      </View>
      {show && (
        <View style={styles.modalView}>
          <CustomSidebarMenu
            onPress={() => {
              setShow(false);
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserListScreen;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: baseColor.lightPurple,
  },
  btnContainerStyle: {
    width: '50%',
    marginTop: perfectSize(40),
    alignSelf: 'center',
  },
  title: {
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
  },
  whiteContainer: {
    borderRadius: perfectSize(20),
    backgroundColor: baseColor.white,
    marginHorizontal: perfectSize(20),
    paddingTop: perfectSize(30),
    paddingHorizontal: perfectSize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: perfectSize(30),
    height: perfectSize(500),
  },
  modalView: {
    position: 'absolute',
    backgroundColor: baseColor.lightPurple,
    top: perfectSize(90),
    width: '60%',
    height: '100%',
    alignSelf: 'flex-end',
  },
});
