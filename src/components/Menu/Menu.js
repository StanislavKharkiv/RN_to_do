import React from 'react';
import {Link, useRoute} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faListUl,
  faEdit,
  faChartBar,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {routes} from '../../routes';

const ICON_COLOR = '#808080';
const ICON_COLOR_ACTIVE = '#111111';

const MenuItem = ({icon, route}) => {
  const currentRoute = useRoute();
  const getIconColor = routeName =>
    routeName === currentRoute.name ? ICON_COLOR_ACTIVE : ICON_COLOR;

  return (
    <Link style={styles.link} to={{screen: route}}>
      <FontAwesomeIcon icon={icon} size={30} color={getIconColor(route)} />
    </Link>
  );
};
export default function Menu() {
  return (
    <View style={styles.menu}>
      <MenuItem icon={faListUl} route={routes.taskList} />
      <MenuItem icon={faEdit} route={routes.newTask} />
      <MenuItem icon={faChartBar} route={routes.statistic} />
      <MenuItem icon={faCog} route={routes.settings} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: 'white',
  },
  link: {
    height: 30,
    textAlign: 'center',
  },
});
