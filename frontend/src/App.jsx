
import {
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import {
  AlertTriangle,
  Home,
} from 'lucide-react';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';

import ProtectedRoute from './routes/ProtectedRoute';




// ==========================================
// NOT FOUND PAGE
// ==========================================

function NotFoundPage() {

  return (

    <div className='min-h-screen bg-[#f7faf8] flex items-center justify-center px-6'>


      <div className='bg-white rounded-[40px] shadow-xl border border-emerald-100 p-10 max-w-xl w-full text-center'>


        <div className='w-24 h-24 mx-auto rounded-3xl bg-red-100 flex items-center justify-center mb-8'>

          <AlertTriangle className='text-red-600 w-12 h-12' />

        </div>




        <h1 className='text-7xl font-black text-slate-900 mb-4'>
          404
        </h1>




        <h2 className='text-3xl font-black text-slate-800 mb-4'>
          Page Not Found
        </h2>




        <p className='text-slate-500 leading-8 mb-10 text-lg'>
          The page you are looking for
          does not exist or may have been moved.
        </p>




        <Link
          to='/dashboard'
          className='inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg'
        >

          <Home className='w-5 h-5' />

          Back to Dashboard

        </Link>

      </div>

    </div>
  );
}




// ==========================================
// APP
// ==========================================

function App() {

  return (

    <Routes>


      {/* ROOT */}

      <Route
        path='/'
        element={
          <Navigate
            to='/login'
            replace
          />
        }
      />




      {/* AUTH */}

      <Route
        path='/login'
        element={<LoginPage />}
      />

      <Route
        path='/register'
        element={<RegisterPage />}
      />




      {/* DASHBOARD */}

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>

            <DashboardPage />

          </ProtectedRoute>
        }
      />




      {/* CHAT */}

      <Route
        path='/chat'
        element={
          <ProtectedRoute>

            <ChatPage />

          </ProtectedRoute>
        }
      />




      {/* ORDERS */}

      <Route
        path='/orders'
        element={
          <ProtectedRoute>

            <OrdersPage />

          </ProtectedRoute>
        }
      />




      {/* ANALYTICS */}

      <Route
        path='/analytics'
        element={
          <ProtectedRoute
            allowedRoles={['admin']}
          >

            <AnalyticsPage />

          </ProtectedRoute>
        }
      />




      {/* 404 */}

      <Route
        path='*'
        element={<NotFoundPage />}
      />

    </Routes>
  );
}




export default App;

