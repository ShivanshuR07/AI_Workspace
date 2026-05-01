import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Documents } from "./pages/Documents";
import { Meetings } from "./pages/Meetings";
import { EmailAssistant } from "./pages/EmailAssistant";
import { Tasks } from "./pages/Tasks";
import { History } from "./pages/History";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "documents", Component: Documents },
      { path: "meetings", Component: Meetings },
      { path: "email", Component: EmailAssistant },
      { path: "tasks", Component: Tasks },
      { path: "history", Component: History },
      { path: "settings", Component: Settings },
    ],
  },
]);
