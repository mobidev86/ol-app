/**
 * This component is used for the text input for get input value from user.
 */
import React, {forwardRef, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';
import {baseColor} from '../../theme/Colors';
import CustomText from '../custom_text';

const styles = StyleSheet.create({
  leftIcon: {width: perfectSize(22), height: perfectSize(22)},
  defaultContainerStyle: {
    flexDirection: 'row',
    height: perfectSize(55),
    color: 'transparent',
  },
  defaultTextInputStyle: {
    flex: 1,
    fontSize: perfectSize(16),
    paddingLeft: perfectSize(30),
  },
  rightIcon: {height: perfectSize(15), width: perfectSize(15)},
  leftIconContainer: {justifyContent: 'center', marginLeft: perfectSize(14)},
  rightIconContainer: {
    justifyContent: 'center',
    marginRight: perfectSize(14),
  },
});

const CustomTextInput = forwardRef(
  (
    {
      containerStyle,
      textInputStyle,
      focusStyle,
      leftIcon,
      leftIconStyle = {},
      color,
      rightIcon,
      onChangeText,
      value,
      placeholder = '',
      marginBottom = perfectSize(19),
      onPressRight = () => {},
      withRef = false,
      secureTextEntry = false,
      borderRadius = perfectSize(12),
      isShowPassword,
      rightIconStyle = {},
      require = false,
      keyboardType = 'default',
      maxLength,
      numberOfLines,
      rightIconContainerExtraStyle = {},
      multiline = false,
      rightText,
      rightTextStyle,
      ...props
    },
    ref,
  ) => {
    const inputRef = ref;
    const [focused, setFocused] = useState(false);
    useEffect(() => {
      if (withRef && Platform.OS === 'android') {
        if (inputRef.current) {
          inputRef.current.setNativeProps({});
        }
      }
    }, [secureTextEntry, inputRef, withRef]);

    return (
      <View
        style={[
          {
            ...styles.defaultContainerStyle,
            marginBottom,
            borderRadius,
          },
          containerStyle,
          focused && focusStyle,
        ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Image
              source={leftIcon}
              style={{...styles.leftIcon, ...leftIconStyle}}
            />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          maxLength={maxLength}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          style={{
            ...styles.defaultTextInputStyle,
            ...textInputStyle,
          }}
          ref={inputRef}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          blurOnSubmit
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          multiline={multiline}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            style={[styles.rightIconContainer, rightIconContainerExtraStyle]}
            onPress={onPressRight}>
            {rightIcon ? (
              <Image
                tintColor={baseColor.darkGrey}
                source={rightIcon}
                style={{...styles.rightIcon, ...rightIconStyle}}
              />
            ) : (
              <CustomText style={rightTextStyle}>{rightText}</CustomText>
            )}
          </TouchableOpacity>
        )}
        {rightText && (
          <TouchableOpacity
            style={[styles.rightIconContainer, rightIconContainerExtraStyle]}
            onPress={onPressRight}>
            <CustomText style={rightTextStyle} color={baseColor.black}>
              {rightText}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default React.memo(CustomTextInput);
