
import {
  Navigate,
  useLocation,
} from 'react-router-dom';

import {
  ShieldX,
} from 'lucide-react';




function ProtectedRoute(props) {

  const children =
  props.children;

  const allowedRoles =
  props.allowedRoles || [];




  const token =
  localStorage.getItem('token');




  const user =
  JSON.parse(
    localStorage.getItem('user')
  );




  const location =
  useLocation();




  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!token) {

    return (

      <Navigate
        to='/login'
        state={{
          from: location,
        }}
        replace
      />
    );
  }




  // =========================================
  // USER NOT FOUND
  // =========================================

  if (!user) {

    return (

      <Navigate
        to='/login'
        replace
      />
    );
  }




  // =========================================
  // ROLE CHECK
  // =========================================

  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(
      user.role
    )

  ) {

    return (

      <div className='min-h-screen bg-[#f7faf8] flex items-center justify-center px-6'>


        <div className='bg-white border border-red-100 rounded-[36px] p-10 max-w-lg w-full text-center shadow-xl'>


          <div className='w-24 h-24 rounded-[30px] bg-red-100 flex items-center justify-center mx-auto mb-8'>


            <ShieldX className='w-12 h-12 text-red-600' />

          </div>




          <h1 className='text-4xl font-black text-slate-900 mb-5'>
            Access Denied
          </h1>




          <p className='text-slate-500 leading-8 text-lg'>
            You do not have permission
            to access this page.
          </p>

        </div>

      </div>
    );
  }




  return children;
}

export default ProtectedRoute;

