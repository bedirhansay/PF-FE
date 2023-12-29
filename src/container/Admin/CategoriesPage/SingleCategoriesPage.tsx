"use client";

import {
  Breadcrumb,
  Button,
  ErrorMessage,
  HeadingSection,
  Input,
} from "@components/ui";
import React, { useState } from "react";
import { CategoryDTO } from "@types";
import { callApi } from "@actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@helper";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import style from "../admin.module.scss";
import { CategorySchema } from "@validations";

export const SingleCategoriesPage = ({
  category,
}: {
  category: CategoryDTO;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryDTO>({
    resolver: joiResolver(CategorySchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const formFields = [
    { name: "_id", label: "ID", type: "text" },
    { name: "name", label: "Name", type: "text" },
  ];

  const onSubmit = async (data: CategoryDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "patch",
        path: `/categories/${category._id}`,
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Kategori Güncellendi");

        reset();
        setImageUrl("");
      } else {
        toast.error("Kategori Güncellendi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Kategori  Güncellenemedi: ${error.message}`);
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
        path: "categories",
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
      <Breadcrumb page="categories" sub={category.name} />
      <HeadingSection title="Projeler" showButton />

      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["image-section"]}>
          <div>
            <Image
              alt=""
              width={200}
              height={200}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : (category.image as string)
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

        <div>
          <label htmlFor="itemColor">Image Url</label>
          <Input
            {...register("image")}
            value={(imageUrl as string) || category.image}
            placeholder="Fotoğraf Yükle"
          />
          <ErrorMessage message={errors.image?.message} />
        </div>

        <div className={style["form-fields"]}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <Input
                //@ts-ignore
                defaultValue={category[field.name]}
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
