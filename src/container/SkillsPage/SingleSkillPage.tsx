"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SkillsDTO } from "@types";
import { SkillSchema } from "@validations";
import { Button, ErrorMessage, Input } from "@components/ui";
import toast from "react-hot-toast";
import { callApi } from "@actions";
import { FaArrowRight } from "react-icons/fa";
import { uploadImageToFirabase } from "@helper";
export const SingleSkillPage = ({
  singleSkill,
}: {
  singleSkill: SkillsDTO;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillsDTO>({
    resolver: joiResolver(SkillSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<SkillsDTO>();

  const onSubmit = async (data: SkillsDTO) => {
    setLoading(true);

    const itemsArray = data.items
      ?.toString()
      .split(",")
      .map((item) => item.trim());

    const payload = {
      ...data,
      _id: selectedId,
      items: itemsArray,
      image: imageUrl?.toString() || selectedItem?.image,
    };

    try {
      let res;

      res = await callApi({
        method: "post",
        path: `/skills/${singleSkill._id}`,
        payload,
      });
      if (res.kind === "ok") {
        toast.success("Yetenek Güncellendi");
        setSelectedId("");
      } else {
        console.log(res);
        toast.error("Yetenek güncellenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error("Yetenek  Güncellenemedi" + error.message);
    } finally {
      setOpen(false);
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
    <div>
      <form
        className="flex bg-white px-4 py-10 rounded-md  flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <strong>{selectedItem?.title}</strong>
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full  justify-between">
            <Image
              width={200}
              height={100}
              className="rounded"
              alt=""
              src={selectedItem?.image || ""}
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

          <div className="w-full">
            <Input
              onChange={handleImageChange}
              type="file"
              placeholder="Fotoğraf seç"
            />
            <Button
              disabled={loading}
              isLoading={loading}
              type="submit"
              variant="outline"
            ></Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 justify-between">
          <div>
            <label htmlFor="title">Id</label>
            <Input
              disabled
              {...register("_id")}
              value={selectedId || selectedItem?._id}
            />
            <ErrorMessage message={errors._id?.message} />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <Input {...register("title")} defaultValue={selectedItem?.title} />
            <ErrorMessage message={errors.title?.message} />
          </div>

          <div>
            <label htmlFor="items">Items</label>
            <Input
              {...register("items")}
              defaultValue={selectedItem?.items.join(", ") || ""}
            />
            <ErrorMessage message={errors.items?.message} />
          </div>

          <div>
            <label htmlFor="bgColor">Background Color</label>
            <Input
              {...register("bgColor")}
              defaultValue={selectedItem?.bgColor}
            />
            <ErrorMessage message={errors.bgColor?.message} />
          </div>

          <div>
            <label htmlFor="itemColor">Item Color</label>
            <Input
              {...register("itemColor")}
              defaultValue={selectedItem?.itemColor}
            />
            <ErrorMessage message={errors.itemColor?.message} />
          </div>
          <div>
            <label htmlFor="title">Url</label>
            <Input
              {...register("image")}
              disabled
              defaultValue={selectedItem?.image}
            />
            <ErrorMessage message={errors.image?.message} />
          </div>

          <Button isLoading={loading} type="submit" variant="outline"></Button>
        </div>
      </form>
    </div>
  );
};
