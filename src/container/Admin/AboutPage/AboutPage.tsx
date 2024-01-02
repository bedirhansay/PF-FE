"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { callApi } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { AboutDTO } from "@/lib/types";

const Editor = dynamic(() => import("../../../components/QuillEditor"), {
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
      const res = await callApi({
        method: "patch",
        path: "about",
        payload: payload,
      });
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
        isLoading={loading}
        onClick={() => SubmitHandler()}
        className="mt-4 w-24 self-end"
        size="lg"
        variant="save"
      >
        Güncelle
      </Button>

      <strong className="text-right self-center mt-10">Ön izleme</strong>

      <div
        className="bg-white rounded py-4 px-4 mt-4 mb-20"
        dangerouslySetInnerHTML={{ __html: model }}
      ></div>
    </div>
  );
};
