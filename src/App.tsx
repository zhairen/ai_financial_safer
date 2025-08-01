import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

// 新增导入
import { DashboardPage } from "./pages/home/Dashboard";
import { MarketQuotesPage } from "./pages/market/MarketQuotes"; // 新增市场行情页面导入
import {
  Dashboard,
  TrendingUp,
  CurrencyYen,
  CurrencyExchange,
  AttachMoney,
} from "@mui/icons-material"; // 新增趋势图标导入
import {
  ParaPortList,
  ParaPortCreate,
  ParaPortEdit,
  ParaPortShow,
} from "./pages/para-port";

import { PortfolioList } from "./pages/portfolio/PortfolioList";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet"; // 持仓相关图标
import { ChatBubble } from "@mui/icons-material"; // 新增聊天图标导入
import ChatWindow from "./components/ChatWindow"; // 新增聊天组件导入

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                // 关键修改：将示例 API 地址替换为你的 FastAPI 后端地址
                dataProvider={dataProvider("http://94.72.124.184:8001")}  // 指向本地 8000 端口的 FastAPI
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "dashboard",
                    list: DashboardPage,
                    meta: {
                      label: "仪表盘",
                      icon: <Dashboard />,
                      order: 1,
                    },
                  },
                  {
                    name: "market",
                    list: MarketQuotesPage,
                    meta: {
                      label: "市场行情",
                      icon: <TrendingUp />,
                      order: 2,
                    },
                  }, // 新增组合持仓资源配置
                  {
                    name: "portfolios", // 对应后端API路径（需与实际接口匹配）
                    list: PortfolioList, // 绑定列表页面
                    meta: {
                      label: "组合持仓", // 菜单显示名称
                      icon: <AttachMoney />, // 持仓相关图标 />,  // 持仓相关图标
                      order: 3, // 排在市场行情之后
                    },
                  },
                  {
                    name: "posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  }, // 新增聊天窗口资源
                  {
                    name: "chat",
                    list: ChatWindow, // 绑定聊天组件
                    meta: {
                      label: "智能问答", // 菜单显示名称
                      icon: <ChatBubble />, // 聊天图标
                      order: 4, // 排在组合持仓之后
                    },
                  },
                  {
                    name: "para-ports",
                    list: ParaPortList,
                    create: ParaPortCreate,
                    edit: ParaPortEdit,
                    show: ParaPortShow,
                    meta: {
                      label: "参数组合",
                      icon: <Settings />, // 可选：添加图标
                      order: 5, // 可选：设置菜单顺序
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "CEZHDy-27gV0I-Zx9n6e",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                        Title={() => (
                          <span>
                            <CurrencyYen /> 中史外汇投资中心
                            <CurrencyExchange />
                          </span>
                        )}
                        Header={() => <Header sticky />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    {/* 修正：将 resource 改为已注册的 "posts"（与 resources 中的 name 一致） */}
                    <Route
                      index
                      element={<NavigateToResource resource="posts" />}
                    />
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/market" element={<MarketQuotesPage />} />
                    {/* 新增组合持仓路由 */}
                    <Route path="/portfolios" element={<PortfolioList />} />
                    <Route path="/chat" element={<ChatWindow />} />
                    {/* 新增 para-ports 路由（关键修改） */}
                    <Route path="/para-ports">
                      {/* 假设通过 refine add resource 生成了以下组件 */}
                      <Route index element={<ParaPortList />} /> {/* 列表页 */}
                      <Route path="create" element={<ParaPortCreate />} /> {/* 新建页 */}
                      <Route path="edit/:id" element={<ParaPortEdit />} /> {/* 编辑页 */}
                      <Route path="show/:id" element={<ParaPortShow />} /> {/* 详情页 */}
                    </Route>

                    {/* 原有其他路由保持不变 ... */}
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
