"use client";

import {
  Breadcrumb,
  Button,
  DataTables,
  ErrorMessage,
  HeadingSection,
  Input,
  Modal,
} from "@components/ui";
import React, { useEffect, useState } from "react";
import { ProjectDTO } from "@types";
import { callApi } from "@actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@helper";
import { StringToArray } from "@utils";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { ProjectSchema } from "../../../lib/validation/_skills.validation";
import { DeleteBox } from "@components";

export const SingleProjectsPage = ({ projects }: { projects: ProjectDTO }) => {
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
    { name: "tasks", label: "Tasks", type: "text" },
  ];

  const onSubmit = async (data: ProjectDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      tags: StringToArray(data.tags),
      goals: StringToArray(data.goals),
      requirements: StringToArray(data?.requirements),
      tasks: StringToArray(data.tasks),
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "patch",
        path: `/projects/${projects._id}`,
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
        path: "skills",
        name: selectedFile.name,
      };
      const img = await uploadImageToFirabase(payload);
      setSelectedImage(selectedFile);
      setImageUrl(img?.url || "");
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
      <Breadcrumb page="Projeler" sub={projects.projectName} />
      <HeadingSection title="Projeler" showButton />

      <form
        className="flex bg-white px-4 py-10 rounded-md  flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full  relative ">
          <div className="relative">
            <Image
              className="rounded border w-full h-64 "
              alt=""
              width={200}
              height={200}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : (projects.image as string)
              }
            ></Image>
          </div>

          <Input
            className="hidden"
            id="pickFile"
            label="Fotoğraf Yükle"
            onChange={handleImageChange}
          />
        </div>
        <div key={imageUrl}>
          <label htmlFor="itemColor">Image Url</label>
          <Input
            {...register("image")}
            value={(imageUrl as string) || projects.image}
            placeholder="Fotoğraf Yükleyin ya da Unsplash Link"
          />
          <ErrorMessage message={errors.image?.message} />
        </div>

        <div className="w-full flex flex-col gap-5 justify-between">
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <Input
                //@ts-ignore
                defaultValue={projects[field.name]}
                {...register(field.name as any)}
                type={field.type}
              />
              <ErrorMessage
                message={(errors as Record<string, any>)[field.name]?.message}
              />
            </div>
          ))}

          <Button isLoading={loading} type="submit" variant="outline">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};
