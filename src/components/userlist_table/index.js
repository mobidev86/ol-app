/**
 * This component is used for custom table for user list.
 */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CustomText from '../custom_text';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';

const UserListTable = ({data, onPressDelete, isAdmin}) => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View>
        <View style={styles.mainStyle}>
          <CustomText style={styles.idCellHeader}>{'id'}</CustomText>
          <CustomText style={styles.userCell}>{'Name'}</CustomText>
          <CustomText style={styles.userCell}>{'Last Name'}</CustomText>
          <CustomText style={styles.devCell}>{'Uri Photo'}</CustomText>
          <CustomText style={styles.userCell}>{'Rol'}</CustomText>
          <CustomText style={styles.userCell}>{'Skills'}</CustomText>
          <CustomText style={styles.userCell}>{'Area'}</CustomText>
          {isAdmin && (
            <CustomText style={styles.userCell}>{'Delete'}</CustomText>
          )}
        </View>
        <View style={styles.lineStyle} />
        {data.map(item => {
          const namesArray = item?.list?.split('|');
          return (
            <View>
              <View style={styles.valueMainStyle}>
                <CustomText style={styles.idCellValue}>{item?.id}</CustomText>
                <CustomText style={styles.userCellValue}>
                  {item?.name}
                </CustomText>
                <CustomText style={styles.userCellValue}>
                  {item?.last_name}
                </CustomText>
                <CustomText style={styles.userCellValue}>
                  {item?.url_photo || 'https://'}
                </CustomText>
                <CustomText style={styles.userCellValue}>
                  {item?.rol}
                </CustomText>
                <View>
                  {namesArray?.map(item2 => {
                    return (
                      <CustomText style={styles.devCellValue}>
                        {item2}
                      </CustomText>
                    );
                  })}
                </View>
                <CustomText style={styles.userCellValue}>
                  {item?.area}
                </CustomText>
                {isAdmin && (
                  <CustomText
                    onPress={() => onPressDelete(item?.id)}
                    style={[
                      styles.userCellValue,
                      {color: baseColor.red, textDecorationLine: 'underline'},
                    ]}>
                    {'Delete'}
                  </CustomText>
                )}
              </View>
              <View style={styles.lineStyle} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default UserListTable;

const styles = StyleSheet.create({
  idCellHeader: {
    width: perfectSize(60),
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
    marginLeft: perfectSize(20),
  },
  idCellValue: {
    width: perfectSize(60),
    fontSize: perfectSize(20),
    marginLeft: perfectSize(20),
    alignSelf: 'center',
  },
  userCell: {
    width: perfectSize(150),
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
    marginLeft: perfectSize(20),
  },
  devCell: {
    width: perfectSize(150),
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
    marginLeft: perfectSize(20),
  },
  userCellValue: {
    width: perfectSize(150),
    fontSize: perfectSize(20),
    alignSelf: 'center',
    marginLeft: perfectSize(20),
  },
  devCellValue: {
    width: perfectSize(150),
    fontSize: perfectSize(20),
    alignSelf: 'center',
    marginLeft: perfectSize(20),
  },
  lineStyle: {
    height: perfectSize(1),
    opacity: 0.25,
    backgroundColor: baseColor.black,
  },
  mainStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: perfectSize(20),
    marginTop: perfectSize(20),
  },
  valueMainStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: perfectSize(10),
  },
});
