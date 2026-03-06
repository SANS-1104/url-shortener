import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Link2, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

/**
 * @typedef {Object} DashboardLayoutProps
 * @property {ReactNode} children
 */

/**
 * @param {DashboardLayoutProps} props
 */
export function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/my-urls', icon: Link2, label: 'My URLs' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <button type="button" onClick={()=>{navigate("/")}}>
            <div className="p-6 py-[1.1rem] border-b border-gray-200">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Link2 className="size-5 text-white" />
                </div>
                <span className="font-bold text-xl">LinkShort</span>
              </Link>
            </div>
          </button>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="size-10 rounded-full bg-gray-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="size-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 lg:ml-0 ml-12">
                {/* Breadcrumb or page title can go here */}
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="size-5" />
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                </button>
                <div className="hidden sm:flex items-center gap-3">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="size-8 rounded-full bg-gray-200"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}