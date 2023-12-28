"use client";
import Image from "next/image";

import cn from "clsx";
import { ComponentProps, useState } from "react";

const NextImage = (props: ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      quality={95}
      src={props.src}
      priority={props.priority || false}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "blur-sm scale-75" : "scale-100 blur-0"
      )}
      blurDataURL={props.blurDataURL}
      onLoad={() => setLoading(false)}
    />
  );
};

export default NextImage;
