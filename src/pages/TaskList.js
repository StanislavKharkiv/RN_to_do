import React, {useContext, useMemo} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import TaskItem from '../components/TaskItem/TaskItem';
import {TasksContext} from '../../App';
import Page from '../components/Page/Page';
import {routes} from '../routes';

export default function TaskListPage({navigation}) {
  const task = useContext(TasksContext);
  const allTasks = useMemo(
    () => task.allTasks.filter(({archived}) => !archived),
    [task.allTasks],
  );
  const hasTasks = allTasks.length > 0;

  return (
    <Page>
      <SafeAreaView
        style={
          hasTasks
            ? styles.container
            : [styles.container, styles.containerCenter]
        }>
        {!hasTasks && (
          <View style={styles.noTasksWrap}>
            <Text style={styles.noTasks}>No tasks yet</Text>
            <Button
              title="Create task"
              onPress={() => navigation.navigate(routes.newTask)}
            />
          </View>
        )}
        <FlatList
          data={allTasks}
          renderItem={({item}) => (
            <TaskItem item={item} deleteTask={task.deleteTask} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Page>
  );
}

const styles = StyleSheet.create({
  noTasks: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  container: {
    marginBottom: 30,
    paddingBottom: 20,
  },
  containerCenter: {
    alignItems: 'center',
  },
  noTasksWrap: {
    marginTop: 50,
    width: 180,
  },
});
