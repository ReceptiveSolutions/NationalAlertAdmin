import React from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import { FaHome, FaNewspaper, FaPlus } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-700 border-t border-gray-700 py-8 mt-12">
      <Container>
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <Logo width="40px" />
              <span className="ml-3 text-xl font-bold text-white">News Admin</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Professional news content management system for administrators and editors
            </p>
          </div>

          <div className="flex justify-center space-x-6 text-sm font-medium">
            <Link 
              to="/" 
              className="flex items-center text-gray-300 hover:text-white "
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            <Link 
              to="/all-posts" 
              className="flex items-center text-gray-300 hover:text-white "
            >
              <FaNewspaper className="mr-2" />
              News
            </Link>
            <Link 
              to="/add-post" 
              className="flex items-center text-gray-300 hover:text-white "
            >
              <FaPlus className="mr-2" />
              Add News
            </Link>
          </div>

          <hr className="border-t border-gray-700 my-4 w-1/2 mx-auto" />

          <div className="text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} News Admin Panel. All rights reserved.</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;