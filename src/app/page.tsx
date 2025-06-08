import React from 'react';
import { getContentFrontMatter, createDefaultContent, contentExists } from '../lib/mdx';
import DocsLayout from '../components/DocsLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 首页直接使用welcome内容
export default async function HomePage() {
  // 确保有默认内容
  await createDefaultContent();
  
  // 检查内容是否存在
  if (!contentExists('welcome', 'index')) {
    return (
      <DocsLayout>
        <div>
          <h1 className="text-3xl font-bold">欢迎使用 AI IDE</h1>
          <p className="mt-4">很抱歉，无法加载内容。</p>
        </div>
      </DocsLayout>
    );
  }
  
  // 获取内容元数据
  const content = getContentFrontMatter('welcome', 'index');
  
  if (!content) {
    return (
      <DocsLayout>
        <div>
          <h1 className="text-3xl font-bold">欢迎使用 AI IDE</h1>
          <p className="mt-4">很抱歉，无法加载内容。</p>
        </div>
      </DocsLayout>
    );
  }

  // 直接读取MDX文件内容
  const mdxPath = path.join(process.cwd(), 'src/content/welcome/index.mdx');
  const source = fs.readFileSync(mdxPath, 'utf8');
  const { content: mdxContent } = matter(source);

  // 使用内容渲染页面
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold">{content.frontMatter.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{content.frontMatter.description}</p>
        <div className="prose dark:prose-invert max-w-none mt-8">
          <MDXRemote source={mdxContent} />
        </div>
      </div>
    </DocsLayout>
  );
} 
 