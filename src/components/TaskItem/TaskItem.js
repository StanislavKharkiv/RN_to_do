import React, {memo, useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTrashAlt,
  faClipboardCheck,
  faPen,
  faUndo,
} from '@fortawesome/free-solid-svg-icons/';
import {TasksContext} from '../../../App';

const ICON_SIZE = 25;

function TaskItem({item, deleteTask}) {
  const taskState = useContext(TasksContext);
  const [isShowButtons, setIsShowButtons] = useState(false);

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

  const doneTask = async isDone => {
    try {
      const task = {...item, done: isDone};
      await AsyncStorage.mergeItem(String(item.id), JSON.stringify(task));
      taskState.patchTask(item.id, task);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableHighlight onPress={() => setIsShowButtons(!isShowButtons)}>
      <View style={[styles.item, {borderLeftColor: taskColor}]}>
        <View style={styles.task}>
          <Text style={[styles.title, item.done ? styles.doneTitle : {}]}>
            {item.title}
          </Text>
        </View>
        {isShowButtons && (
          <View style={styles.buttonWrapper}>
            {item.done ? (
              <TouchableHighlight
                onPress={() => doneTask(false)}
                style={styles.button}>
                <FontAwesomeIcon icon={faUndo} color="red" size={ICON_SIZE} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => doneTask(true)}
                style={styles.button}>
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  color="green"
                  size={ICON_SIZE}
                />
              </TouchableHighlight>
            )}
            {!item.done && (
              <TouchableHighlight onPress={() => {}} style={styles.button}>
                <FontAwesomeIcon
                  icon={faPen}
                  color="dimgray"
                  size={ICON_SIZE}
                />
              </TouchableHighlight>
            )}
            <TouchableHighlight
              onPress={() => onPressDelete(item.id)}
              style={styles.button}>
              <FontAwesomeIcon icon={faTrashAlt} color="red" size={ICON_SIZE} />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableHighlight>
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
  doneTitle: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red',
    color: 'gray',
  },
  priority: {
    width: 5,
    minHeight: 50,
    height: '100%',
    alignSelf: 'stretch',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
  },
});

export default memo(TaskItem);
