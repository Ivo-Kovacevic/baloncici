import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
      console.error(error);
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
      ) : messageStatus === "failed" ? (
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
              <svg
                fill="#222720"
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 395.71 395.71"
              >
                <path
                  d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
                    c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
                    C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
                    c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                />
              </svg>
              <a href="https://maps.app.goo.gl/EWS8nMcZWyreRait9" className="hover:underline">
                Ilica 127, Zagreb, Hrvatska
              </a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <svg
                fill="#222720"
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z" />
              </svg>
              <a href="tel:+385911234567" className="hover:underline">
                +385 91 123 4567
              </a>
            </div>
            <div className="flex justify-center items-center gap-2">
              <svg
                fill="#222720"
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  className="st0"
                  d="M440.917,67.925H71.083C31.827,67.925,0,99.752,0,139.008v233.984c0,39.256,31.827,71.083,71.083,71.083
                    h369.834c39.255,0,71.083-31.827,71.083-71.083V139.008C512,99.752,480.172,67.925,440.917,67.925z M178.166,321.72l-99.54,84.92
                    c-7.021,5.992-17.576,5.159-23.567-1.869c-5.992-7.021-5.159-17.576,1.87-23.567l99.54-84.92c7.02-5.992,17.574-5.159,23.566,1.87
                    C186.027,305.174,185.194,315.729,178.166,321.72z M256,289.436c-13.314-0.033-26.22-4.457-36.31-13.183l0.008,0.008l-0.032-0.024
                    c0.008,0.008,0.017,0.008,0.024,0.016L66.962,143.694c-6.98-6.058-7.723-16.612-1.674-23.583c6.057-6.98,16.612-7.723,23.582-1.674
                    l152.771,132.592c3.265,2.906,8.645,5.004,14.359,4.971c5.706,0.017,10.995-2.024,14.44-5.028l0.074-0.065l152.615-132.469
                    c6.971-6.049,17.526-5.306,23.583,1.674c6.048,6.97,5.306,17.525-1.674,23.583l-152.77,132.599
                    C282.211,284.929,269.322,289.419,256,289.436z M456.948,404.771c-5.992,7.028-16.547,7.861-23.566,1.869l-99.54-84.92
                    c-7.028-5.992-7.861-16.546-1.869-23.566c5.991-7.029,16.546-7.861,23.566-1.87l99.54,84.92
                    C462.107,387.195,462.94,397.75,456.948,404.771z"
                />
              </svg>
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
