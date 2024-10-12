import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  component: Kontakt,
});

function Kontakt() {
  return <div>Hello /kontakt!</div>;
}
