import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 内容目录
const contentDirectory = path.join(process.cwd(), 'src/content');

// 获取所有的MDX文件路径
export async function getAllContentSlugs(contentType: string) {
  const contentPath = path.join(contentDirectory, contentType);
  
  if (!fs.existsSync(contentPath)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentPath);
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => ({
      params: { 
        slug: fileName.replace(/\.mdx$/, ''),
      },
    }));
}

// 读取MDX文件内容的前置元数据
export function getContentFrontMatter(contentType: string, slug: string) {
  const fullPath = path.join(contentDirectory, contentType, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      frontMatter: data,
    };
  } catch (error) {
    console.error(`Error processing MDX frontmatter ${fullPath}:`, error);
    return {
      slug,
      frontMatter: { 
        title: `出错了: ${slug}`, 
        description: "无法加载此内容" 
      },
    };
  }
}

// 检查内容是否存在
export function contentExists(contentType: string, slug: string) {
  const fullPath = path.join(contentDirectory, contentType, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}

// 创建默认内容
export async function createDefaultContent() {
  // 检查内容目录是否存在，如果不存在则创建
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }

  // 创建欢迎页内容
  const welcomePath = path.join(contentDirectory, 'welcome');
  if (!fs.existsSync(welcomePath)) {
    fs.mkdirSync(welcomePath, { recursive: true });
    
    const welcomeContent = `---
title: "欢迎使用AI IDE"
description: "为2万开发者打造的智能集成开发环境"
---

# 欢迎使用 AI IDE

AI IDE 是一款革命性的智能集成开发环境，专为现代开发者打造。它融合了先进的AI技术，使编程更加高效、直观和愉悦。

## 主要功能

- **AI辅助编程** - 让AI成为您的编程伙伴，提供代码建议和智能补全
- **智能代码分析** - 深入分析您的代码库，识别问题并提供优化建议 
- **自然语言交互** - 使用自然语言描述您的需求，AI将帮助您实现
- **跨平台支持** - Windows、macOS和Linux全平台支持

## 快速入门

立即开始使用我们的产品，体验AI驱动的编程新时代：

\`\`\`bash
# 安装AI IDE
npm install -g ai-ide

# 启动IDE
ai-ide
\`\`\`

[了解更多功能特性](/features) | [查看安装指南](/getting-started/installation)
`;
    fs.writeFileSync(path.join(welcomePath, 'index.mdx'), welcomeContent);
  }
} 