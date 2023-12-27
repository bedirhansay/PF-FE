"use client";

import { BlogDTO, CategoryDTO } from "@types";
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
import { BlogSchema } from "@validations";
import { DeleteBox } from "@components";
import { UploadInput } from "../../components/uploadInput/uploadInput";
import { DropDown } from "../../components/ui/DropDown";
export const BlogPage = ({ blogs }: { blogs: BlogDTO[] }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogDTO>({
    resolver: joiResolver(BlogSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<BlogDTO>();
  const [deleting, setDeleting] = useState(false);
  const [catId, setCatId] = useState({
    id: "",
    name: "",
  });
  const [categories, setCategories] = useState<CategoryDTO[]>();

  const formFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const onSubmit = async (data: BlogDTO) => {
    setLoading(true);
    console.log(data);

    const payloads = {
      ...data,
      category: catId.id,
      image: imageUrl?.toString(),
    };
    console.log(payloads);

    try {
      const res = await callApi({
        method: "post",
        path: "blog",
        payload: payloads,
      });
      console.log(res);

      if (res.kind === "ok") {
        toast.success("Blog Yazısı Eklendi");

        reset();
        setImageUrl("");
      } else {
        toast.error("Blog Yazısı Eklenemedi" + res.error.message);
      }
    } catch (error: any) {
      toast.error(`Blog Yazısı  Güncellenemedi: ${error.message}`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  console.log(errors);

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
        path: `blog/${selectedId}`,
      });

      if (res.kind === "ok") {
        setOpen(false);
        toast.success("Blog Yazısı silindi");
      }
      console.log(res);
    } catch (error) {
      toast.error("Blog Yazısı Silinemedi");
      setOpen(false);
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await callApi({ method: "get", path: "categories" });
      setCategories(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedSkill = blogs.find((item) => item._id === selectedId);
    if (selectedId) {
      setOpen(true);
      setSelectedItem(selectedSkill);
    }
  }, [selectedId, operation]);

  const buttonHandler = () => {
    setOperation("create");
    setOpen(true);
  };

  console.log(blogs);

  return (
    <div>
      <Breadcrumb page="Blog Yazısı" />
      <HeadingSection
        title="Blog Yazısı"
        showButton
        onButtonClick={buttonHandler}
      />
      <DataTables
        setOperation={setOperation}
        setId={setSelectedId}
        data={blogs}
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
            <div className="">
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

            <div className="flex gap-4">
              <DropDown
                title="Kategoriler"
                onClick={setCatId}
                data={categories}
              />
              <Input className="w-full" value={catId.name}></Input>
            </div>

            <div className="w-full flex flex-col gap-5 justify-between">
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
