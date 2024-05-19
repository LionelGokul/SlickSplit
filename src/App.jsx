import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import { useMaterialTailwindController } from '@/context';
import '@/App.css';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { userDetails } = controller;
  const isLoggedIn = userDetails.id;

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route
            path='*'
            element={<Navigate to='/dashboard/people' replace />}
          />
        </>
      ) : (
        <>
          <Route path='/auth/*' element={<Auth />} />
          <Route path='*' element={<Navigate to='/auth/sign-in' replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
