import React, {memo, useContext, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTrashAlt,
  faClipboardCheck,
  faPen,
  faUndo,
  faArchive,
} from '@fortawesome/free-solid-svg-icons/';
import {TasksContext} from '../../../App';

const ICON_SIZE = 25;
const BUTTONS_RIGHT = -180;

function TaskItem({item, deleteTask}) {
  const fadeAnim = useRef(new Animated.Value(BUTTONS_RIGHT)).current;
  const state = useContext(TasksContext);

  const taskColor =
    PRIORITY_VALUES.find(
      ({value}) =>
        value.toLocaleLowerCase() === item.priority?.toLocaleLowerCase(),
    )?.color ?? 'gray';

  useEffect(() => {
    if (item.id !== state.currentTask) {
      Animated.timing(fadeAnim, {
        toValue: BUTTONS_RIGHT,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  });
  const onPressTask = () => {
    const id = item.id === state.currentTask ? null : item.id;
    state.setCurrentTask(id);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const onPressDelete = async () => {
    try {
      await AsyncStorage.removeItem(String(item.id));
      deleteTask(item.id);
    } catch (e) {
      console.error(e);
    }
  };

  const changeTask = async newData => {
    try {
      const task = {...item, ...newData};
      await AsyncStorage.mergeItem(String(item.id), JSON.stringify(task));
      state.patchTask(item.id, task);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableHighlight onPress={onPressTask}>
      <View style={[styles.item, {borderLeftColor: taskColor}]}>
        <View style={styles.task}>
          <Text style={[styles.title, item.done ? styles.doneTitle : {}]}>
            {item.title}
          </Text>
        </View>
        {true && (
          <Animated.View style={{...styles.buttonWrapper, right: fadeAnim}}>
            {item.done ? (
              <TouchableHighlight
                onPress={() => changeTask({done: false})}
                style={styles.button}>
                <FontAwesomeIcon icon={faUndo} color="red" size={ICON_SIZE} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => changeTask({done: true})}
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
            <TouchableHighlight onPress={() => changeTask({archived: true})}>
              <FontAwesomeIcon
                icon={faArchive}
                color="orange"
                size={ICON_SIZE}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={onPressDelete} style={styles.button}>
              <FontAwesomeIcon icon={faTrashAlt} color="red" size={ICON_SIZE} />
            </TouchableHighlight>
          </Animated.View>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'relative',
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
    overflow: 'hidden',
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
    position: 'absolute',
    top: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 180,
    paddingHorizontal: 4,
    shadowColor: 'black',
    elevation: 20,
  },
});

export default memo(TaskItem);
