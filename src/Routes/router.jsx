import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error/Error';
import SignIn from '../Pages/Authentication/SignIn';
import PrivateNavigator from './PrivateNavigator';
import Home from '../Pages/Home/Home';
import Empty from '../Pages/Home/Empty';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateNavigator>
        <MainLayout />
      </PrivateNavigator>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Empty />,
      },
      {
        path: '/:id',
        element: <Home />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
]);

export default router;
