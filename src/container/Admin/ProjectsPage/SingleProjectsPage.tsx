"use client";

import {
  Breadcrumb,
  Button,
  ErrorMessage,
  HeadingSection,
  Input,
} from "@/components/ui";
import React, { useState } from "react";
import { ProjectDTO } from "@/lib/types";
import { callApi } from "@/lib/actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@/lib/helper";
import { StringToArray } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { ProjectSchema } from "@/lib/validation";
import style from "../admin.module.scss";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../components/QuillEditor"), {
  ssr: false,
});

export const SingleProjectsPage = ({ project }: { project: ProjectDTO }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectDTO>({
    resolver: joiResolver(ProjectSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(project.tasks);

  const formFields = [
    { name: "company", label: "Company", type: "text" },
    { name: "projectName", label: "Project Name", type: "text" },
    { name: "time", label: "Time", type: "text" },
    { name: "area", label: "Area", type: "text" },
    { name: "tags", label: "Tags", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "goals", label: "Goals", type: "textarea" },
    { name: "scope", label: "Scope", type: "text" },
    { name: "requirements", label: "Requirements", type: "textarea" },
  ];

  const onSubmit = async (data: ProjectDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      tags: StringToArray(data.tags),
      goals: StringToArray(data.goals),
      requirements: StringToArray(data?.requirements),
      tasks: model,
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "patch",
        path: `/projects/${project._id}`,
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Proje Güncellendi");
        reset();
        setImageUrl("");
      } else {
        toast.error("Proje Güncellendi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Proje  Güncellenemedi: ${error.message}`);
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
        path: "projects",
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
      <Breadcrumb page="projects" sub={project.projectName} />

      <HeadingSection title="Projeler" showButton />

      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["image-section"]}>
          <div className="h-80 relative">
            <Image
              alt=""
              fill
              src={
                (selectedImage && URL.createObjectURL(selectedImage)) ||
                project.image
              }
            />
          </div>

          <Input
            className="hidden"
            id="pickFile"
            label="Fotoğraf Yükle"
            onChange={handleImageChange}
          />
        </div>
        <div className={style["main-area"]}>
          <h2 className="text-3xl text-center">{project.projectName}</h2>
          <hr className={style["hr"]} />

          <div className={style["image-url"]}>
            <label htmlFor="itemColor">Image Url</label>
            <Input
              {...register("image")}
              value={(imageUrl as string) || project.image}
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
                  defaultValue={project[field.name]}
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
