"use client";

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
};

export default function DocsLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="prose dark:prose-invert max-w-none">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 