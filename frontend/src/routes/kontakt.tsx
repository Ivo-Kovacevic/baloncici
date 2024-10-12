import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  component: Kontakt,
});

function Kontakt() {
  return (
    <>
      <main className="container mx-auto">Hello /kontakt!</main>;
    </>
  );
}
