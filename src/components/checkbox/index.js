/**
 * This is the custom component for checkbox
 */
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import Images from '../../assets/Images/Images';

const Checkbox = ({onPressCheckBox, isCheck, checkBoxContainerStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPressCheckBox}
      style={[styles.checkBoxContainer, checkBoxContainerStyle]}>
      {isCheck && (
        <Image
          tintColor={baseColor.primary}
          source={Images.checkbox}
          style={styles.checkBoxImage}
        />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    height: perfectSize(20),
    width: perfectSize(20),
    backgroundColor: baseColor.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxImage: {
    height: perfectSize(23),
    width: perfectSize(23),
    borderRadius: 2,
  },
});
