import { Outlet, createRootRoute } from "@tanstack/react-router";
import HeaderFooter from "../components/HeaderFooter";

export const Route = createRootRoute({
  component: () => (
    <HeaderFooter>
      <Outlet />
    </HeaderFooter>
  ),
});
