import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="green" size={40} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
