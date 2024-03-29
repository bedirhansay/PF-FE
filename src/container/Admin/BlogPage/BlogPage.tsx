"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import { BlogDTO, BlogPageDTO, CategoryDTO } from "@/lib/types";
import {
  Breadcrumb,
  Button,
  ErrorMessage,
  HeadingSection,
  Input,
  Modal,
} from "@/components/ui";
import { callApi } from "@/lib/actions";
import { uploadImageToFirabase } from "@/lib/helper";
import Image from "next/image";
import { BlogSchema } from "@/lib/validation";
import { DeleteBox } from "@/components/DeleteBox/DeleteBox";
import { DataTables, Pagination } from "@/components";
import style from "../admin.module.scss";
import { useFetch } from "@/lib/hooks";

const Editor = dynamic(() => import("../../../components/QuillEditor"), {
  ssr: false,
});

export const BlogPage = ({ blogs }: { blogs: BlogPageDTO }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<BlogDTO>();
  const [deleting, setDeleting] = useState(false);
  const [catId, setCatId] = useState<string>();
  const [categories, setCategories] = useState<CategoryDTO[]>();
  const [model, setModel] = useState<any>();
  const [blogsItems, setBlogsItems] = useState<BlogPageDTO>(blogs);

  const formFields = [{ name: "title", label: "Title", type: "text" }];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<BlogDTO>({
    resolver: joiResolver(BlogSchema),
  });

  const onSubmit = async (data: BlogDTO) => {
    setLoading(true);

    const payloads = {
      ...data,
      description: model,
      category: catId,
      image: imageUrl?.toString(),
    };

    console.log(data);

    try {
      const res = await callApi({
        method: "post",
        path: "blog",
        payload: payloads,
      });

      if (res.kind === "ok") {
        toast.success("Blog Yazısı Eklendi");

        reset();
        setImageUrl("");
        setModel("");
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
    } catch (error) {
      toast.error("Blog Yazısı Silinemedi");
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const { data } = useFetch({
    path: "categories",
    method: "get",
  });
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await callApi({ method: "get", path: "categories" });
      setCategories(data);
      setCatId(data[0]._id);
    };
    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const selectedSkill = blogsItems.blogs.find(
      (item) => item._id === selectedId
    );
    if (selectedId) {
      setOpen(true);
      setSelectedItem(selectedSkill);
    }
    return () => {};
  }, [selectedId, operation]);

  const buttonHandler = () => {
    setOperation("create");
    setOpen(true);
  };

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await callApi({
        method: "get",
        path: `blog?page=${page}`,
      });

      setBlogsItems(data);
    };
    fetchBlogs();
  }, [page]);

  return (
    <div>
      <Breadcrumb page="blog" />
      <HeadingSection
        title="Blog Yazısı"
        showButton
        onButtonClick={buttonHandler}
      />
      <DataTables
        setOperation={setOperation}
        setId={setSelectedId}
        data={blogsItems.blogs}
      />
      <Pagination
        currentPage={blogsItems.currentPage}
        totalPage={blogsItems.totalPages}
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

            {/* //! Select Box */}
            <div className="flex flex-col gap-4">
              <label htmlFor="kategori">Ketegori Seç</label>

              <select
                onChange={(e) => setCatId(e.target.value)}
                name="kategori"
                className={style["select-box"]}
              >
                {categories?.map((item) => (
                  <option key={item._id + "cat"} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
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

              <div className={style["editor-section"]}>
                <span>Description</span>
                <Editor model={model} setModel={setModel} />
              </div>

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
