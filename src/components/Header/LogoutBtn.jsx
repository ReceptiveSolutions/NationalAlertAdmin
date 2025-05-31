import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutBtn({ mobile, onClick }) {
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate('/profile');
    // If it's mobile menu, close it
    if (mobile && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={profileHandler}
      className="px-5 py-2 text-sm font-medium rounded-full bg-[#EAD7C3] text-[#4B3621] hover:bg-[#C8B6A6] shadow-sm transition-all cursor-pointer"
    >
      Profile 
    </button>
  );
}

export default LogoutBtn;