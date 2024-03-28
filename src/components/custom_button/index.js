/**
 * This component is used for display buttons.
 */
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../../components/custom_text';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    height: perfectSize(58),
    width: perfectSize(271),
  },
  buttonText: {
    fontSize: perfectSize(16),
    letterSpacing: perfectSize(1),
  },
  leftIconStyle: {
    width: perfectSize(15),
    height: perfectSize(15),
  },
  rightIconStyle: {
    width: perfectSize(20),
    height: perfectSize(20),
    marginRight: perfectSize(8),
  },
  defaultButtonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
});
function CustomButton({
  containerStyle,
  rightIcon,
  onPress,
  btnText,
  btnStyle,
  borderRadius = perfectSize(5),
  marginTop = 0,
  marginBottom = 0,
  textStyle = {},
  backgroundColor = baseColor.primary,
  rightIconStyle,
  leftIcon = null,
  btnTextColor = baseColor.white,
  borderColor,
  tintColor = baseColor.white,
}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        marginTop,
        marginBottom,
        borderRadius,
        backgroundColor,
        borderColor,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          ...styles.defaultButtonContainer,
          borderRadius,
          ...btnStyle,
        }}>
        {rightIcon && (
          <Image
            source={rightIcon}
            style={{...styles.rightIconStyle, ...rightIconStyle}}
            tintColor={tintColor}
          />
        )}

        <CustomText
          color={btnTextColor}
          numberOfLines={1}
          style={{...styles.buttonText, ...textStyle}}>
          {btnText}
        </CustomText>
        {leftIcon && <Image source={leftIcon} style={styles.leftIconStyle} />}
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton;
