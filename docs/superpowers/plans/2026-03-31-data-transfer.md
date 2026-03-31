# 数据备份与还原（引继码） 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在四个主菜单右侧追加一个“📦数据备份”功能入口，点击打开支持生成和查询引继码的 Cy 系风格弹窗。

**架构：** 新增 `TransferService` 处理 payload 组装及模拟 API，新增 `<DataTransfer>` 和 `<DataTransferModal>` UI 组件库，挂载至 `src/component/Game.tsx`。

**技术栈：** React(Hooks), Less, window.mdui (弹窗底层或自己实现)。

---

## User Review Required

> [!IMPORTANT]
> 此计划包含引继码的具体实现方案和对现有 UI 菜单的追加。我需要在你查看完任务分配后，获得你的**执行许可**。

## Proposed Changes

### Locales

#### [MODIFY] [zh_CN.ts](file:///Users/lie/Documents/code/ak-guess/src/locales/resource/zh_CN.ts)
新增引继码相关的 i18n 文本（如“数据备份”、“生成引继码”、“输入引继码查询”、“确认覆盖”等）。

---

### Service Layer

#### [NEW] [TransferService.ts](file:///Users/lie/Documents/code/ak-guess/src/utils/TransferService.ts)
包含将 `loadRecordData(lang)` 以及其他必要字段组装成 Payload 的逻辑，以及模拟的 `generateTransferCode` 和 `queryTransferCode` 请求。

---

### UI Components

#### [MODIFY] [Game.tsx](file:///Users/lie/Documents/code/ak-guess/src/component/Game.tsx)
在渲染 🍪小刻学堂、🔎测试报告、💬反馈、📔干员 等 tooltip 的 `.titlePanel` div 尾部，引录并挂载新建的 `<DataTransfer />`。

#### [NEW] [DataTransfer.tsx](file:///Users/lie/Documents/code/ak-guess/src/component/DataTransfer.tsx)
入口按钮组件，负责渲染并控制弹窗是否展示的 state。

#### [NEW] [DataTransferModal.tsx](file:///Users/lie/Documents/code/ak-guess/src/component/DataTransferModal.tsx)
实现 Cy 系暗黑半透明质感，双 Tab （生成 vs 导入）页面结构，以及二次确认时的左右数据对比面板。

#### [NEW] [DataTransfer.less](file:///Users/lie/Documents/code/ak-guess/src/component/DataTransfer.less)
定制化化样式。

---

## 任务执行清单

### 任务 1：定义本地化文案和基础样式
- 修改：`src/locales/resource/zh_CN.ts`
- 创建：`src/component/DataTransfer.less`

- [ ] **步骤 1：添加 zh_CN 缺少的文案。**

```typescript
// 添加在 dict 中
dataTransfer: '📦数据备份',
generateCode: '生成引继码',
importCode: '使用引继码导入',
// ...
```

- [ ] **步骤 2：在 Less 中声明 `.cy-modal` 等样式框架。**

```less
.cy-modal {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(80, 150, 255, 0.4);
  /* ... */
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/locales/resource/zh_CN.ts src/component/DataTransfer.less
git commit -m "feat: setup i18n and styling for data transfer"
```

### 任务 2：实现 TransferService 服务
- 创建：`src/utils/TransferService.ts`

- [ ] **步骤 1：编写打包解包和 Mock 请求代码。**

```typescript
export const generateTransferCode = async (lang: string) => {
  // Mock logic
}
```

- [ ] **步骤 2：Commit**

```bash
git add src/utils/TransferService.ts
git commit -m "feat: implement mock transfer service"
```

### 任务 3：构建并挂载组件
- 创建：`src/component/DataTransferModal.tsx`
- 创建：`src/component/DataTransfer.tsx`
- 修改：`src/component/Game.tsx`

- [ ] **步骤 1：编写纯 UI 的 Modal 组件（支持 Tab 切换）。**
- [ ] **步骤 2：编写 DataTransfer 入口。**
- [ ] **步骤 3：将其加入至 Game.tsx 的 `.titlePanel` 内。**
- [ ] **步骤 4：Commit**

### 任务 4：联调完整交互逻辑
- 修改：`src/component/DataTransferModal.tsx`

- [ ] **步骤 1：给 Generate 页面增加 service 调用并展示随机码。**
- [ ] **步骤 2：给 Import 页面增加查询及左右两侧【当前数据】 vs 【云端数据】展示，加覆盖逻辑。**
- [ ] **步骤 3：验证功能是否符合预期并 Commit**


## Verification Plan
1. **Automated Tests**: 无相关修改，依赖手动测试。
2. **Manual Verification**: 预期你可以点击 📦数据备份 按钮，顺利生成引继码，然后输入这个引继码，通过对比确认后成功导入测试。
