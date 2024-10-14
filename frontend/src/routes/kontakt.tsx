import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import LocationIcon from "../assets/svg/location.svg";
import PhoneIcon from "../assets/svg/phone.svg";
import EmailIcon from "../assets/svg/email.svg";

export const Route = createFileRoute("/kontakt")({
  component: Kontakt,
});

function Kontakt() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [messageStatus, setMessageStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageStatus("sending");
    try {
      const response = await fetch("http://localhost:3000/", {
        mode: "cors",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ message, email, name }),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      setMessageStatus("sent");
      setMessage("");
      setEmail("");
      setName("");
    } catch (error: any) {
      setTimeout(() => {
        setMessageStatus("failed");
      }, 1000);
      setError(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (messageStatus === "sent" || messageStatus === "failed") {
      setTimeout(() => {
        setMessageStatus("");
      }, 3000);
    }
  }, [messageStatus]);

  const sendingMessage = (
    <>
      {messageStatus === "sent" ? (
        <>
          <svg
            className="m-2 h-5 w-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span>Poruka poslana</span>
        </>
      ) : messageStatus === "failed" || error ? (
        <>
          <svg
            className="m-2 h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span>Slanje neuspješno</span>
        </>
      ) : (
        <>
          <svg
            className="animate-spin m-2 h-5 w-5 text-dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Poruka se šalje</span>
        </>
      )}
    </>
  );

  return (
    <>
      <main className="container mx-auto flex flex-col md:flex-row justify-around py-16">
        <section className="flex-1 p-4">
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            <h1 className="text-2xl">Kontaktirajte nas</h1>

            <label htmlFor="message">Upit</label>
            <textarea
              rows={10}
              name="message"
              id="message"
              placeholder="Poruka"
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4 focus:outline-dark"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              spellCheck="false"
            />

            <label htmlFor="email">Vaš email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4 focus:outline-dark"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
            />

            <label htmlFor="name">Vaše ime</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ime"
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4 focus:outline-dark"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
            />
            <div className="relative flex justify-center">
              <div
                className={`absolute flex items-center transition-all ${messageStatus === "sending" || messageStatus === "sent" || messageStatus === "failed" ? "translate-y-12" : "translate-y-0"}`}
              >
                {sendingMessage}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-dark rounded transition hover:bg-darker p-2 shadow-md shadow-gray-500 z-10"
            >
              Pošaljite upit
            </button>
          </form>
        </section>
        <div className="mx-2 sm:mx-8 my-14 border-b-2 md:border-l-2 border-dark"></div>
        <section className="flex-1 p-4 text-center">
          <h1 className="text-2xl">Kontakt info</h1>
          <div className="flex flex-col justify-evenly gap-16 py-16 md:gap-0 h-full">
            <div className="flex justify-center items-center gap-2">
              <img src={LocationIcon} alt="location-icon" className="h-6 w-6" />
              <a href="https://maps.app.goo.gl/EWS8nMcZWyreRait9" className="hover:underline">
                Ilica 127, Zagreb, Hrvatska
              </a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={PhoneIcon} alt="phone-icon" className="h-6 w-6" />
              <a href="tel:+385911234567" className="hover:underline">
                +385 91 123 4567
              </a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={EmailIcon} alt="email-icon" className="h-6 w-6" />
              <a href="mailto:baloncici@gmail.com" className="hover:underline">
                baloncici@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
