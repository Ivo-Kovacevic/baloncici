import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dekoracije")({
  component: () => <div>Hello /dekoracije!</div>,
});
