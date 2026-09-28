import { useEffect, useRef, useState } from "react";
import PlaceholderGrayBox from "@/src/components/placeholders/PlaceholderGrayBox";
import PlaceholderLoading from "@/src/components/placeholders/PlaceholderLoading";

interface ImageProps {
  src: string;
}

export function ImageLoading({
  imageAttrs,
  placeholderStatic = <PlaceholderGrayBox></PlaceholderGrayBox>,
  placeholderLoading = <PlaceholderLoading></PlaceholderLoading>,
}: {
  imageAttrs: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>;
  placeholderStatic?: React.ReactNode;
  placeholderLoading?: React.ReactNode;
}) {
  const { className, src, ...rest } = imageAttrs;
  const imgRef = useRef<null | HTMLImageElement>(null);
  const [loadedError, setLoadedError] = useState(false);
  const [loaded, setLoaded] = useState(imgRef.current?.complete);
  const complete = imgRef.current?.complete;
  const completeOrLoaded = imgRef.current?.complete || loaded;
  const completeAndLoaded = imgRef.current?.complete && loaded;
  useEffect(() => {
    if (!imgRef.current) return;
    setLoaded(imgRef.current.complete);
  }, [imgRef.current]);
  return (
    <div className={`size-full block`}>
      {src && !loadedError ? (
        <img
          {...rest}
          src={src}
          className={`${className ? className : ""} ${completeOrLoaded ? "block" : "hidden"}`}
          onError={() => setLoadedError(true)}
          onLoad={() => setLoaded(true)}
          ref={imgRef}
        ></img>
      ) : (
        placeholderStatic
      )}
      <div
        className={`${!loaded && !loadedError ? "block" : "hidden"} size-full flex items-center justify-center`}
      >
        {placeholderLoading}
      </div>
    </div>
  );
}
