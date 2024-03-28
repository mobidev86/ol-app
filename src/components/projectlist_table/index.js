/**
 * This component is used for custom table for project list.
 */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import CustomText from '../custom_text';

const ProjectListTable = ({data, onPressDelete, isAdmin}) => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View>
        <View style={styles.mainStyle}>
          <CustomText style={styles.idCellHeader}>{'id'}</CustomText>
          <CustomText style={styles.projectNameCell}>
            {'Project Name'}
          </CustomText>
          <CustomText style={styles.projectNameCell}>{'Repository'}</CustomText>
          <CustomText style={styles.devCell}>{'Developers'}</CustomText>
          <CustomText style={styles.projectNameCell}>{'Ci'}</CustomText>
          {isAdmin && (
            <CustomText style={styles.projectNameCell}>{'Delete'}</CustomText>
          )}
        </View>
        <View style={styles.lineStyle} />
        {data.map(item => {
          const namesArray = item?.developers?.split('|');
          return (
            <View>
              <View style={styles.valueMainStyle}>
                <CustomText style={styles.idCellValue}>{item?.id}</CustomText>
                <CustomText style={styles.projectNameCellValue}>
                  {item?.project_name}
                </CustomText>
                <CustomText style={styles.projectNameCellValue}>
                  {item?.repo_url}
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
                <CustomText style={styles.projectNameCellValue}>
                  {item?.ci?.toString()}
                </CustomText>
                {isAdmin && (
                  <CustomText
                    onPress={() => onPressDelete(item?.id)}
                    style={[
                      styles.projectNameCellValue,
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

export default ProjectListTable;

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
  projectNameCell: {
    width: perfectSize(200),
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
    marginLeft: perfectSize(20),
  },
  devCell: {
    width: perfectSize(300),
    fontSize: perfectSize(20),
    color: baseColor.black,
    fontWeight: '500',
    marginLeft: perfectSize(20),
  },
  projectNameCellValue: {
    width: perfectSize(200),
    fontSize: perfectSize(20),
    alignSelf: 'center',
    marginLeft: perfectSize(20),
  },
  devCellValue: {
    width: perfectSize(300),
    fontSize: perfectSize(20),
    alignSelf: 'center',
    marginLeft: perfectSize(20),
  },
  lineStyle: {
    height: perfectSize(1),
    opacity: 0.25,
    backgroundColor: 'black',
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
