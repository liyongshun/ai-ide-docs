# AI IDE 介绍网站

这是一个基于Next.js构建的专业AI IDE文档网站，旨在展示AI IDE的功能和使用方法。网站采用了现代化的技术栈，提供了完整的文档结构和内容。

## 技术架构

- **前端框架**: [Next.js](https://nextjs.org/) (React)
- **样式系统**: [TailwindCSS](https://tailwindcss.com/)
- **内容管理**: [MDX](https://mdxjs.com/)
- **设计**: 响应式设计，适配各种设备

## 功能特点

- 清晰直观的导航栏和可折叠侧边栏
- 详细的AI IDE功能介绍
  - AI辅助编程
  - 智能代码分析
  - 自动完成
  - 自然语言交互
- 完整的快速入门指南
  - 安装指南
  - 配置说明
  - 项目设置
- 全面的API文档
  - 助手API
  - 插件API
  - 扩展系统
- 常见问题解答

## 安装指南

### 前置条件

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 依赖安装

克隆项目后，在项目根目录执行以下命令安装依赖：

```bash
npm install
```

## 运行开发环境

启动开发服务器：

```bash
npm run dev
```

然后在浏览器中访问 `http://localhost:3000`。

## 构建与部署

### 本地构建

执行以下命令来构建项目：

```bash
npm run build
```

构建后的文件将位于 `.next` 目录中。

### 本地运行生产版本

构建完成后，可以使用以下命令来运行生产版本：

```bash
npm run start
```

服务将在 `http://localhost:3000` 上启动。

### 部署到生产环境

#### 部署到Vercel（推荐）

作为Next.js应用，最简单的部署方式是使用[Vercel](https://vercel.com)平台：

1. 创建[Vercel](https://vercel.com)账号
2. 导入你的GitHub/GitLab/Bitbucket仓库
3. Vercel会自动检测Next.js项目并设置适当的构建配置
4. 点击"Deploy"按钮

#### 其他部署选项

也可以部署到其他支持Node.js的平台，如：

- **AWS Amplify**
  ```bash
  # 安装Amplify CLI
  npm install -g @aws-amplify/cli
  # 配置Amplify
  amplify configure
  # 初始化项目
  amplify init
  # 添加托管
  amplify add hosting
  # 发布
  amplify publish
  ```

- **Netlify**
  - 创建`netlify.toml`文件：
    ```toml
    [build]
      command = "npm run build"
      publish = ".next"

    [[plugins]]
      package = "@netlify/plugin-nextjs"
    ```
  - 连接到Netlify并部署

## 内容管理

网站内容以MDX文件形式存储在`src/content`目录中，按照以下结构组织：

- `features/`: AI IDE功能特性
- `getting-started/`: 快速入门指南
- `api/`: API文档
- `faq/`: 常见问题

## 自定义网站

### 修改样式

网站样式基于TailwindCSS，主要配置文件位于：

- `tailwind.config.js`: TailwindCSS配置
- `src/styles/`: 自定义CSS样式

### 修改布局

页面布局组件位于：

- `src/app/layout.tsx`: 主布局
- `src/components/`: 各种UI组件

## 许可证

ISC

---

© 2024 AI IDE介绍网站 