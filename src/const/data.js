/**
 * This is the file used for screens in custom side bar
 */
import Images from '../assets/Images/Images';
import ScreenName from '../navigation/ScreenName';

export const drawerData = [
  {
    icon: Images.dashboard,
    title: 'Dashboard',
    screenName: ScreenName.Dashboard,
  },
  {
    icon: Images.list,
    header: 'Proyectos',
    title: 'Lista de proyectos',
    screenName: ScreenName.ProjectList,
  },
  {
    icon: Images.user,
    header: 'Usuarios',
    title: 'List de usuarios',
    screenName: ScreenName.UserList,
  },
  {
    icon: Images.list,
    header: 'Roles',
    title: 'administrar roles',
  },
  {
    icon: Images.logout,
    header: 'cerrar sesión',
    title: 'cerrar sesións',
    type: 'logout',
  },
];
