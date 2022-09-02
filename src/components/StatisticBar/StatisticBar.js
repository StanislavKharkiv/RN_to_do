import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CountUp} from 'use-count-up';

export default function StatisticBar({percent, quantity, title, color}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} - <CountUp isCounting end={quantity} duration={3} /> tasks
      </Text>
      <View style={styles.barWrap}>
        <View
          style={[styles.bar, {width: `${percent}%`, backgroundColor: color}]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    marginBottom: 4,
    fontSize: 18,
  },
  barWrap: {
    borderWidth: 1,
    height: 12,
    borderRadius: 3,
    borderColor: 'gray',
  },
  bar: {
    height: '100%',
  },
});
