import React from 'react';
import { getContentFrontMatter, getAllContentSlugs, createDefaultContent, contentExists } from '../../lib/mdx';
import DocsLayout from '../../components/DocsLayout';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

// 生成静态路径
export async function generateStaticParams() {
  // 确保有默认内容
  await createDefaultContent();
  
  // 获取所有可能的路径
  const sections = ['features', 'getting-started', 'api', 'faq'];
  let paths: { params: { slug: string[] } }[] = [];
  
  for (const section of sections) {
    const slugs = await getAllContentSlugs(section);
    const sectionPaths = slugs.map((slug) => ({
      params: { 
        slug: [section, slug.params.slug],
      },
    }));
    
    // 添加section索引页
    paths.push({ params: { slug: [section] } });
    
    // 添加各个子页面
    paths = [...paths, ...sectionPaths];
  }
  
  return paths;
}

export default async function ContentPage({ params }: Props) {
  // 先await params参数，然后再访问其属性
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  if (slugArray.length === 0) {
    notFound();
  }
  
  // 如果只有一个路径段，则查找该部分的索引页
  let contentType = slugArray[0];
  let contentSlug = slugArray.length > 1 ? slugArray[1] : 'index';
  
  // 检查内容是否存在
  if (!contentExists(contentType, contentSlug)) {
    notFound();
  }

  // 获取内容元数据
  const content = getContentFrontMatter(contentType, contentSlug);
  
  if (!content) {
    notFound();
  }

  // 直接读取MDX文件内容
  const mdxPath = path.join(process.cwd(), 'src/content', contentType, `${contentSlug}.mdx`);
  const source = fs.readFileSync(mdxPath, 'utf8');
  const { content: mdxContent } = matter(source);
  
  return (
    <DocsLayout>
      <div>
        <h1 className="text-3xl font-bold">{content.frontMatter.title}</h1>
        {content.frontMatter.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{content.frontMatter.description}</p>
        )}
        <div className="prose dark:prose-invert max-w-none mt-8">
          <MDXRemote source={mdxContent} />
        </div>
      </div>
    </DocsLayout>
  );
} 