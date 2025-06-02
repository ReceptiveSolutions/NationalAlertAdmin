import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../src/appwrite/auth';
import { logout } from '../../src/store/authSlice';
import { Container } from '../components/index';
import { FaUser, FaEnvelope, FaSignOutAlt, FaUserCircle, FaNewspaper, FaPlus, FaHome, FaEdit, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const logoutHandler = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');
    });
    setShowLogoutAlert(false);
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
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
    <div className="min-h-[70vh] bg-gradient-to-br from-slate-50 to-blue-50 py-6">
      <Container>
        <div className="max-w-6xl mx-auto px-2">
          <div className="  border border-white/20 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Side - Profile Info */}
              <div className="lg:w-1/3">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <FaUserCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white shadow-md"></div>
                  </div>
                  <div className="text-center lg:text-left w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 break-words">{userData.name}</h1>
                    <div className="text-slate-600 text-base sm:text-lg mb-4">
                      <div className="flex items-center justify-center lg:justify-start flex-wrap">
                        <FaEnvelope className="mr-2 text-blue-500 flex-shrink-0" />
                        <span className="break-all text-sm sm:text-base">{userData.email}</span>
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-center lg:justify-start text-sm text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span>Active now</span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="lg:w-2/3">
                <div className="mb-6 text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Quick Actions</h2>
                  <p className="text-slate-600 text-sm sm:text-base">Manage your content and account</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={() => navigate('/all-posts')}
                    className="group flex items-center p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
                  >
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-white/30 transition-all flex-shrink-0">
                      <FaNewspaper className="text-lg sm:text-xl" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-base sm:text-lg">View Articles</div>
                      <div className="text-blue-100 text-xs sm:text-sm">Browse your posts</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/add-post')}
                    className="group flex items-center p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
                  >
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-white/30 transition-all flex-shrink-0">
                      <FaPlus className="text-lg sm:text-xl" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-base sm:text-lg">New Article</div>
                      <div className="text-emerald-100 text-xs sm:text-sm">Create content</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="group flex items-center p-4 sm:p-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
                  >
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-white/30 transition-all flex-shrink-0">
                      <FaHome className="text-lg sm:text-xl" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-base sm:text-lg">Dashboard</div>
                      <div className="text-purple-100 text-xs sm:text-sm">Go to home</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={logoutHandler}
                    className="group flex items-center p-4 sm:p-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
                  >
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-white/30 transition-all flex-shrink-0">
                      <FaSignOutAlt className="text-lg sm:text-xl" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-base sm:text-lg">Sign Out</div>
                      <div className="text-red-100 text-xs sm:text-sm">End session</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Logout Confirmation */}
      {showLogoutAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-red-500 text-xl sm:text-2xl" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Confirm Logout</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 

export default Profile;