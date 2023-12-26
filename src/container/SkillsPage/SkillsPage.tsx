"use client";

import React, { useEffect, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  ErrorMessage,
  Input,
  SkillCard,
  Modal,
  Breadcrumb,
  HeadingSection,
} from "@components/ui";
import { SkillSchema } from "@validations";
import { SkillsDTO } from "@types";
import Image from "next/image";
import { uploadImageToFirabase } from "../../lib/helper/UploadImageToFirabase";
import { callApi } from "@actions";
import { StringToArray } from "@utils";
import { DeleteBox } from "../../components/DeleteBox/DeleteBox";

export const SkillsPage = ({ skills }: { skills: SkillsDTO[] }) => {
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
  const [operation, setOperation] = useState("");
  const [selectedItem, setSelectedItem] = useState<SkillsDTO>();
  const [deleting, setDeleting] = useState(false);

  const onSubmit = async (data: SkillsDTO) => {
    setLoading(true);

    const itemsArray = StringToArray(data.items);

    const payloads = {
      ...data,
      items: itemsArray,
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "post",
        path: "skills",
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Yetenek Eklendi");
        reset();
        setImageUrl("");
      } else {
        toast.error("Yetenek Eklenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Yetenek  Güncellenemedi ${error.message}`);
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
      setImageUrl(img?.url || "");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Resim yüklenemedi. Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      const res = await callApi({
        method: "delete",
        path: `skills/${selectedId}`,
      });

      if (res.kind === "ok") {
        setOpen(false);
        toast.success("Yetenek silindi");
      }
    } catch (error) {
      toast.error("Yetenek Silinemedi");
      setOpen(false);
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const selectedSkill = skills.find((item) => item._id === selectedId);
    if (selectedId) {
      setOpen(true);
      setSelectedItem(selectedSkill);
    }
  }, [selectedId, operation]);

  const buttonHandler = () => {
    setOperation("create");
    setOpen(true);
  };

  return (
    <section className="basis !w-full flex-col mb-20  p-2">
      <Breadcrumb page="Blog" />

      <HeadingSection
        title="Deneyimler"
        showButton
        onButtonClick={buttonHandler}
      />

      <SkillCard
        setOpen={setOpen}
        skills={skills}
        setSelectedId={setSelectedId}
        setOperation={setOperation}
      />

      <Modal onClose={setOpen} isOpen={open}>
        {operation === "del" ? (
          <DeleteBox
            loading={deleting}
            onClick={onDelete}
            title={selectedItem?.title}
          />
        ) : (
          <form
            className="flex bg-white px-4 py-10 rounded-md  flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-between">
              <Image
                width={200}
                height={100}
                className="rounded border"
                alt=""
                src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
              ></Image>

              <Input
                className="hidden"
                id="pickFile"
                label="Fotoğraf Yükle"
                onChange={handleImageChange}
                type="file"
              />
            </div>
            <div key={imageUrl}>
              <label htmlFor="itemColor">Image Url</label>
              <Input
                {...register("image")}
                value={imageUrl as string}
                placeholder="Fotoğraf Yükleyin ya da Unsplash Link"
              />
              <ErrorMessage message={errors.image?.message} />
            </div>

            <div className="w-full flex flex-col gap-5 justify-between">
              <div>
                <label htmlFor="title">Title</label>
                <Input {...register("title")} />
                <ErrorMessage message={errors.title?.message} />
              </div>

              <div>
                <label htmlFor="items">Items</label>
                <Input {...register("items")} />
                <ErrorMessage message={errors.items?.message} />
              </div>

              <div>
                <label htmlFor="bgColor">Background Color</label>
                <Input {...register("bgColor")} />
                <ErrorMessage message={errors.bgColor?.message} />
              </div>

              <div>
                <label htmlFor="itemColor">Item Color</label>
                <Input {...register("itemColor")} />
                <ErrorMessage message={errors.itemColor?.message} />
              </div>

              <Button type="submit" variant="outline">
                {loading ? <LoaderIcon /> : "Kaydet"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};
