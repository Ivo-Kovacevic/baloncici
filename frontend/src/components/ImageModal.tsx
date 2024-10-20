import CloseImage from "../assets/svg/close-image.svg";

type ImageModalProps = {
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  image: string;
  imagesLength: number;
  index: number;
};

export default function ImageModal({
  selectedId,
  setSelectedId,
  image,
  imagesLength,
  index,
}: ImageModalProps) {
  const closeImage = () => {
    if (selectedId !== null) setSelectedId(null);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 p-2 bg-dark bg-opacity-75 flex flex-col justify-center items-center z-40"
        onClick={closeImage}
      >
        {/* Close button */}
        <img
          src={CloseImage}
          alt="Close image"
          className="mb-auto w-10 h-10 hover:cursor-pointer"
        />
        {/* Image */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className="duration-300 rounded static max-w-min max-h-[80%] w-full h-min object-contain"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(index);
          }}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = "1";
          }}
        />
        {/* Buttons for navigation between images */}
        <div className="mt-auto gap-10">
          <div className="text-center text-light text-lg" onClick={(e) => e.stopPropagation()}>
            {index + 1}/{imagesLength}
          </div>
          {/* Go to previous image */}
          <div className="flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId((prevId) => {
                  if (prevId === null) {
                    return null;
                  } else {
                    return prevId - 1;
                  }
                });
              }}
              className="text-light text-6xl hover:cursor-pointer px-4"
            >
              &lt;
            </button>
            {/* Go to next image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId((prevId) => {
                  if (prevId === null) {
                    return null;
                  } else {
                    return prevId + 1;
                  }
                });
              }}
              className="text-light text-6xl hover:cursor-pointer px-4"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
