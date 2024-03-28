/**
 * This is the screen for data of user as well as projects
 */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import Images from '../../assets/Images/Images';
import CustomButton from '../../components/custom_button';
import CustomSidebarMenu from '../../components/custom_sidebar_menu';
import CustomText from '../../components/custom_text';
import Header from '../../components/header';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import Loader from '../../components/loader/Loader';
import {
  getDashboardData,
  getNotificationList,
  getProjectProgress,
  getReportCommits,
  getServerDetails,
} from '../../apiservice/apiservice';
import {useIsFocused} from '@react-navigation/native';
import NotificationModal from '../../components/notification_modal';
import {setItem} from '../../utils/utils';

const DashboardScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [serverTime, setServerTime] = useState([]);
  const [serverValue, setServerValue] = useState([30, 50, 90, 40, 50]);
  const [days, setDays] = useState([]);
  const [reportValue, setReportValue] = useState([10, 5, 0, 15, 2, 5]);
  const [names, setNames] = useState([]);
  const [barValue, setBarValues] = useState([50, 45, 40, 80, 99, 43]);
  const [notificationData, setNotificationData] = useState([]);
  const isFocused = useIsFocused();
  const barChartData = {
    labels: names,
    datasets: [
      {
        data: barValue,
        colors: [
          (opacity = 1) => baseColor.sky,
          (opacity = 1) => baseColor.sky,
          (opacity = 1) => baseColor.sky,
          (opacity = 1) => baseColor.sky,
          (opacity = 1) => baseColor.sky,
          (opacity = 1) => baseColor.sky,
        ],
      },
    ],
  };
  const lineChart = {
    labels: serverTime,
    datasets: [
      {
        data: serverValue,
      },
    ],
  };
  const reportData = {
    labels: days,
    datasets: [
      {
        data: reportValue,
      },
    ],
  };

  const getDashboardDataApi = () => {
    setLoading(true);
    getDashboardData('', {})
      .then(async res => {
        if (res) {
          setData(res);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };
  const getServerDetailsApi = () => {
    setLoading(true);
    getServerDetails('', {})
      .then(async res => {
        if (res) {
          const times = res?.time.map(item => item.time);
          const values = res?.time.map(item => item.value);
          setServerTime(times);
          setServerValue(values);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };
  const getProjectProgressApi = () => {
    setLoading(true);
    getProjectProgress('', {})
      .then(async res => {
        if (res) {
          const names = res?.top_projects.map(item => item.name);
          const values = res?.top_projects.map(item =>
            parseInt(item.porcentaje),
          );
          setNames(names);
          setBarValues(values);
        }
        setLoading(false);
      })
      .catch(errorMethod);
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
  const getReportCommitsApi = () => {
    setLoading(true);
    getReportCommits('', {})
      .then(async res => {
        if (res) {
          const month = res?.map(item => item.month);
          const reportValue = res?.map(item => item.feat);
          const actualValue = month.map(item => {
            switch (item) {
              case 1:
                return 'MON';
              case 2:
                return 'TUE';
              case 3:
                return 'WED';
              case 4:
                return 'THU';
              case 5:
                return 'FRI';
              case 6:
                return 'SAT';
              case 7:
                return 'SUN';
              default:
                return '';
            }
          });
          setDays(actualValue);
          setReportValue(reportValue);
        }
        setLoading(false);
      })
      .catch(errorMethod);
  };

  const errorMethod = error => {
    setLoading(false);
  };
  useEffect(() => {
    if (isFocused) {
      getDashboardDataApi();
      getServerDetailsApi();
      getReportCommitsApi();
      getProjectProgressApi();
      getNotificationListApi();
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
      <ScrollView>
        <View style={{marginHorizontal: perfectSize(20)}}>
          <View style={styles.container}>
            <CustomButton
              rightIcon={Images.printer}
              btnText={'Imprimir'}
              backgroundColor={baseColor.lightPurple}
              containerStyle={styles.btnContainerStyle}
              btnTextColor={baseColor.black}
              textStyle={styles.btnText}
              borderRadius={perfectSize(10)}
              tintColor={baseColor.black}
            />
            <CustomButton
              rightIcon={Images.share_arrow}
              btnText={'Exportar Excel'}
              containerStyle={styles.btnExportar}
              btnTextColor={baseColor.white}
              textStyle={styles.textBtn}
              borderRadius={perfectSize(10)}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.dataContainer}>
            <View>
              <CustomText style={styles.titleText}>{'Proyectos'}</CustomText>
              <CustomText style={styles.contentText}>
                {data?.projects}
              </CustomText>
            </View>
            <View>
              <CustomText style={styles.titleText}>
                {'Incidentes registradas'}
              </CustomText>
              <CustomText style={styles.contentText}>
                {data?.peding_nc}
              </CustomText>
            </View>
            <View>
              <CustomText style={styles.titleText}>
                {'Error de despliegue'}
              </CustomText>
              <CustomText style={styles.contentText}>
                {data?.errors_deploy}
              </CustomText>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <CustomText style={styles.headerText}>
              {'Detalles Del Servidor'}
            </CustomText>
            <CustomText style={styles.detailText}>
              {
                'Information sobre el consumo y uso del servidor principal para desarrollo'
              }
            </CustomText>
            <View style={styles.chartDetailView}>
              <View
                style={[styles.round, {backgroundColor: baseColor.primary}]}
              />
              <CustomText>{'Semana'}</CustomText>
              <View
                style={[
                  styles.round,
                  {
                    backgroundColor: baseColor.sky,
                    marginLeft: perfectSize(25),
                  },
                ]}
              />
              <CustomText>{'Semana Anterior'}</CustomText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <LineChart
                  data={lineChart}
                  width={Dimensions.get('window').width}
                  height={300}
                  segments={3}
                  chartConfig={{
                    bonPressackgroundColor: baseColor.white,
                    backgroundGradientFrom: baseColor.white,
                    backgroundGradientTo: baseColor.white,
                    color: (opacity = 1) => `rgba(78, 200, 252, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  bezier
                  verticalLabelRotation={30}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={[
              styles.cardContainer,
              {backgroundColor: baseColor.primary},
            ]}>
            <CustomText style={[styles.headerText, {color: baseColor.white}]}>
              {'Reporte De Commits Por Mes'}
            </CustomText>
            <CustomText style={styles.textTotalStyle}>
              {'Total commits ultimos 12 meses'}
            </CustomText>
            <CustomText style={styles.totalText}>{'357'}</CustomText>
            <View>
              <LineChart
                data={reportData}
                width={Dimensions.get('window').width - perfectSize(60)}
                height={perfectSize(180)}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                chartConfig={{
                  backgroundGradientFrom: baseColor.primary,
                  backgroundGradientTo: baseColor.primary,
                  color: (opacity = 1) => `rgba(78, 200, 252, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                verticalLabelRotation={0}
              />
            </View>
          </View>
          <View
            style={[
              styles.cardContainer,
              {
                marginBottom: perfectSize(30),
              },
            ]}>
            <CustomText style={styles.headerText}>
              {'Avance De Proyectos'}
            </CustomText>
            <CustomText style={styles.detailText}>
              {'Reportes de entrega'}
            </CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <BarChart
                  data={barChartData}
                  width={Dimensions.get('window').width - perfectSize(30)}
                  height={perfectSize(400)}
                  yAxisLabel={''}
                  chartConfig={{
                    backgroundGradientFrom: baseColor.white,
                    backgroundGradientTo: baseColor.white,
                    color: (opacity = 1) => `rgba(78, 200, 252, ${opacity})`,
                    strokeWidth: 2,
                    barPercentage: 0.5,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  withCustomBarColorFromData
                  showBarTops={false}
                  flatColor
                  verticalLabelRotation={30}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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

export default DashboardScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: baseColor.lightPurple,
  },
  container: {
    marginTop: perfectSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainerStyle: {
    width: '32%',
    height: perfectSize(50),
    borderColor: baseColor.buttonBorder,
    borderWidth: 2,
  },
  btnText: {
    fontSize: perfectSize(15),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  btnExportar: {
    width: '45%',
    height: perfectSize(50),
    marginLeft: perfectSize(15),
  },
  textBtn: {
    color: baseColor.white,
    fontSize: perfectSize(15),
    fontFamily: '500',
    letterSpacing: perfectSize(0.5),
  },
  line: {
    width: '100%',
    borderBottomColor: '#E8E9EB',
    borderBottomWidth: 1,
    marginTop: perfectSize(15),
  },
  dataContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(20),
    justifyContent: 'space-between',
  },
  titleText: {
    color: baseColor.gray,
    fontWeight: '500',
    textAlign: 'center',
  },
  contentText: {
    color: baseColor.black,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: perfectSize(16),
    marginTop: perfectSize(10),
  },
  cardContainer: {
    backgroundColor: baseColor.white,
    borderRadius: 15,
    width: '100%',
    marginTop: perfectSize(30),
    padding: 15,
  },
  headerText: {
    fontSize: perfectSize(18),
    color: baseColor.black,
    fontWeight: '500',
  },
  detailText: {
    fontSize: perfectSize(16),
    color: baseColor.gray,
    marginTop: perfectSize(10),
  },
  chartDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: perfectSize(10),
  },
  round: {
    height: perfectSize(11),
    width: perfectSize(11),
    borderRadius: 10,
    marginRight: perfectSize(10),
  },
  textTotalStyle: {
    color: baseColor.white,
    fontSize: perfectSize(12),
    marginTop: perfectSize(15),
  },
  totalText: {
    color: baseColor.sky,
    fontSize: perfectSize(25),
    marginBottom: perfectSize(5),
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
