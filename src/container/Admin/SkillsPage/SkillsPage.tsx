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
import { uploadImageToFirabase } from "../../../lib/helper/UploadImageToFirabase";
import { callApi } from "@actions";
import { StringToArray } from "@utils";
import style from "../admin.module.scss";
import { DeleteBox } from "../../../components/DeleteBox";

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
      setImageUrl(() => img?.url || "");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Resim yüklenemedi. Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const formFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "items", label: "Items", type: "text" },
    { name: "image", label: "Image", type: "text" },
    { name: "bgColor", label: "Background Color", type: "text" },
    { name: "itemColor", label: "Item Color", type: "text" },
  ];

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
      <Breadcrumb page="Skill" />

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
            className={style["form-wrapper"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {selectedImage ? (
              <React.Fragment>
                <div className={style["image-section"]}>
                  <Image
                    alt=""
                    fill
                    src={selectedImage && URL.createObjectURL(selectedImage)}
                  ></Image>
                </div>
                <Input
                  className="hidden"
                  id="pickFile"
                  label="Fotoğraf Yükle"
                  onChange={handleImageChange}
                />
              </React.Fragment>
            ) : (
              <Input
                className="hidden"
                id="pickFile"
                onChange={handleImageChange}
                type="file"
              />
            )}
            <div>
              <label htmlFor="itemColor">Image Url</label>
              <Input
                {...register("image")}
                value={imageUrl as string}
                placeholder="Fotoğraf Yükle"
              />
              <ErrorMessage message={errors.image?.message} />
            </div>

            <div className={style["form-fields"]}>
              {formFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Input {...register(field.name as any)} type={field.type} />
                  <ErrorMessage
                    message={
                      (errors as Record<string, any>)[field.name]?.message
                    }
                  />
                </div>
              ))}

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
