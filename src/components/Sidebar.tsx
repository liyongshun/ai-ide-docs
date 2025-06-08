"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  title: string;
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: '欢迎',
    href: '/',
  },
  {
    title: '功能特性',
    href: '/features',
    children: [
      { title: 'AI 辅助编程', href: '/features/ai-programming' },
      { title: '智能代码分析', href: '/features/code-analysis' },
      { title: '自动完成', href: '/features/auto-completion' },
      { title: '自然语言交互', href: '/features/nl-interaction' },
    ],
  },
  {
    title: '快速开始',
    href: '/getting-started',
    children: [
      { title: '安装指南', href: '/getting-started/installation' },
      { title: '配置说明', href: '/getting-started/configuration' },
      { title: '项目设置', href: '/getting-started/project-setup' },
    ],
  },
  {
    title: 'API 文档',
    href: '/api',
    children: [
      { title: 'AI 助手API', href: '/api/assistant' },
      { title: '插件开发', href: '/api/plugins' },
      { title: '扩展系统', href: '/api/extensions' },
    ],
  },
  {
    title: '常见问题',
    href: '/faq',
  },
];

const NavItemComponent = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const pathname = usePathname();
  
  const isChildActive = hasChildren && item.children?.some(child => child.href === pathname);
  
  return (
    <div className="my-1">
      <div className="flex items-center justify-between">
        <Link 
          href={item.href}
          className={`flex-grow py-1 px-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div className="ml-4 pl-2 border-l border-gray-200 dark:border-gray-700">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block py-1 px-2 my-1 rounded transition-colors ${
                pathname === child.href
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-full overflow-y-auto">
      <div className="py-6 px-4">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">文档</h2>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavItemComponent 
              key={item.href} 
              item={item} 
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
} 