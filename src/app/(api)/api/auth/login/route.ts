import { generateToken } from "@utils";
import { getUserByEmail } from "@models";
import { loginValidation } from "@validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const loginPayload = await req.json();
    const { email, password } = loginPayload;

    //! Giriş verilerini doğrula
    const validationResult = loginValidation(loginPayload);
    if (validationResult.error) {
      return NextResponse.json({
        error: validationResult.error.details[0].message,
        status: 400,
      });
    }

    //! E-posta ve şifre kontrolü
    if (!email || !password) {
      return NextResponse.json({
        status: 401,
        error: "E-posta ve şifre gereklidir",
      });
    }

    //! E-posta ile kullanıcı sorgula
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({
        status: 401,
        error: `${email} kayıt edilmemiştir.`,
      });
    }

    //! Token oluştur
    const token = generateToken({ email: user.email });

    return NextResponse.json({
      status: 200,
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Kullanıcı sorgulama hatası:", error);
    return NextResponse.json({
      status: 500,
      error: "Bir hata oluştu, daha sonra tekrar deneyiniz.",
    });
  }
}
