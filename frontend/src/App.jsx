import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';

import LoginPage from './pages/LoginPage';

import DashboardPage from './pages/DashboardPage';

import ChatPage from './pages/ChatPage';

import OrdersPage from './pages/OrdersPage';

import AnalyticsPage from './pages/AnalyticsPage';

import ProtectedRoute from './routes/ProtectedRoute';

import {
  AlertTriangle,
  Home,
} from 'lucide-react';


function NotFoundPage() {

  return (

    <div className='min-h-screen bg-slate-100 flex items-center justify-center px-6'>


      <div className='bg-white rounded-[40px] shadow-2xl border border-slate-200 p-10 max-w-xl w-full text-center'>


        <div className='w-24 h-24 mx-auto rounded-3xl bg-red-100 flex items-center justify-center mb-8'>

          <AlertTriangle className='text-red-600 w-12 h-12' />

        </div>


        <h1 className='text-6xl font-bold text-slate-900 mb-4'>
          404
        </h1>


        <h2 className='text-3xl font-bold text-slate-800 mb-4'>
          Page Not Found
        </h2>


        <p className='text-slate-500 leading-8 mb-10'>
          The page you are looking for does not exist
          or may have been moved.
        </p>


        <a
          href='/dashboard'
          className='inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold'
        >

          <Home className='w-5 h-5' />

          Back to Dashboard

        </a>

      </div>

    </div>
  );
}


function App() {

  return (

    <Routes>


      <Route
        path='/'
        element={
          <Navigate
            to='/login'
            replace
          />
        }
      />


      <Route
        path='/login'
        element={<LoginPage />}
      />


      <Route
        path='/register'
        element={<RegisterPage />}
      />


      <Route
        path='/dashboard'
        element={

          <ProtectedRoute>

            <DashboardPage />

          </ProtectedRoute>
        }
      />


      <Route
        path='/chat'
        element={

          <ProtectedRoute>

            <ChatPage />

          </ProtectedRoute>
        }
      />


      <Route
        path='/orders'
        element={

          <ProtectedRoute>

            <OrdersPage />

          </ProtectedRoute>
        }
      />


      <Route
        path='/analytics'
        element={

          <ProtectedRoute>

            <AnalyticsPage />

          </ProtectedRoute>
        }
      />


      <Route
        path='*'
        element={<NotFoundPage />}
      />


    </Routes>
  );
}

export default App;