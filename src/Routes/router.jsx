import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Authentication/SignIn';
import PrivateNavigator from './PrivateNavigator';

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
        path: '/',
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
