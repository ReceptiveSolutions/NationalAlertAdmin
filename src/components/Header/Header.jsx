import React from 'react';
import { Container, Logo, LogoutBtn, Profile } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaBars, FaTimes, FaNewspaper, FaHome, FaUserPlus, FaSignInAlt, FaPlus } from 'react-icons/fa';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true, icon: <FaHome className="mr-2" /> },
    { name: 'Login', slug: '/login', active: !authStatus, icon: <FaSignInAlt className="mr-2" /> },
    { name: 'Signup', slug: '/signup', active: !authStatus, icon: <FaUserPlus className="mr-2" /> },
    { name: 'All News', slug: '/all-posts', active: authStatus, icon: <FaNewspaper className="mr-2" /> },
    { name: 'Add News', slug: '/add-post', active: authStatus, icon: <FaPlus className="mr-2" /> },
    { path: '/profile', element: <Profile /> }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-gradient-to-r from-gray-900 to-gray-700 border-b border-gray-700 shadow-lg mb-8">
      <Container>
        <nav className="flex flex-wrap items-center justify-between">
          <div className="flex items-center mr-6">
            <Link to="/" className="flex items-center">
              <Logo width="40px" />
              <span className="ml-3 text-xl font-bold text-white hidden sm:inline">News Admin</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex ml-auto items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="bg-red-600 hover:bg-red-700" />
              </li>
            )}
          </ul>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="w-full lg:hidden">
              <ul className="flex flex-col items-center space-y-2 pt-4 pb-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name} className="w-full text-center">
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center w-full px-5 py-3 text-sm font-medium rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          {item.icon}
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <li className="w-full text-center">
                    <LogoutBtn 
                      mobile={true} 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;