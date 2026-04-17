# 项目总览手册

这份文档用于在项目根目录快速了解仓库现状，方便后续自己或协作方每次进入项目时都能迅速建立上下文。

## 1. 项目定位

这是一个个人品牌站 Monorepo，目标是把以下内容整合到同一个站点里：

- 个人介绍与职业经历
- 项目案例展示
- 媒体内容展示（摄影 / 视频）
- AI 对话入口
- 后台管理能力

当前仓库已经完成了前后端骨架、主要页面结构、核心占位数据与部署基础设施，但还没有完全接入真实内容管理、知识库检索、对象存储上传和正式鉴权。

## 2. 当前选型

### 仓库级

- Monorepo: `pnpm workspace`
- 包管理器: `pnpm@10.12.1`
- 代码组织: `frontend` + `backend` 分仓式结构

### 前端

- 框架: `Next.js 16.2.1`
- 路由模式: `App Router`
- React: `19.2.4`
- 语言: `TypeScript`
- 样式方案: `Tailwind CSS v4` + `app/globals.css` 中的全局设计变量
- 渲染特点:
  - 基于文件系统路由
  - 中英文双语路由
  - `generateStaticParams` 预生成语言与项目详情页
  - 使用 `basePath: "/person-site"`
  - `output: "standalone"` 方便容器化部署

### 后端

- 框架: `NestJS 11`
- 语言: `TypeScript`
- ORM: `TypeORM 0.3`
- 数据库: `MySQL` + `mysql2`
- 配置: `@nestjs/config`
- 当前状态:
  - 已有模块化接口骨架
  - 部分接口仍返回占位数据
  - 已有 MySQL 连接与调试接口

### 部署

- 容器化: `frontend/Dockerfile`、`backend/Dockerfile`
- CI/CD: `.github/workflows/`
- 反向代理示例: `deploy/nginx/my-person-site.conf.example`

## 3. 当前项目结构

```text
my-person-site/
├── frontend/                 # Next.js 前端
│   ├── app/                  # App Router 路由
│   │   ├── (site)/[lang]/    # 对外页面，按语言分流
│   │   └── (legacy)/         # 旧调试/演示页
│   ├── components/           # 页面组件与共享 UI
│   ├── lib/                  # API、国际化、站点内容
│   └── public/               # 静态资源
├── backend/                  # NestJS 后端
│   ├── src/                  # 业务源码
│   └── dist/                 # 构建产物（当前已存在）
├── DocPlan/                  # 产品/前后端/AI/数据规划文档
├── deploy/                   # 部署相关配置
├── .github/workflows/        # GitHub Actions
├── package.json              # workspace 根命令
└── CLAUDE.md                 # 当前这份项目总览
```

## 4. 前端现状

### 4.1 路由结构

当前主要页面都在 `frontend/app/(site)/[lang]/` 下：

- `/[lang]`：首页
- `/[lang]/projects`：项目列表
- `/[lang]/projects/[slug]`：项目详情
- `/[lang]/media`：媒体展示
- `/[lang]/chat`：AI 对话
- `/[lang]/contact`：联系页
- `/[lang]/admin`：后台首页
- `/[lang]/admin/login`：后台登录页

补充调试页：

- `/demo`
- `/debug/mysql-connection`

### 4.2 国际化方案

- 当前只支持 `zh` / `en`
- 入口通过 `frontend/proxy.ts` 自动判断 `Accept-Language`
- 非语言前缀请求会重定向到 `/zh/...` 或 `/en/...`
- `frontend/lib/i18n.ts` 负责语言枚举、语言判断、带语言前缀链接生成

### 4.3 内容来源

前端当前主要使用 `frontend/lib/site-content.ts` 中的本地数据驱动页面，包括：

- 导航
- 首页 hero
- 项目数据
- 经历数据
- AI 推荐问题
- 后台模块说明

也就是说，前端 UI 已经基本成型，但“真实内容”暂时还没有完全切到后端。

### 4.4 API 接入状态

- `frontend/lib/api.ts` 负责拼接 API 地址
- 开发环境默认把前端视为 `http://localhost:3001`
- 开发环境下 API 基础路径通过 `/` 直接拼接到 `http://localhost:3002`
- 生产环境预留 `/server` 作为 API 前缀

当前最明显已经准备好接后端的页面是：

- `chat` 页面：会实际请求 `POST /public/chat`
- 如果后端不可用，前端会展示兜底占位回复

### 4.5 UI 风格

整体视觉已经有明确方向，不是默认模板风：

- 暖色纸感背景
- serif + sans 混合排版
- 柔和卡片式布局
- 动效较轻，兼顾移动端
- 主要色为绿色与陶土色系

## 5. 后端现状

### 5.1 模块结构

`backend/src/` 当前模块包括：

- `auth`
- `chat`
- `database`
- `debug`
- `knowledge-base`
- `media`
- `profile`
- `projects`
- `upload`
- `shared`

### 5.2 当前接口能力

已存在或已定义的接口方向：

- `POST /auth/login`
- `POST /public/chat`
- `GET /public/profile`
- `GET /public/projects`
- `GET /public/projects/:slug`
- `GET /public/media`
- `PATCH /admin/profile`
- `POST /admin/projects`
- `POST /admin/media`
- `GET /admin/knowledge-documents`
- `POST /admin/knowledge-documents`
- `POST /admin/knowledge-documents/:id/reindex`
- `POST /admin/uploads/sign`

调试接口：

- `GET /debug/mysql-connection`
- `GET /debug/users`
- `POST /debug/users`

### 5.3 当前数据状态

后端目前并不是完整 CMS，而是“接口骨架 + 占位仓储”阶段：

- `shared/content.repository.ts` 提供占位 profile / projects / media / knowledge 文档数据
- `chat.service.ts` 也是基于占位内容生成回答
- `auth`、`upload`、`profile update`、`project create`、`media create` 等仍是 placeholder

### 5.4 数据库接入状态

数据库模块已接入 TypeORM，并依赖环境变量读取 MySQL 配置。

注意：

- 文档里只记录变量名，不记录具体密钥或账号值
- 当前 `.env` 中已经有本地开发配置
- 后续如果仓库对外公开，需要考虑清理或移出敏感配置

当前关键环境变量包括：

- `PORT`
- `FRONTEND_ORIGIN`
- `PERSON_SITE_DB_HOST`
- `PERSON_SITE_DB_PORT`
- `PERSON_SITE_DB_USER`
- `PERSON_SITE_DB_PASSWORD`
- `PERSON_SITE_DB_NAME`
- 对象存储相关变量

## 6. 关键目录说明

### 6.1 `frontend/app`

负责路由入口、页面元信息与布局。

重点：

- `(site)`：正式站点页面
- `(legacy)`：历史/联调用页面
- `[lang]/layout.tsx`：按语言生成 metadata 与 html lang

### 6.2 `frontend/components`

按页面拆分，当前目录清晰：

- `page/home`
- `page/projects`
- `page/project-detail`
- `page/media`
- `page/chat`
- `page/contact`
- `page/admin-dashboard`
- `page/admin-login`
- `page/demo`
- `shared/site-shell`
- `shared/build-time-script`

### 6.3 `frontend/lib`

这里是前端真正的基础层：

- `api.ts`：统一 API URL 拼接
- `i18n.ts`：语言逻辑
- `site-content.ts`：当前静态内容源

### 6.4 `backend/src`

按 Nest 模块划分，适合后续继续演进成真正的业务服务层。

### 6.5 `DocPlan`

这是后续继续开发时非常重要的规划资料，目前包含：

- 总体目标
- 前台站点规划
- 后台规划
- AI Chat 规划
- 后端 API 规划
- 数据模型与基础设施规划

如果后面继续推进功能，建议优先同步更新这里和本文件。

## 7. 当前开发命令

在项目根目录运行：

```bash
pnpm dev:web
pnpm dev:api
pnpm build:web
pnpm build:api
pnpm lint:web
pnpm lint:api
```

默认本地端口：

- 前端：`3001`
- 后端：`3002`

## 8. 当前阶段判断

这个项目目前最准确的判断不是“已完成站点”，而是：

“已经完成方向明确的第一版前后端骨架，并且已经把品牌表达、AI 对话、后台管理、媒体展示这几条线串起来了，但真实数据链路和生产级能力还没有闭环。”

简单说：

- UI 框架已经成型
- 内容结构已经成型
- API 边界已经成型
- 数据持久化与真实业务流程还在建设中

## 9. 后续建议方向

### 第一优先级：打通真实数据链路

- 把前端从 `site-content.ts` 逐步切到真实后端接口
- 完成 profile / projects / media 的真正 CRUD
- 明确发布态与草稿态

### 第二优先级：完成后台闭环

- 接入真正的管理员登录
- 使用 HttpOnly Cookie / session 或 JWT 方案
- 后台页面接真实写接口，而不是只做说明页

### 第三优先级：落地知识库与 AI 能力

- 知识文档上传
- 文档切片
- Embedding 生成
- 向量检索
- 基于资料的问答
- 保留调试信息，便于验证 AI 回答是否可信

### 第四优先级：媒体能力完善

- 接对象存储上传签名
- 图片 / 视频真实资源接入
- 媒体内容后台发布与排序
- 更适合摄影作品展示的页面体验

### 第五优先级：生产化与工程治理

- 补齐环境变量文档
- 增加测试
- 明确数据库迁移策略
- 补全错误处理、日志与监控
- 清理不应进入仓库的敏感信息或构建产物

## 10. 推荐维护方式

后续每次迭代建议同步更新这份文档，至少维护以下几项：

- 当前技术选型是否有变化
- 新增了哪些页面 / 接口 / 模块
- 哪些地方已经从 mock 切到 real
- 后续优先级是否调整

如果希望把这份文档继续升级，可以再补充两个部分：

- “已完成 / 进行中 / 待开发” 看板
- “环境变量说明表”

## 11. 一句话总结

这是一个以“个人品牌 + 项目展示 + AI 分身 + 后台管理”为核心目标的双语全栈站点仓库；当前已完成前后端主结构和产品方向验证，下一阶段重点是把内容、鉴权、知识库、上传与生产部署真正打通。
