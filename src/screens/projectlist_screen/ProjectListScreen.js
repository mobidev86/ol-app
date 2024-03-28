/**
 * This is the screen for listing of projects
 */
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import CustomButton from '../../components/custom_button';
import CustomText from '../../components/custom_text';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import ProjectListTable from '../../components/projectlist_table';
import Loader from '../../components/loader/Loader';
import {
  deleteProjectByID,
  getNotificationList,
  projectListApi,
} from '../../apiservice/apiservice';
import {useIsFocused} from '@react-navigation/native';
import {getItem, setItem} from '../../utils/utils';
import Header from '../../components/header';
import CustomSidebarMenu from '../../components/custom_sidebar_menu';
import NotificationModal from '../../components/notification_modal';

const ProjectListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [show, setShow] = useState(false);
  const getUserData = async () => {
    setLoading(true);
    const getUserData = await getItem('UserData');
    setIsAdmin(getUserData[0]?.user == 'admin' ? true : false);
    setLoading(false);
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
  const errorMethod = error => {
    setLoading(false);
  };
  const projectListApiCall = () => {
    setLoading(true);
    projectListApi('', {})
      .then(async res => {
        if (res) {
          setProjects(res);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };
  const onPressYes = id => {
    deleteProjectByID(id, {})
      .then(async res => {
        if (res) {
          projectListApiCall();
        }
      })
      .catch(errorMethod);
  };

  const onPressDeleteProject = id => {
    Alert.alert('Estas segura ?', 'Quieres eliminar proyecto', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Sí', onPress: () => onPressYes(id)},
    ]);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      projectListApiCall();
      getUserData();
      getAsyncData();
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
        btnText={'Registrar Proyecto'}
        containerStyle={styles.btnContainerStyle}
      />
      <View style={styles.whiteContainer}>
        <CustomText style={styles.title}>{'Proyectos'}</CustomText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProjectListTable
            data={projects}
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

export default ProjectListScreen;
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
    shadowColor: baseColor.black,
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
