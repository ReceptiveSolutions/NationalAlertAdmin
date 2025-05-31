import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../src/appwrite/auth';
import { logout } from '../../src/store/authSlice';
import { Container } from '../components/index';
import { FaUser, FaEnvelope, FaSignOutAlt, FaUserCircle, FaNewspaper, FaPlus, FaHome, FaEdit } from 'react-icons/fa';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  React.useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container>
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white text-center">
              <div className="flex justify-center mb-4">
                <FaUserCircle className="w-20 h-20 text-white bg-gray-500 rounded-full p-2" />
              </div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-blue-100">{userData.email}</p>
            </div>

            {/* Account Details */}
            <div className="p-6">
              

              
            </div>

            {/* Quick Actions */}
            <div className="p-6 border-t">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/all-posts')}
                  className="flex items-center p-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg transition"
                >
                  <FaNewspaper className="text-white mr-3" />
                  <span className='text-white'>View Articles</span>
                </button>
                <button
                  onClick={() => navigate('/add-post')}
                  className="flex items-center p-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg transition"
                >
                  <FaPlus className="text-white mr-3" />
                  <span className='text-white'>New Article</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center p-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg transition"
                >
                  <FaHome className="text-white mr-3" />
                  <span className='text-white'>Dashboard</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="p-6 border-t">
              <button
                onClick={logoutHandler}
                className="w-full flex items-center justify-center py-2 px-4 bg-gradient-to-r from-gray-900 to-gray-700 hover:bg-red-700 text-white rounded-lg transition"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 

export default Profile;