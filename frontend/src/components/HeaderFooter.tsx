import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

interface Main {
  children: ReactNode;
}

export default function HeaderFooter({ children }: Main) {
  return (
    <>
      <div className="bg-bgImage">
        <header className="shadow-md shadow-gray-500">
          <nav className="flex items-center container mx-auto">
            <Link to="/" className="mr-auto text-4xl p-4">
              Balončići
            </Link>
            <Link to="/" className="m-4 p-1">
              POČETNA
            </Link>
            <Link to="/dekoracije" className="m-4 p-1">
              DEKORACIJE
            </Link>
            <Link to="/kontakt" className="m-4 p-1">
              KONTAKT
            </Link>
          </nav>
        </header>

        {children}

        <footer className="py-8">
          <div className="flex items-center container mx-auto">
            <div className="mr-auto p-4">Balončići © {new Date().getFullYear()}</div>
            <a
              className="m-4 p-1"
              href="https://www.facebook.com/profile.php?id=61561337233731"
              target="_blank"
              rel="noopener"
            >
              Facebook
            </a>
            <a
              className="m-4 p-1"
              href="https://www.instagram.com/baloncici_nikolina?ihsg=MXJjZTQ5cGU3ZzBxdQ=="
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <Link to="/kontakt" className="m-4 p-1">
              Kontakt
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
