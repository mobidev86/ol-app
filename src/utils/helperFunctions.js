/**
 * This is component used as helper function
 */
import {showMessage} from 'react-native-flash-message';
import {perfectSize} from '../helper/perfectSize';
import {baseColor} from '../theme/Colors';

const showError = (message, duration = 1850) => {
  showMessage({
    message: 'Error',
    description: message,
    type: 'default',
    backgroundColor: baseColor.red, // background color
    textStyle: {
      color: baseColor.white, // text color
      fontSize: perfectSize(15),
    },
    duration: duration,
  });
};

const showSuccess = (message, duration = 1500) => {
  showMessage({
    message: 'Success',
    description: message,
    type: 'default',
    backgroundColor: baseColor.green, // background color
    textStyle: {
      color: baseColor.white, // text color
      fontSize: perfectSize(15),
    },
    duration: duration,
  });
};

export {showError, showSuccess};
