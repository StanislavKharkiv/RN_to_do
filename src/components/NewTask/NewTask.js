import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TasksContext} from '../../../App';
import {routes} from '../../routes';

export default function NewTask() {
  const taskState = useContext(TasksContext);
  const navigation = useNavigation();
  const [taskText, onChangeTaskText] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const [priorityValue, setPriorityValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [items, setItems] = useState(
    PRIORITY_VALUES.map(({value}) => ({label: value, value})),
  );

  const saveTask = async () => {
    const task = {
      id: Date.now(),
      title: taskText,
      priority: priorityValue,
      done: false,
      archived: false,
    };
    try {
      await AsyncStorage.setItem(String(task.id), JSON.stringify(task));
      taskState.addTask(task);
      onChangeTaskText('');
      navigation.navigate(routes.taskList);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Task name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTaskText}
        value={taskText}
      />
      <Text style={styles.label}>Task priority</Text>
      <DropDownPicker
        open={openSelect}
        value={priorityValue}
        items={items}
        setOpen={setOpenSelect}
        setValue={setPriorityValue}
        setItems={setItems}
        style={styles.input}
        onPress={Keyboard.dismiss}
        placeholder="Select"
      />
      <View style={styles.dateWrapper}>
        <Pressable
          style={[styles.button, styles.dateButton]}
          onPress={() => setOpenDatePicker(true)}>
          <Text style={styles.textStyle}>Set end date</Text>
        </Pressable>
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          onConfirm={date => {
            setOpenDatePicker(false);
            setDate(date);
            setIsSelectDate(true);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        {isSelectDate && (
          <Text style={styles.label}>{date.toDateString()}</Text>
        )}
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={saveTask}>
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    padding: 20,
    justifyContent: 'center',
    height: '100%',
  },
  label: {
    marginBottom: 4,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 20,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    elevation: 2,
    width: '50%',
    backgroundColor: 'green',
    textTransform: 'capitalize',
  },
  buttonWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dateWrapper: {
    alignItems: 'center',
  },
  dateButton: {
    width: '100%',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
