"use client";

import { ExperienceDTO } from "@/lib/types";
import {
  Breadcrumb,
  Button,
  ErrorMessage,
  HeadingSection,
  Input,
} from "@/components/ui";
import React, { useEffect, useState } from "react";
import { callApi } from "@/lib/actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@/lib/helper";
import { StringToArray } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { ExperienceSchema } from "@/lib/validation";
import style from "../admin.module.scss";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../components/QuillEditor"), {
  ssr: false,
});

export const SingleExperiencePage = ({
  experience,
}: {
  experience: ExperienceDTO;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceDTO>({
    resolver: joiResolver(ExperienceSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(experience.description);

  const formFields = [
    { name: "_id", label: "Id", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "position", label: "Position", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "skills", label: "Skills", type: "textarea" },
  ];

  const onSubmit = async (data: ExperienceDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      description: model,
      skills: StringToArray(data.skills),
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "patch",
        path: `/experience/${experience._id}`,
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Deneyim Güncellendi");
        reset();
        setImageUrl("");
      } else {
        toast.error("Deneyim Güncellenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Deneyim  Güncellenemedi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setLoading(true);
    try {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) {
        throw new Error("Lütfen bir dosya seçin.");
      }
      const payload = {
        image: selectedFile,
        path: "experiences",
        name: selectedFile.name,
      };
      const img = await uploadImageToFirabase(payload);
      setSelectedImage(selectedFile);
      setImageUrl(() => img?.url || "");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Resim yüklenemedi. Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb page="experience" sub={experience.title} />
      <HeadingSection title="Deneyimler" />

      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["image-section"]}>
          <Image
            alt=""
            width={300}
            height={300}
            src={
              (selectedImage && URL.createObjectURL(selectedImage)) ||
              experience.image
            }
          ></Image>

          <Input
            className="hidden"
            id="pickFile"
            label="Fotoğraf Yükle"
            onChange={handleImageChange}
          />
        </div>
        <div className={style["main-area"]}>
          <h2 className="text-3xl text-center">{experience.title}</h2>
          <hr className={style["hr"]} />

          <div className={style["image-url"]}>
            <label htmlFor="itemColor">Image Url</label>
            <Input
              {...register("image")}
              value={(imageUrl as string) || experience.image}
              placeholder="Fotoğraf Yükleyin ya da Unsplash Link"
            />
            <ErrorMessage message={errors.image?.message} />
          </div>

          <div className={style["form-fields"]}>
            {formFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <Input
                  //@ts-ignore
                  defaultValue={experience[field.name]}
                  {...register(field.name as any)}
                  type={field.type}
                />
                <ErrorMessage
                  message={(errors as Record<string, any>)[field.name]?.message}
                />
              </div>
            ))}

            <div className={style["editor-section"]}>
              <span>Tasks</span>
              <Editor model={model} setModel={setModel} />
            </div>

            <Button isLoading={loading} type="submit" variant="outline">
              Kaydet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
