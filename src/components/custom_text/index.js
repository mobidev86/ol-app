/**
 * This component is used for the label every where with custom fonts.
 */
import * as React from 'react';
import {Text} from 'react-native';
import {perfectSize} from '../../helper/perfectSize';

function CustomText(props) {
  const {font, numberOfLines, style, children, onPress} = props;
  const fontFamily = {fontFamily: font};
  return (
    <Text
      numberOfLines={numberOfLines}
      suppressHighlighting // iOS only
      style={[fontFamily, style || {fontSize: perfectSize(14)}]}
      onPress={onPress}>
      {children}
    </Text>
  );
}
export default CustomText;
