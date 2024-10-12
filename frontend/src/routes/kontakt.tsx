import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/kontakt")({
  component: Kontakt,
});

function Kontakt() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/", {
        mode: "cors",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ message, email, name }),
      });
      if (!response.ok) {
        setError("Something went wrong");
        throw new Error("Error");
      }
      const status = await response.json();
      setMailSent(true);
      setMessage("");
      setEmail("");
      setName("");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    console.log(mailSent);
  }, [mailSent]);

  return (
    <>
      <main className="container mx-auto flex flex-col md:flex-row justify-around py-16">
        <section className="flex-1 p-4">
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            <h1 className="text-2xl">Kontakt</h1>

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
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4"
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
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
            />
            <button
              type="submit"
              className="text-white bg-dark rounded transition hover:bg-[#171b16] p-2 shadow-md shadow-gray-500"
            >
              Pošaljite upit
            </button>
          </form>
        </section>
        <div className="mx-2 sm:mx-8 my-10 border-b-2 md:border-l-2 border-dark"></div>
        <section className="flex-1 p-4 text-center">
          <h1 className="text-2xl">Kontakt info</h1>
          <div className="flex flex-col justify-evenly gap-16 py-16 md:gap-0 h-full">
            <div>Ilica 127, Zagreb, Hrvatska</div>
            <div>+385 91 123 4567</div>
            <div>baloncici@gmail.com</div>
          </div>
        </section>
      </main>
    </>
  );
}
