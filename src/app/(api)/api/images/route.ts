import { UpdateSkill } from "@models";
import { uploadImageToFirabase } from "@utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const fileData = await req.formData();

    const id = fileData.get("id");
    const field = fileData.get("field");
    const image = fileData.get("image");
    const name = fileData.get("name");

    const filesData = {
      field: field as string,
      image: image as string,
      name: name as string,
    };

    const url = await uploadImageToFirabase(filesData);

    const updateData = {
      image: url.url,
    };

    const update = id && (await UpdateSkill(id as string, updateData));

    return NextResponse.json({
      status: 201,
      message: "Dosya başarıyla yüklendi",
      url: url,
    });
  } catch (error) {
    return NextResponse.json({ message: "Hata: " + error }, { status: 500 });
  }
}
