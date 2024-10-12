import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
      console.log(mailSent);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <main className="container mx-auto flex flex-col sm:flex-row justify-around py-16">
        <section className="flex-1 p-4">
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            <h1 className="text-2xl">Kontakt</h1>

            <label htmlFor="message">Upit</label>
            <textarea
              rows={10}
              name="message"
              id="message"
              placeholder="Poruka"
              className="p-1 bg-stone-100 border-2 border-gray-400 rounded mb-4"
              required
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
        <section className="flex-1 p-4">Kontakt info</section>
      </main>
    </>
  );
}
