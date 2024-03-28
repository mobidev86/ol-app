/**
 * This component is used for notification modal.
 */
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import CustomText from '../custom_text';

const NotificationModal = ({visible, onDismiss, data}) => {
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <TouchableOpacity
        style={[styles.container]}
        activeOpacity={1}
        onPressOut={onDismiss}
      />
      <View style={styles.whiteContainer}>
        <View style={styles.rowStyle}>
          <CustomText style={[styles.title, {flex: 1}]}>
            {'Tienes notifiaciones pendientes'}
          </CustomText>
          <Pressable style={styles.roundedView}>
            <CustomText style={[styles.title, {color: baseColor.primary}]}>
              {'Ver otdas'}
            </CustomText>
          </Pressable>
        </View>
        <View style={styles.lineStyle} />
        <ScrollView>
          {data.map(item => (
            <>
              <View style={styles.rowCenter}>
                <Image
                  source={{uri: 'https://picsum.photos/200/300'}}
                  style={styles.img}
                />
                <View
                  style={{
                    marginLeft: perfectSize(30),
                  }}>
                  <CustomText style={styles.title}>{item?.details}</CustomText>
                  <CustomText style={styles.desc}>{item?.time}</CustomText>
                </View>
              </View>
              <View style={styles.lineStyle} />
            </>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  whiteContainer: {
    borderRadius: perfectSize(5),
    backgroundColor: baseColor.white,
    marginHorizontal: perfectSize(20),
    shadowColor: baseColor.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: perfectSize(150),
  },
  title: {
    fontSize: perfectSize(17),
    color: baseColor.black,
    fontWeight: '400',
  },
  desc: {
    fontSize: perfectSize(17),
    color: baseColor.gray,
    marginTop: perfectSize(10),
  },
  container: {
    flex: 1,
  },
  lineStyle: {
    height: perfectSize(3),
    opacity: 0.15,
    backgroundColor: baseColor.black,
    marginTop: perfectSize(20),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: perfectSize(30),
    paddingHorizontal: perfectSize(20),
    width: '100%',
  },
  roundedView: {
    height: perfectSize(40),
    width: perfectSize(100),
    borderRadius: perfectSize(20),
    borderWidth: 1.5,
    borderColor: baseColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    paddingTop: perfectSize(20),
    paddingHorizontal: perfectSize(20),
    alignItems: 'center',
  },
  img: {
    height: perfectSize(50),
    width: perfectSize(50),
    borderRadius: perfectSize(30),
  },
});
