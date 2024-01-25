"use client";
import {
  Button,
  ErrorMessage,
  Input,
  HeadingSection,
  Breadcrumb,
} from "@/components/ui";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SkillsDTO } from "@/lib/Types";
import { SkillSchema } from "@/lib/validation";
import toast from "react-hot-toast";
import { callApi } from "@/lib/Actions";
import style from "../admin.module.scss";
import { uploadImageToFirabase } from "@/lib/Helper";
import { StringToArray } from "@/lib/Utils";

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

    const payload = {
      ...data,
      items: StringToArray(data.items),
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

      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={style["image-section"]}>
          <Image
            alt=""
            width={300}
            height={300}
            src={
              (selectedImage && URL.createObjectURL(selectedImage)) ||
              (singleSkill.image as string)
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
          <h2 className="text-3xl text-center">{singleSkill.title}</h2>
          <hr className={style["hr"]} />

          <div className={style["image-url"]}>
            <label htmlFor="itemColor">Image Url</label>
            <Input
              {...register("image")}
              value={(imageUrl as string) || singleSkill.image}
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
        </div>
      </form>
    </div>
  );
};
