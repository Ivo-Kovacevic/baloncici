import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dekoracije")({
  component: Dekoracije,
});

function Dekoracije() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const files = import.meta.glob("../assets/images/decorations/*");
    const loadImages = async () => {
      setLoading(true);
      // Get functions that load images
      const imagePromises = Object.values(files).map((importFunction) => importFunction());

      // Wait for all image imports to resolve
      const resolvedImages = await Promise.all(imagePromises);

      // Extract image paths
      const imagesPaths = resolvedImages.map((module: any) => module.default);

      setImages(imagesPaths);
      setLoading(false);
    };
    loadImages();
  }, []);

  return (
    <>
      <main className="container mx-auto">
        <h1 className="pt-48 pb-32 text-center text-4xl">Dekoracije</h1>
        <section className="px-2 md:px-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full aspect-square bg-gray-200 animate-pulse rounded"
                ></div>
              ))
            : images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <div className="w-full aspect-square bg-gray-200 animate-pulse rounded"></div>
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 opacity-0 w-full h-full rounded transition hover:brightness-50 hover:cursor-pointer object-cover"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = "1";
                    }}
                  />
                </div>
              ))}
        </section>
      </main>
    </>
  );
}
