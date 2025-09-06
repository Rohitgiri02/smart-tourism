import React, { useState } from 'react';
import { User, LogIn, LogOut, Menu } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Profile/Menu */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">Profile</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      View Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Help & Support
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2">
                <Menu size={20} className="text-gray-600" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">Menu</span>
              </div>
            )}
          </div>

          {/* Center - Logo/Title */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ST</span>
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Smart Tourism
              </h1>
            </div>
          </div>

          {/* Right side - Login/Logout */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:block">Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200"
              >
                <LogIn size={16} />
                <span className="hidden sm:block">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
