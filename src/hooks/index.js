import {useContext, useMemo} from 'react';
import {TasksContext} from '../../App';

export const useTaskStatistic = () => {
  const {allTasks} = useContext(TasksContext);

  const archivedTasks = useMemo(() => {
    return allTasks.filter(({archived}) => archived);
  }, [allTasks]);

  const doneTasks = useMemo(() => {
    return archivedTasks.filter(({done}) => done);
  }, [archivedTasks]);
  const uncompletedTasks = archivedTasks.length - doneTasks.length;

  return {
    all: allTasks.length,
    archived: archivedTasks.length,
    done: {
      quantity: doneTasks.length,
      percent: getPercent(archivedTasks.length, doneTasks.length),
    },
    uncompleted: {
      quantity: uncompletedTasks,
      percent: getPercent(archivedTasks.length, uncompletedTasks),
    },
  };
};

function getPercent(all, quantity) {
  return (quantity * 100) / all;
}
