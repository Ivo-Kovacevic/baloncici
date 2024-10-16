import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase.config";

export const Route = createFileRoute("/dekoracije")({
  component: Dekoracije,
});

function Dekoracije() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get all images from supabase
        const { data, error } = await supabase.storage.from("decorations").list();
        if (!data) {
          console.error("Error fetching images:", error);
          return;
        }
        const imageUrls = data.map((file) => {
          return `https://iwqkvjhfryekkidifyuh.supabase.co/storage/v1/object/public/decorations/${file.name}`;
        });
        setImages(imageUrls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
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
                  className="w-full aspect-square bg-light animate-pulse rounded"
                ></div>
              ))
            : images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <div className="w-full aspect-square bg-light animate-pulse rounded"></div>
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
