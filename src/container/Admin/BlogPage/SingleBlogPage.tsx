"use client";

import { BlogDTO } from "@/lib/types";
import {
  Breadcrumb,
  Button,
  ErrorMessage,
  HeadingSection,
  Input,
} from "@/components/ui";
import React, { useState } from "react";
import { callApi } from "@/lib/actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@/lib/helper";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { BlogSchema } from "@/lib/validation";
import style from "../admin.module.scss";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../components/QuillEditor"), {
  ssr: false,
});

export const SingleBlogPage = ({ blog }: { blog: BlogDTO }) => {
  const formFields = [
    { name: "_id", label: "ID", type: "text", disabled: true },
    { name: "title", label: "Title", type: "text", disabled: false },
    { name: "category", label: "Category", type: "text", disabled: true },
  ];
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(blog.description);

  const {
    register,
    handleSubmit,
    reset,
    watch,

    setValue,
    formState: { errors },
  } = useForm<BlogDTO>({
    resolver: joiResolver(BlogSchema),
    defaultValues: {
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      description: model,
      image: blog.image,
      category: blog.category,
    },
  });

  const category = watch("category");

  const setCustomValue = (key: any, value: string) => {
    setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: BlogDTO) => {
    // setLoading(true);

    console.log(data);

    // try {
    //   const res = await callApi({
    //     method: "patch",
    //     path: `/blog/${blog._id}`,
    //     payload: payloads,
    //   });

    //   if (res.kind === "ok") {
    //     toast.success("Blog Güncellendi");

    //     reset();
    //     setImageUrl("");
    //   } else {
    //     toast.error("Blog Güncellenemedi" + res.error.message);
    //   }
    // } catch (error: any) {
    //   toast.error(`Blog  Güncellenemedi: ${error.message}`);
    // } finally {
    //   setLoading(false);
    // }
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
        path: "blogs",
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
      <Breadcrumb page="blog" sub={blog.title} />
      <HeadingSection title="Blog Yazıları" />
      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["image-section"]}>
          <Image
            alt=""
            width={300}
            height={300}
            //@ts-ignore
            src={
              (selectedImage && URL.createObjectURL(selectedImage)) ||
              blog.image
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
          <h2 className="text-3xl text-center">{blog.title}</h2>
          <hr className={style["hr"]} />

          <div className={style["image-url"]}>
            <label htmlFor="itemColor">Image Url</label>
            <Input
              {...register("image")}
              value={(imageUrl as string) || blog.image}
              placeholder="Fotoğraf Yükleyin ya da Unsplash Link"
            />
            <ErrorMessage message={errors.image?.message} />
          </div>

          <div className={style["form-fields"]}>
            {formFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <Input
                  {...register(field.name as any)}
                  disabled={field.disabled}
                  type={field.type}
                />
                <ErrorMessage
                  message={(errors as Record<string, any>)[field.name]?.message}
                />
              </div>
            ))}

            <div className={style["editor-section"]}>
              <span>Description</span>
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
