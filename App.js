import React, {useEffect, useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListPage from './src/pages/TaskList';
import NewTaskPage from './src/pages/NewTask';
import StatisticPage from './src/pages/Statistic';
import SettingsPage from './src/pages/Settings';
import {routes} from './src/routes';

const Stack = createNativeStackNavigator();
export const TasksContext = createContext();

const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null); // null or task id
  const deleteTask = id => setAllTasks(allTasks.filter(task => task.id !== id));
  const addTask = task => setAllTasks([...allTasks, task]);
  const patchTask = (id, fields) => {
    const tasks = [...allTasks];
    setAllTasks(
      tasks.map(item => {
        if (item.id === id) return {...item, ...fields};
        return item;
      }),
    );
  };

  useEffect(() => {
    const importData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const data = result.map(req => JSON.parse(req[1]));
        setAllTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    importData();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        allTasks,
        deleteTask,
        addTask,
        patchTask,
        currentTask,
        setCurrentTask,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={routes.taskList} component={TaskListPage} />
          <Stack.Screen name={routes.newTask} component={NewTaskPage} />
          <Stack.Screen name={routes.statistic} component={StatisticPage} />
          <Stack.Screen name={routes.settings} component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksContext.Provider>
  );
};

export default App;
