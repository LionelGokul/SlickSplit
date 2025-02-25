import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import { NewHome, Groups, People, Expenses } from '@/pages/dashboard';
import { SignIn, SignUp } from '@/pages/auth';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '/home',
        element: <NewHome />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: 'groups',
        path: '/groups',
        element: <Groups />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: 'people',
        path: '/people',
        element: <People />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: 'expenses',
        path: '/expenses',
        element: <Expenses />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
