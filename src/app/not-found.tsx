import React from 'react';
import Link from 'next/link';
import DocsLayout from '../components/DocsLayout';

export default function NotFound() {
  return (
    <DocsLayout>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4">页面未找到</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          抱歉，您请求的页面不存在或已被移除。
        </p>
        <Link 
          href="/"
          className="mt-8 btn btn-primary"
        >
          返回首页
        </Link>
      </div>
    </DocsLayout>
  );
} 