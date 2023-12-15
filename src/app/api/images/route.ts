import { UpdateSkill } from "@models";
import { connectDB, uploadImageToFirabase } from "@utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

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
    console.log(filesData);

    const url = await uploadImageToFirabase(filesData);

    const updateData = {
      image: url,
    };

    await UpdateSkill(id as string, updateData);

    return NextResponse.json({
      status: 201,
      message: "Dosya başarıyla yüklendi",
      url: url,
    });
  } catch (error) {
    return NextResponse.json({ message: "Hata: " + error }, { status: 500 });
  }
}
