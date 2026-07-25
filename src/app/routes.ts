import { createBrowserRouter } from "react-router";
import PublicSite from "./pages/PublicSite";
import BlogPage from "./pages/BlogPage";

// Admin functionality (applications, blog, gallery management) now lives in
// the Edumax dashboard (edumax-app) — one integrated system, one login, one
// place to manage everything, instead of two separate admin panels.
export const router = createBrowserRouter([
  { path: "/", Component: PublicSite },
  { path: "/blog", Component: BlogPage },
]);
