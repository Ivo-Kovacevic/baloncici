import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase.config";
import CloseImage from "../assets/svg/close-image.svg";

export const Route = createFileRoute("/dekoracije")({
  component: Dekoracije,
});

function Dekoracije() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElement = useCallback(
    (element: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 12);
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchImages = async (offset: number) => {
      try {
        setLoading(true);
        // Get all images from supabase
        const { data, error } = await supabase.storage.from("decorations").list("all-decorations", {
          limit: 12,
          offset: offset,
        });
        if (!data) {
          console.error("Error fetching images:", error);
          return;
        }
        const images = data.map((file) => {
          return `https://iwqkvjhfryekkidifyuh.supabase.co/storage/v1/object/public/decorations/all-decorations/${file.name}`;
        });
        if (!images || images.length < 12) {
          setHasMore(false);
        }
        setImages((prevImages) => {
          const existingImages = new Set(prevImages.map((image) => image));
          const uniqueImages = images.filter((image) => !existingImages.has(image));
          return [...prevImages, ...uniqueImages];
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages(offset);
  }, [offset]);

  const closeImage = () => {
    if (selectedId !== null) setSelectedId(null);
  };

  return (
    <>
      <main className="container mx-auto">
        <h1 className="pt-48 pb-32 text-center text-4xl">Dekoracije</h1>
        <section className="px-2 md:px-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              ref={images.length === index + 1 ? lastImageElement : null}
              className="relative aspect-square"
            >
              <div
                className={`${selectedId === index ? "" : "w-full aspect-square bg-light animate-pulse rounded"}`}
              ></div>
              <div
                className={
                  selectedId === index
                    ? "fixed inset-0 p-2 bg-dark bg-opacity-70 flex flex-col justify-center items-end z-50"
                    : ""
                }
                onClick={closeImage}
              >
                {selectedId === index && (
                  <img
                    src={CloseImage}
                    alt="Close image"
                    className="w-10 h-10 hover:cursor-pointer"
                  />
                )}
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className={`opacity-0 w-full h-full transition-opacity duration-300 rounded ${selectedId === index ? "static max-w-[1000px] max-h-[90%] h-min object-contain" : "absolute inset-0 object-cover hover:brightness-50 hover:cursor-pointer"}`}
                  onClick={() => setSelectedId(index)}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = "1";
                  }}
                />
              </div>
            </div>
          ))}
          {loading &&
            hasMore &&
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="aspect-square bg-light animate-pulse rounded"
              />
            ))}
        </section>
      </main>
    </>
  );
}
