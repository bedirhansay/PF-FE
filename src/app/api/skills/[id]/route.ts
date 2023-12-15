import { GetSkillById, UpdateSkill } from "@/lib/models/SkillsModel";
import { connectDB } from "@/lib/utils/ConnectMongo";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(params);
  try {
    await connectDB();
    const allSkills = await GetSkillById(id);

    return NextResponse.json({ data: allSkills, status: 200 });
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
