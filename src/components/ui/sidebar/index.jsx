"use client"

import React, { useEffect, useCallback } from 'react';
import { 
  X, 
  Settings, 
  Home, 
  Users, 
  CheckSquare, 
  Briefcase, 
  FileText, 
  BarChart3, 
  MessageSquare 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Leads & Pipelines', href: '/dashboard/lead-pipelines', icon: BarChart3 },
  { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Accounting Reports', href: '/dashboard/accounting-reports', icon: FileText },
  { label: 'HR Analytics', href: '/dashboard/hr-analysis', icon: Briefcase },
  { label: 'Chat Support', href: '/dashboard/chat-support', icon: MessageSquare }
];

export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeMenuItem = 'Dashboard',
  userImage = '/images/user.png',
  userName = 'User'
}) {

  const router = useRouter();

  // Close sidebar on ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  // Disable body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [sidebarOpen]);

  const handleProfileClick = useCallback(() => {
    router.push('/dashboard/profile');
  }, [router]);

  const handleSettingsClick = useCallback(() => {
    router.push('/dashboard/settings');
  }, [router]);

  const handleMenuClick = useCallback((href) => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    setTimeout(() => {
      router.push(href);
    }, 50);

  }, [router, setSidebarOpen]);

  const handleOverlayClick = () => setSidebarOpen(false);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-linear-to-b from-purple-950 via-purple-900 to-purple-950 transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-2xl lg:relative overflow-y-auto scrollbar-hide`}
      >

        {/* Profile */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity rounded-lg p-2 -m-2"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/20 shadow-lg">
              <img 
                src={userImage} 
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left">
              <p className="text-white font-semibold text-base">Welcome!</p>
              <p className="text-white/70 text-sm">{userName}</p>
            </div>
          </button>

          <button 
            onClick={handleCloseSidebar} 
            className="text-white hover:bg-white/10 p-2 rounded-lg lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="py-4 pb-28">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === activeMenuItem;

              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleMenuClick(item.href)}
                    className={`flex items-center gap-3 px-6 py-4 w-full text-left transition-all ${
                      isActive
                        ? 'text-white bg-white/10 border-l-4 border-white font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 py-6 px-6 border-t border-white/10 bg-linear-to-t from-purple-950 to-transparent">
          <button 
            onClick={handleSettingsClick}
            className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 w-full px-4 py-3 rounded-lg"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
