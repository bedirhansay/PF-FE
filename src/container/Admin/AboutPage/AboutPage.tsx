"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AboutDTO } from "../../../lib/types/types";
import { Button } from "@components/ui";
import { updateAbout } from "@actions";
import toast, { LoaderIcon } from "react-hot-toast";

const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

export const AboutPage = ({ about }: { about: AboutDTO[] }) => {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(about[0].content);

  const SubmitHandler = async () => {
    const payload = {
      _id: about[0]._id,
      content: model,
    };
    try {
      setLoading(true);
      const res = await updateAbout({ payload });
      if (res.kind === "ok") {
        toast.success("Yazı Başarıyla güncellendi");
      } else {
        toast.error("Yazı Güncellenemedi");
      }
    } catch (error: any) {
      toast.error("Hata:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <Editor model={model} setModel={setModel} />
      <Button
        onClick={() => SubmitHandler()}
        className="mt-4 w-24 self-end"
        size="lg"
        variant="save"
      >
        {loading ? <LoaderIcon /> : "Güncelle"}
      </Button>

      <strong className="text-right self-center mt-10">Ön izleme</strong>
      <Editor model={model} setModel={setModel} />
      <div
        className="bg-white rounded py-4 px-4 mt-4 mb-20"
        //@ts-ignore
        dangerouslySetInnerHTML={{ __html: model }}
      ></div>
    </div>
  );
};
