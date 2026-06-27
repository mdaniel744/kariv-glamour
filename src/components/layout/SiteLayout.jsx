import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}