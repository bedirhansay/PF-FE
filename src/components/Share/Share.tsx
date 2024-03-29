"use client";

import React from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";

import style from "./Share.module.scss";

export const Share = ({ blog }: { blog: any }) => {
  const shareOnSocialMedia = (platform: string, url: string) => {
    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank");
        break;
      case "instagram":
        window.open(
          `https://www.instagram.com/sharing/share-offsite/?url=${url}`,
          "_blank"
        );
        break;

      default:
        console.error("Bilinmeyen platform:", platform);
    }
  };

  const handleLinkedInShare = () => {
    const url = window.location.href;

    const metaTags = [
      { property: "og:title", content: blog.title },
      { property: "og:image", content: blog.image },
      { property: "og:description", content: blog.description },
      { property: "og:url", content: url },
    ];

    metaTags.forEach((tag) => {
      const existingTag = document.querySelector(
        `meta[property="${tag.property}"]`
      );
      if (existingTag) {
        existingTag.setAttribute("content", tag.content);
      } else {
        const newTag = document.createElement("meta");
        newTag.setAttribute("property", tag.property);
        newTag.setAttribute("content", tag.content);
        document.head.appendChild(newTag);
      }
    });

    shareOnSocialMedia("linkedin", url);
  };

  return (
    <div className={style["share-wrapper"]}>
      <strong>
        Paylaş
        <CiShare2 />
      </strong>

      <div className={style["platforms"]}>
        <span onClick={handleLinkedInShare}>
          <BsLinkedin color="white" />
        </span>
        <span
          onClick={() =>
            shareOnSocialMedia(
              "twitter",
              `https://twitter.com/intent/tweet?url=${window.location.href}`
            )
          }
        >
          <BsTwitter color="white" />
        </span>
        <span
          onClick={() =>
            shareOnSocialMedia(
              "instagram",
              `https://www.instagram.com/sharing/share-offsite/?url=${window.location.href}`
            )
          }
        >
          <BsInstagram color="white" />
        </span>
      </div>
    </div>
  );
};
