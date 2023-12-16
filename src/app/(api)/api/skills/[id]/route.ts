import { GetSkillById, UpdateSkill } from "@models";
import { connectDb } from "@utils";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await connectDb();
    const allSkills = await GetSkillById(id);

    return NextResponse.json({ data: allSkills, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
