"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuLayoutDashboard, LuLogOut, LuSun, LuMoon, LuShieldCheck } from "react-icons/lu";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    //setMounted(true);
  }, []);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recipes", href: "/browse" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Admin Panel", href: "/admin" }, // Added Admin Panel
  ];

  // Prevent hydration mismatch
  /* useEffect(() => setMounted(true), []);
  if (!mounted) return null; */

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:opacity-90">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg" />
          <span className="text-xl font-bold text-black dark:text-white tracking-tight">RecipeHub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-green-600 transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Account / Profile Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all"
          >
            {mounted ? (
              resolvedTheme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />
            ) : (
              <LuMoon size={20} />
            )}
          </button>

          <div className="relative group">
            <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all">
              <div className="w-8 h-8 bg-white/20 rounded-full" />
              <span className="font-medium">Abc</span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <LuLayoutDashboard size={18} /> Dashboard
              </Link>
              <button 
                className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LuLogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;