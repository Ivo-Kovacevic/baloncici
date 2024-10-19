import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase.config";
import ImageModal from "../components/ImageModal";

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

  useEffect(() => {
    if (selectedId !== null && selectedId >= 0 && selectedId < images.length) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSelectedId(null);
    }
  }, [selectedId]);

  return (
    <>
      <main className="container mx-auto">
        <h1 className="pt-48 pb-32 text-center text-4xl">Dekoracije</h1>
        <section className="px-2 md:px-8 grid grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              ref={images.length === index + 1 ? lastImageElement : null}
              className="relative aspect-square"
            >
              {/* Show selected image modal and hide that image from grid */}
              {selectedId === index ? (
                <ImageModal
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  image={image}
                  imagesLength={images.length}
                  index={index}
                />
              ) : (
                <>
                  <div className="w-full aspect-square bg-light animate-pulse rounded"></div>

                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="opacity-0 w-full h-full transition-opacity duration-300 rounded absolute inset-0 object-cover hover:brightness-50 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(index);
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = "1";
                    }}
                  />
                </>
              )}
            </div>
          ))}
          {/* Loading skeleton */}
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
