import { createRouter, redirect, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import Redirect from "./components/Redirect";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => <Redirect />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
