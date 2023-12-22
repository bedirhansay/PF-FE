"use client";

import React, { useEffect, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, ErrorMessage, Input, SkillCard, Modal } from "@components/ui";
import { SkillSchema } from "@validations";
import { SkillsDTO } from "@types";
import Image from "next/image";
import { ImageCompressor } from "@utils";
import { FaArrowRight } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { uploadImageToFirabase } from "../../lib/helper/UploadImageToFirabase";
import { UpdateSkills, createSkills, deleteSkill } from "@actions";

export const SkillsPage = ({ skills }: { skills: SkillsDTO[] }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillsDTO>({
    resolver: joiResolver(SkillSchema),
  });

  console.log(skills);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [operation, setOperation] = useState("");
  const [selectedItem, setSelectedItem] = useState<SkillsDTO>();

  const onSubmit = async (data: SkillsDTO) => {
    setLoading(true);
    let itemList = data.items.toString();
    let itemsArray = itemList?.split(",").map((item) => item.trim());

    const payload = {
      ...data,
      _id: selectedId,
      items: itemsArray,
      image: imageUrl?.toString() || selectedItem?.image,
    };
    const payloads = {
      ...data,
      items: itemsArray,
      image: imageUrl?.toString() || "",
    };

    if (operation == "edit") {
      try {
        const res = await UpdateSkills({ payload });
        toast.success("Yetenek Güncellendi");
        setOpen(!open);
        setSelectedImage(null);
      } catch (error: any) {
        toast.error("Yetenek Güncellenemedi" + error.message);
      } finally {
        setLoading(false);
      }
    }
    if (operation == "create") {
      try {
        console.log(payload);
        const res = await createSkills({ payloads });
        console.log(res);
        toast.success("Yetenek Eklendi");
        setSelectedImage(null);
        reset();
      } catch (error: any) {
        toast.error("Yetenek Eklenemedi" + error.message);
      } finally {
        setLoading(false);
      }
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
      setSelectedImage(selectedFile);

      let compressedImage = await ImageCompressor(selectedFile);

      if (compressedImage) {
        const formData = new FormData();
        formData.append("image", compressedImage || selectedImage);
        formData.append("field", "skills");
        formData.append("name", selectedFile.name);
        const img = await uploadImageToFirabase(formData);
        setImageUrl(img?.url);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("Resim yüklenemedi. Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    console.log(selectedId);
    try {
      const payload = {
        _id: selectedId,
      };
      const res = await deleteSkill({ payload });
      console.log(res);
      toast.success("Yetenek silindi");
      console.log(res);
    } catch (error) {
      toast.error("Yetenek Silinemedi");
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedSkill = skills.find((item) => item._id === selectedId);
    if (selectedId) {
      setOpen(true);
      setSelectedItem(selectedSkill);
    }
  }, [selectedId, operation]);

  return (
    <section className="basis !w-full flex-col mb-20  p-2">
      <div className="bg-white my-4 py-4 rounded-md shadow-lg flex-between px-4">
        <strong>Yetenekler</strong>
        <Button
          className="bg-green-500 shadow-md  text-white"
          onClick={() => {
            setOperation("create");
            setOpen(true);
          }}
        >
          <FaFileCirclePlus fontSize={24} />
        </Button>
      </div>
      <SkillCard
        skills={skills}
        setSelectedId={setSelectedId}
        setOperation={setOperation}
      />

      <Modal onClose={setOpen} isOpen={open}>
        {operation === "del" && (
          <div className="flex flex-col items-center">
            <strong className="my-40 ">
              {selectedItem?.title} silinmek üzere onaylıyor musunuz?
            </strong>
            <strong></strong>
            <Button onClick={() => onDelete()} variant="outline">
              Sil
            </Button>
          </div>
        )}
        {operation == "edit" && (
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
                  disabled={loading}
                  onChange={handleImageChange}
                  type="file"
                  placeholder="Fotoğraf seç"
                />
                <Button disabled={loading} variant="save">
                  {loading ? <LoaderIcon /> : "Fotoğrı Değiştir"}
                </Button>
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
                <Input
                  {...register("title")}
                  defaultValue={selectedItem?.title}
                />
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

              <Button type="submit" variant="outline">
                {loading ? <LoaderIcon /> : "Kaydet"}
              </Button>
            </div>
          </form>
        )}
        {operation == "create" && (
          <form
            className="flex bg-white px-4 py-10 rounded-md  flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <strong>{selectedItem?.title}</strong>
            <div className="flex flex-col justify-center items-center">
              <div className="flex w-full  justify-between">
                <Image
                  key={selectedId}
                  width={200}
                  height={100}
                  className="rounded border"
                  alt=""
                  src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                ></Image>
              </div>

              <div className="w-full">
                <Input
                  disabled={loading}
                  onChange={handleImageChange}
                  type="file"
                  placeholder="Fotoğraf seç"
                />
                <Button disabled={loading} variant="save">
                  {loading ? <LoaderIcon /> : "Fotoğrı Değiştir"}
                </Button>
              </div>
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
