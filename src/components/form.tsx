"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "@/lib/utils/FirebaseConfig";
import Image from "next/image";

export const FromPage = () => {
  const [previewImage, setPreviewImage] = useState();
  const [name, setName] = useState();
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [s, setF] = useState();
  const [object, setObjets] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/skills");
        const { data } = await response.json();
        setObjets(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {object?.map((item: any, i: number) => (
        <div key={i}>
          <Image src={item.image} alt="" width={50} height={50}></Image>
        </div>
      ))}
    </div>
  );
};
