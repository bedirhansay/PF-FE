import { SkillValidation } from "@validations";
import {
  DeleteSkill,
  GetAllSkills,
  GetSkillById,
  SkillModel,
  UpdateSkill,
} from "@models";
import { connectDB } from "@utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const allSkills = await GetAllSkills();
    return NextResponse.json({ data: allSkills, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const postData = await req.json();
    const validationResult = SkillValidation(postData);

    if (validationResult.error) {
      return NextResponse.json(
        { error: validationResult.error.details[0].message },
        { status: 400 }
      );
    }
    const result = await SkillModel.create(postData);

    return NextResponse.json({ status: 201, message: "Skill oluşturuldu." });
  } catch (error) {
    return NextResponse.json({ message: "Hata: " + error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const patchData = await req.json();

    const id = patchData._id;

    const data = await UpdateSkill(id, patchData);
    return NextResponse.json({ status: 200, data: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: err });
  }
}

export async function DELETE(req: Request) {
  try {
    const del = await req.json();
    const id = del._id;
    const existingSkill = await GetSkillById(id);

    if (!existingSkill) {
      return NextResponse.json({ status: 404, message: "Id bulunamadı." });
    }
    const data = await DeleteSkill(id);
    return NextResponse.json({ status: 200, data: data });
  } catch (error) {
    return NextResponse.json({ status: 404, error: error });
  }
}
