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
        console.log(res);
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
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full  justify-between">
            <Image
              width={200}
              height={100}
              className="rounded"
              alt=""
              src={singleSkill?.image || ""}
            ></Image>
            <span className="flex items-center">
              <FaArrowRight />
            </span>
            <Image
              width={200}
              height={100}
              className="rounded border"
              alt=""
              src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
            ></Image>
          </div>

          <div className="flex">
            <Input
              id="pickFile"
              label="Fotoğrafı Değiştir"
              onChange={handleImageChange}
              type="file"
              className="hidden"
              placeholder="Fotoğraf seç"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 justify-between">
          <div>
            <label htmlFor="title">Id</label>
            <Input {...register("_id")} value={singleSkill?._id} />
            <ErrorMessage message={errors._id?.message} />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <Input {...register("title")} defaultValue={singleSkill?.title} />
            <ErrorMessage message={errors.title?.message} />
          </div>

          <div>
            <label htmlFor="items">Items</label>
            <Input
              {...register("items")}
              defaultValue={singleSkill?.items.join(", ") || ""}
            />
            <ErrorMessage message={errors.items?.message} />
          </div>

          <div>
            <label htmlFor="bgColor">Background Color</label>
            <Input
              {...register("bgColor")}
              defaultValue={singleSkill?.bgColor}
            />
            <ErrorMessage message={errors.bgColor?.message} />
          </div>

          <div>
            <label htmlFor="itemColor">Item Color</label>
            <Input
              {...register("itemColor")}
              defaultValue={singleSkill?.itemColor}
            />
            <ErrorMessage message={errors.itemColor?.message} />
          </div>
          <div>
            <label htmlFor="title">Url</label>
            <Input {...register("image")} defaultValue={singleSkill?.image} />
            <ErrorMessage message={errors.image?.message} />
          </div>

          <Button isLoading={loading} type="submit" variant="outline">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};
