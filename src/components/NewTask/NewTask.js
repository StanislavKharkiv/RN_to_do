import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {PRIORITY_VALUES} from '../../constants/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TasksContext} from '../../../App';
import {routes} from '../../routes';

export default function NewTask() {
  const taskState = useContext(TasksContext);
  const navigation = useNavigation();
  const [taskText, onChangeTaskText] = React.useState('');
  const [open, setOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState(null);
  const [items, setItems] = useState(
    PRIORITY_VALUES.map(({value}) => ({label: value, value})),
  );

  const saveTask = async () => {
    const task = {
      id: Date.now(),
      title: taskText,
      priority: priorityValue,
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
        open={open}
        value={priorityValue}
        items={items}
        setOpen={setOpen}
        setValue={setPriorityValue}
        setItems={setItems}
        style={styles.input}
        onPress={Keyboard.dismiss}
        placeholder="Select"
      />
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
