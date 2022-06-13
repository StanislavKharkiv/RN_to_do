import React from 'react';
import {View, StyleSheet} from 'react-native';
import Menu from '../Menu/Menu';
export default function Page({children}) {
  return (
    <View style={styles.page}>
      <View>{children}</View>
      <View>
        <Menu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'space-between',
    height: '100%',
  },
});
