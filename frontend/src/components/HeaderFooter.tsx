import { Link } from "@tanstack/react-router";
import { ReactNode, useEffect, useState } from "react";
import CloseIcon from "../assets/svg/close.svg";
import MenuIcon from "../assets/svg/menu.svg";

interface Main {
  children: ReactNode;
}

export default function HeaderFooter({ children }: Main) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { to: "/", label: "POČETNA" },
    { to: "/dekoracije", label: "DEKORACIJE" },
    { to: "/kontakt", label: "KONTAKT" },
  ];

  // Hide scrollbar when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className="bg-bgImage">
        <header
          className={`z-30 fixed left-0 top-0 right-0 bg-bgImage shadow-md shadow-gray-400 font-bold transition-all ${!isVisible && "-translate-y-full shadow-none"}`}
        >
          {/* Desktop navigation */}
          <nav className="flex items-center container mx-auto">
            <Link to="/" className="mr-auto text-4xl m-4">
              Balončići
            </Link>
            <div className="group hidden sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="m-4 p-1 group-hover:opacity-75 hover:!opacity-100 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Hamburger menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 m-4 sm:hidden focus:outline-none z-50"
            >
              {isOpen ? (
                <img src={CloseIcon} alt="Close Menu" />
              ) : (
                <img src={MenuIcon} alt="Open Menu" />
              )}
            </button>
          </nav>

          {/* Mobile navigation */}
          <nav
            className={`sm:hidden fixed inset-0 flex flex-col gap-4 items-center justify-center bg-bgImage transition-opacity duration-300 ${
              !isOpen && "pointer-events-none opacity-0"
            }`}
          >
            <div className="group text-center">
              {navItems.map((item, index) => (
                <div
                  key={item.to}
                  className={`my-8 transform transition-all duration-300 ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    to={item.to}
                    className="text-3xl group-hover:opacity-75 hover:!opacity-100 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </header>

        {children}

        <footer className="py-16">
          <div className="flex items-center container mx-auto">
            <div className="mr-auto p-4">Balončići © {new Date().getFullYear()}</div>
            <div className="flex flex-col px-8 gap-2 sm:gap-10 sm:p-0 sm:flex-row">
              <a
                className="p-1 hover:underline"
                href="https://www.facebook.com/profile.php?id=61561337233731"
                target="_blank"
                rel="noopener"
              >
                Facebook
              </a>
              <a
                className="p-1 hover:underline"
                href="https://www.instagram.com/baloncici_nikolina?ihsg=MXJjZTQ5cGU3ZzBxdQ=="
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>
              <Link to="/kontakt" className="p-1 hover:underline">
                Kontakt
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
