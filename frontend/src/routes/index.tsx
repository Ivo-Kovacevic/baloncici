import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <main className="flex flex-col items-center container mx-auto text-center">
        <section>
          <h1 className="text-7xl my-72 font-allison">Uzleti s nama u svijet balonske mašte</h1>
        </section>
        <section className="max-w-container">
          <h2 className="text-3xl p-2">O nama</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </section>
        <section className="my-52 max-w-container">
          <h2 className="text-3xl p-2">Kontaktirajte nas</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link
            to="/kontakt"
            className="text-white bg-dark rounded transition hover:bg-darker px-4 py-2 shadow-md shadow-gray-500"
          >
            KONTAKT
          </Link>
        </section>
      </main>
    </>
  );
}
