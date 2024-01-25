"use client";

import {
  Breadcrumb,
  Button,
  DataTables,
  ErrorMessage,
  HeadingSection,
  Input,
  Modal,
} from "@/components/ui";
import React, { useEffect, useState } from "react";
import { CategoryDTO } from "@/lib/Types";
import { callApi } from "@/lib/Actions";
import toast from "react-hot-toast";
import { uploadImageToFirabase } from "@/lib/Helper";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Image from "next/image";
import { CategorySchema } from "@/lib/validation";
import { DeleteBox } from "@/components/DeleteBox";
import style from "../admin.module.scss";

export const CategoriesPage = ({
  categories,
}: {
  categories: CategoryDTO[];
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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<CategoryDTO>();
  const [deleting, setDeleting] = useState(false);

  const formFields = [{ name: "name", label: "Name", type: "text" }];

  const onSubmit = async (data: CategoryDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      // image: imageUrl?.toString(),
    };

    try {
      const res = await callApi({
        method: "post",
        path: "categories",
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Kategori Eklendi");

        reset();
        setImageUrl("");
      } else {
        toast.error("Kategori Eklenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Kategori  Güncellenemedi: ${error.message}`);
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

  const onDelete = async () => {
    setDeleting(true);
    try {
      const res = await callApi({
        method: "delete",
        path: `categories/${selectedId}`,
      });

      if (res.kind === "ok") {
        setOpen(false);
        toast.success("Kategori silindi");
      }
    } catch (error) {
      toast.error("Kategori Silinemedi");
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const selectedSkill = categories.find((item) => item._id === selectedId);
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
      <Breadcrumb page="categories" />

      <HeadingSection
        title="Projeler"
        showButton
        onButtonClick={buttonHandler}
      />

      <DataTables
        setOperation={setOperation}
        setId={setSelectedId}
        data={categories}
      />

      <Modal onClose={setOpen} isOpen={open}>
        {operation === "del" ? (
          <DeleteBox
            loading={deleting}
            onClick={onDelete}
            title={selectedItem?.name}
          />
        ) : (
          <form
            className={style["page-form-wrapper"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {selectedImage ? (
              <>
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
              </>
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

            {/*//! FORM FIELDS  */}

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
            </div>

            <div className={style["button-section"]}>
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
