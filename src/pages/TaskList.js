import React, {useContext} from 'react';
import {SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native';
import TaskItem from '../components/TaskItem/TaskItem';
import {TasksContext} from '../../App';
import Page from '../components/Page/Page';

export default function TaskListPage() {
  const task = useContext(TasksContext);

  return (
    <Page>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={task.allTasks}
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
  container: {
    marginTop: StatusBar.currentHeight / 2 || 0,
    marginBottom: StatusBar.currentHeight / 2,
  },
});
