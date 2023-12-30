"use client";

import { ExperienceDTO } from "@types";
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
import { callApi } from "@actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@helper";
import { StringToArray } from "@utils";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { ExperienceSchema } from "@validations";
import { DeleteBox } from "@components";
import dynamic from "next/dynamic";
import style from "../admin.module.scss";
const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

export const ExperiencePage = ({
  experience,
}: {
  experience: ExperienceDTO[];
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceDTO>({
    resolver: joiResolver(ExperienceSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ExperienceDTO>();
  const [deleting, setDeleting] = useState(false);
  const [model, setModel] = useState();

  const formFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "position", label: "Position", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "skills", label: "Skills", type: "text" },
  ];

  const onSubmit = async (data: ExperienceDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      description: StringToArray(data.description),
      skills: StringToArray(data.skills),
      image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "post",
        path: "experience",
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Deneyim Eklendi");
        reset();
        setImageUrl("");
      } else {
        toast.error("Deneyim Eklenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Deneyim  Güncellenemedi: ${error.message}`);
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
        path: "experiences",
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

  const onDelete = async () => {
    setDeleting(true);
    try {
      const res = await callApi({
        method: "delete",
        path: `experience/${selectedId}`,
      });

      if (res.kind === "ok") {
        setOpen(false);
        toast.success("Deneyim silindi");
      }
    } catch (error) {
      toast.error("Deneyim Silinemedi");
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const selectedSkill = experience.find((item) => item._id === selectedId);
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
    <div>
      <Breadcrumb page="Deneyim" />
      <HeadingSection
        title="Deneyimler"
        showButton
        onButtonClick={buttonHandler}
      />
      <DataTables
        setOperation={setOperation}
        setId={setSelectedId}
        data={experience}
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
            className={style["page-form-wrapper"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {selectedImage ? (
              <React.Fragment>
                <div className={style["page-image-section"]}>
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
              <Editor model={model} setModel={setModel} />

              <Button isLoading={loading} type="submit" variant="outline">
                Kaydet
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
