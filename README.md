# AK-Guess

> 一个基于明日方舟的角色猜谜小游戏

## 🎮 在线体验

访问地址：[akg.saki.cc](http://akg.saki.cc)

## ✨ 功能特性

- 📱 支持移动端和桌面端
- 🔍 支持别名搜索
- 🎨 画师维度猜谜
- 📅 每日挑战模式
- 📊 个人战绩统计
- 🌍 多语言支持
- 📤 支持emoji分享到社群

## 🖼️ 预览

![概览图](https://github.com/lie5860/ak-guess/blob/main/image/overview.png?raw=true)

![分享消息图](https://github.com/lie5860/ak-guess/blob/main/image/message.png?raw=true)

## 🛠️ 技术栈

- **前端框架**: React
- **构建工具**: Vite
- **UI库**: MDUI
- **部署**: 阿里云FC (Function Compute)
- **Web Components**: Magic转换

## 🧩 状态机（XState）

- 本项目使用 XState 管理游戏状态，核心定义位于 `src/machines/`：
  - `gameMachine.ts`：当前运行中的主状态机
  - `gameMachineConfig.ts`：动作与配置
  - `gameServices.ts`：异步服务
  - `useGameMachine.tsx`：React 集成
- 内置的自制可视化入口已移除。如需可视化/调试，推荐将状态机代码复制到 Stately Studio。

### 在 Stately Studio 可视化

1. 打开 Stately Studio，新建 Machine。
2. 复制 `src/machines/gameMachine.ts` 的 `createMachine(...)` 定义到编辑器。
3. 如需并行/历史状态示例，可参考官方文档的 History States 用法：[GitHub - xstate README（History states）](https://github.com/statelyai/xstate?tab=readme-ov-file#history-states)。
4. 若依赖 `assign`/动作，请同时复制 `gameMachineConfig.ts` 中的相关 `actions` 定义，并在 Studio 里补上 `context` 初始值以便运行预览。

## 🚀 本地开发

### 环境要求
- Node.js 16+
- npm 或 yarn

### 开发步骤

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build
```

项目使用 CI/CD 自动化部署，构建后的文件可上传至服务器或文件服务。

## 📋 版本历史

### v0.2
- 引入 MDUI 作为 UI 库
- 实现多语言支持
- 多服务器数据脚本自动同步

### v0.1
- 支持移动端适配
- 支持别名搜索
- 增加画师维度猜谜
- 支持每日挑战模式
- 支持个人战绩统计

## 👥 贡献者

![贡献者](https://github.com/lie5860/ak-guess/blob/main/image/contributors.png?raw=true)

## 🙏 致谢

- [PRTS Wiki](http://prts.wiki/) - 游戏数据来源
- [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData) - 游戏数据来源
- [Fireblend/squirdle](https://github.com/Fireblend/squirdle) - 项目灵感来源

## 📝 开发指南

如需二次开发，请参考：[开发攻略](https://www.bilibili.com/read/cv15611509)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

本项目仅供学习和交流使用。
