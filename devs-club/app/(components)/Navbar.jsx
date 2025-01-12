import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { UserButton, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../public/assets/image.png";
import { Button } from "../../components/ui/button";

const navItems = [
  { name: "About", icon: "🎯" },
  { name: "Team", icon: "👩‍💻" },
  { name: "Achievements", icon: "🏆" },
  { name: "Projects", icon: "💻" },
  { name: "Open-Source", icon: "🌟" },
  { name: "Contact", icon: "📧" },
  { name: "Events", icon: "📅" },
  { name: "Dashboard", icon: "📊" }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md sticky z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src={logo}
                alt="Developers Club Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="font-semibold text-xl text-gray-800">
              Developers Club
            </span>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link 
                  href={`/${item.name.toLowerCase()}`}
                  className="px-3 py-2 rounded-full text-base font-medium text-gray-900 transition-all duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            {isSignedIn && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link 
                  href="/dashboard"
                  className="px-3 py-2 rounded-full text-base font-medium text-gray-900 transition-all duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </motion.div>
            )}
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "right-0"
                  }
                }}
              />
            ) : (
              <Link href="/sign-in">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                              px-6 py-2 rounded-lg font-medium
                              transition-all duration-300
                              hover:from-blue-700 hover:to-blue-900
                              shadow-md hover:shadow-xl
                              border border-blue-400/20
                              flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Login
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Dropdown Menu */}
          <div className="md:hidden mobile-menu-container relative">
            <div className="flex items-center gap-2">
              {isSignedIn && (
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "right-0"
                    }
                  }}
                />
              )}
              <button 
                className="dropdown-toggle group rounded-xl border border-gray-300 p-2 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuToggle();
                }}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
              </button>
            </div>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                  style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
                >
<<<<<<< HEAD
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link 
                        key={item.name} 
                        href={`/${item.name.toLowerCase()}`}
                        onClick={handleMenuToggle}
                      >
                        <div className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors duration-200">
                          <span className="mr-3 text-xl">{item.icon}</span>
                          <span className="text-gray-700 font-medium">{item.name}</span>
                        </div>
                      </Link>
                    ))}
                    {!isSignedIn && (
                      <Link 
                        href="/sign-in" 
                        onClick={handleMenuToggle}
                      >
                        <div className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors duration-200 border-t border-gray-100">
                          <span className="mr-3 text-xl">🔑</span>
                          <span className="text-gray-700 font-medium">Login</span>
                        </div>
                      </Link>
                    )}
                  </div>
=======
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={`/${item.name.toLowerCase()}`}
                      onClick={handleMenuToggle}
                    >
                      <div className="flex items-center p-2 hover:bg-blue-100 transition duration-200 rounded-2xl">
                        <span className="mr-2 text-xl">{item.icon}</span>
                        {item.name}
                      </div>
                    </Link>
                  ))}
                  {isSignedIn && (
                    <Link 
                      href="/dashboard"
                      onClick={handleMenuToggle}
                    >
                      <div className="flex items-center p-2 hover:bg-blue-100 transition duration-200 rounded-2xl">
                        <span className="mr-2 text-xl">📋</span>
                        Dashboard
                      </div>
                    </Link>
                  )}
                  {!isSignedIn && (
                    <Link 
                      href="/dashboard" 
                      onClick={handleMenuToggle}
                    >
                      <div className="flex items-center p-2 hover:bg-blue-100 transition duration-200 rounded-2xl">
                        <span className="mr-2 text-xl">🔑</span>
                        Login
                      </div>
                    </Link>
                  )}
>>>>>>> b212a5e436e859a3e9748adf2202404a79e290e5
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
