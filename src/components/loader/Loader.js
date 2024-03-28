/**
 * This component is used for loading.
 */
import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {baseColor} from '../../theme/Colors';

const Loader = props => {
  const {loading} = props;

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={baseColor.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: baseColor.transparent,
  },
  activityIndicatorWrapper: {
    backgroundColor: baseColor.white,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
