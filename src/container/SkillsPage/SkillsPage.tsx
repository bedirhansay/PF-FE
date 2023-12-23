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
import { updateSkills, createSkills, deleteSkill } from "@actions";

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

    const payloads = {
      ...data,
      items: itemsArray,
      image: imageUrl?.toString() || "",
    };

    try {
      let res;

      if (operation === "edit") {
        res = await updateSkills({ payload });
        if (res.kind === "ok") {
          toast.success("Yetenek Güncellendi");
          setSelectedId("");
        } else {
          console.log(res);
          toast.error("Yetenek güncellenemedi" + res.error.message);
        }
      } else if (operation === "create") {
        res = await createSkills({ payloads });
        if (res.kind === "ok") {
          toast.success("Yetenek Eklendi");
          reset();
        } else {
          toast.error("Yetenek Eklenemedi" + res.error.message);
        }
      }
    } catch (error: any) {
      toast.error(
        `Yetenek ${operation === "edit" ? "Güncellenemedi" : "Eklenemedi"} ${
          error.message
        }`
      );
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
    setDeleting(true);
    try {
      const payload = {
        _id: selectedId,
      };
      const res = await deleteSkill({ payload });
      if ((res.kind = "ok")) {
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
  }, [selectedId, operation, skills]);

  console.log(open);

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
        setOpen={setOpen}
        skills={skills}
        setSelectedId={setSelectedId}
        setOperation={setOperation}
      />

      <Modal key={selectedId} onClose={setOpen} isOpen={open}>
        {operation === "del" && (
          <div className="flex flex-col items-center">
            <strong className="my-40 ">
              {selectedItem?.title} silinmek üzere onaylıyor musunuz?
            </strong>
            <strong></strong>
            <Button onClick={() => onDelete()} variant="outline">
              {loading ? <LoaderIcon /> : "Onayla"}
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
