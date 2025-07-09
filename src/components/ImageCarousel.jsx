import { Carousel } from "@material-tailwind/react";

const ImageCarousel = ({ images = [], transitionDuration = 2 }) => {
  return (
    <Carousel transition={{ duration: transitionDuration }} className="rounded-xl">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt || `carousel image ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;