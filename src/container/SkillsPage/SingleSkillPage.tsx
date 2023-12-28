"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SkillsDTO } from "@types";
import { SkillSchema } from "@validations";
import toast, { LoaderIcon } from "react-hot-toast";
import { callApi } from "@actions";
import { FaArrowRight } from "react-icons/fa";
import { uploadImageToFirabase } from "@helper";
import {
  Button,
  ErrorMessage,
  Input,
  HeadingSection,
  Breadcrumb,
} from "@components/ui";

export const SingleSkillPage = ({
  singleSkill,
}: {
  singleSkill: SkillsDTO;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillsDTO>({
    resolver: joiResolver(SkillSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const formFields = [
    { name: "_id", label: "ID", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "items", label: "Items", type: "text" },
    { name: "image", label: "Image", type: "text" },
    { name: "bgColor", label: "Background Color", type: "text" },
    { name: "itemColor", label: "Item Color", type: "text" },
  ];

  const onSubmit = async (data: SkillsDTO) => {
    setLoading(true);

    const itemsArray = data.items
      ?.toString()
      .split(",")
      .map((item) => item.trim());

    const payload = {
      ...data,
      items: itemsArray,
      image: imageUrl?.toString() || singleSkill?.image,
    };

    try {
      const res = await callApi({
        method: "patch",
        path: `/skills/${singleSkill._id}`,
        payload: payload,
      });
      if (res.kind === "ok") {
        toast.success("Yetenek Güncellendi");
        setSelectedImage(null);
      } else {
        toast.error("Yetenek güncellenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error("Yetenek  Güncellenemedi" + error.message);
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
      setImageUrl(img?.url);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Resim yüklenemedi. Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Breadcrumb page="skills" sub={singleSkill.title} />
      <HeadingSection title={singleSkill.title} />

      <form
        className="flex bg-white px-4 py-10 rounded-md  flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <strong>{singleSkill?.title}</strong>
        <div className=" h-[250px]  relative grid grid-cols-2 gap-10 ">
          <div className="relative">
            <Image
              className="rounded border w-96"
              alt=""
              fill
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : (singleSkill.image as string)
              }
            ></Image>
          </div>

          <Input
            className="hidden"
            id="pickFile"
            label="Fotoğraf Yükle"
            onChange={handleImageChange}
            type="file"
          />
        </div>

        <div className="w-full flex flex-col gap-5 justify-between">
          <div>
            <label htmlFor="title">Id</label>
            <Input {...register("_id")} value={singleSkill?._id} />
            <ErrorMessage message={errors._id?.message} />
          </div>

          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <Input
                //@ts-ignore
                defaultValue={singleSkill[field.name]}
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
