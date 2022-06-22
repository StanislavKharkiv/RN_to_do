import React from 'react';
import Page from '../components/Page/Page';
import StatisticBar from '../components/StatisticBar/StatisticBar';
import {useTaskStatistic} from '../hooks';
export default function StatisticPage() {
  const {archived, done, uncompleted, all} = useTaskStatistic();

  return (
    <Page>
      <StatisticBar
        title="All closed tasks"
        color="gray"
        percent={100}
        quantity={archived}
      />
      <StatisticBar
        title="In progress"
        color="gray"
        percent={(all - archived) * 10}
        quantity={all - archived}
      />
      <StatisticBar
        title="Complete"
        color="green"
        percent={done.percent}
        quantity={done.quantity}
      />
      <StatisticBar
        title="Uncomplete"
        color="red"
        percent={uncompleted.percent}
        quantity={uncompleted.quantity}
      />
    </Page>
  );
}
