import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dekoracije")({
  component: Dekoracije,
});

function Dekoracije() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const files = import.meta.glob("../assets/images/decorations/*");
    const loadImages = async () => {
      // Get functions that load images
      const imagePromises = Object.values(files).map((importFunction) => importFunction());

      // Wait for all image imports to resolve
      const resolvedImages = await Promise.all(imagePromises);

      // Extract image paths
      const imagesPaths = resolvedImages.map((module: any) => module.default);

      setImages(imagesPaths);
    };
    loadImages();
  }, []);

  return (
    <>
      <main className="container mx-auto">
        <h1 className="my-32 text-center text-4xl">Dekoracije</h1>
        <section className="px-8 md:px-16 grid grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                loading="lazy"
                className="rounded transition hover:brightness-50 hover:cursor-pointer"
              />
          ))}
        </section>
      </main>
    </>
  );
}
