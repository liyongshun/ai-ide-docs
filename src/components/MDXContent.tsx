"use client";

import React from 'react';
import { MDXProvider } from '@mdx-js/react';

// 自定义MDX组件
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mb-3 mt-6" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mb-2 mt-4" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  code: (props: any) => {
    const { children, className } = props;
    // 检查是否为代码块或内联代码
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (!match) {
      return (
        <code
          className="rounded bg-gray-100 dark:bg-gray-800 px-1 py-0.5 font-mono text-sm"
          {...props}
        />
      );
    }
    
    return (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto mb-4">
        <code className={`language-${language} font-mono text-sm`}>
          {children}
        </code>
      </pre>
    );
  },
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto mb-4 font-mono text-sm" {...props} />
  ),
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />
  ),
};

interface MDXContentProps {
  children: React.ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <MDXProvider components={components}>
      <div className="mdx-content prose dark:prose-invert max-w-none">
        {children}
      </div>
    </MDXProvider>
  );
} 