import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/';

function TaskItem({item, deleteTask}) {
  const taskColor =
    PRIORITY_VALUES.find(
      ({value}) =>
        value.toLocaleLowerCase() === item.priority?.toLocaleLowerCase(),
    )?.color ?? 'gray';

  const onPressDelete = async id => {
    try {
      await AsyncStorage.removeItem(String(id));
      deleteTask(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.item, {borderLeftColor: taskColor}]}>
      <View style={styles.task}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableHighlight onPress={() => onPressDelete(item.id)}>
        <FontAwesomeIcon icon={faTrashAlt} color="red" size={20} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 6,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    backgroundColor: 'white',
    borderLeftColor: 'red',
    borderLeftWidth: 5,
    elevation: 4,
  },
  task: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    paddingLeft: 10,
    fontSize: 24,
    marginRight: 10,
    color: '#404040',
    fontFamily: 'Pacifico-Regular',
  },
  priority: {
    width: 5,
    minHeight: 50,
    height: '100%',
    alignSelf: 'stretch',
  },
});

export default memo(TaskItem);
