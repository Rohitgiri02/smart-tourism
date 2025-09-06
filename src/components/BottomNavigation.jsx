import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, FileText, BookOpen, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
    },
    {
      id: 'map',
      label: 'Map',
      icon: Map,
      path: '/map',
    },
    {
      id: 'report',
      label: 'Report',
      icon: FileText,
      path: '/report',
    },
    {
      id: 'guidelines',
      label: 'Guidelines',
      icon: BookOpen,
      path: '/guidelines',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-1 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon
                  size={20}
                  className={`mb-1 transition-transform ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'font-semibold' : 'font-normal'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
