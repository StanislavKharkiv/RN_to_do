import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TaskItem({item, deleteTask}) {
  const taskColor =
    PRIORITY_VALUES.find(
      ({value}) =>
        value.toLocaleLowerCase() === item.priority.toLocaleLowerCase(),
    )?.color ?? 'white';

  const onPressDelete = async id => {
    try {
      await AsyncStorage.removeItem(String(id));
      deleteTask(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.wrapper}>
        <Text style={[styles.priority, {color: taskColor}]}>
          {item.priority}
        </Text>
        <TouchableHighlight
          style={styles.delete}
          onPress={() => onPressDelete(item.id)}>
          <Text style={styles.deleteText}>+</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const closeBtnSize = 24;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    backgroundColor: 'white',
    elevation: 4,
  },
  title: {
    padding: 4,
    paddingLeft: 10,
    fontSize: 24,
    marginRight: 10,
    flexShrink: 1,
    color: '#404040',
    fontFamily: 'Pacifico-Regular',
  },
  priority: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginRight: 20,
  },
  wrapper: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#333',
    width: closeBtnSize,
    height: closeBtnSize,
    borderRadius: 100,
  },
  deleteText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    transform: [{rotate: '45deg'}],
    lineHeight: closeBtnSize,
  },
});

export default memo(TaskItem);
