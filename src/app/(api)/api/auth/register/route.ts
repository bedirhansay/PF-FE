import { createUser, getUserByEmail } from "@models";
import { generateToken } from "@utils";
import { loginValidation } from "@validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const registerData = await req.json();
    const { email, password } = registerData;

    // Giriş verilerini doğrula
    const validationResult = loginValidation(registerData);
    if (validationResult.error) {
      return NextResponse.json({
        error: validationResult.error.details[0].message,
        status: 400,
      });
    }

    // E-posta ve şifre kontrolü
    if (!email || !password) {
      return NextResponse.json({
        status: 401,
        error: "E-posta ve şifre gereklidir",
      });
    }

    // E-posta ile kullanıcı sorgula
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({
        status: 401,
        error: `${email} ile daha önce kayıt yapılmıştır.`,
      });
    }

    // Yeni kullanıcı oluştur
    const newUser = await createUser(registerData);

    // Token oluştur
    const token = generateToken({ email: newUser.email });

    return NextResponse.json({
      status: 200,
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error);
    return NextResponse.json({
      status: 500,
      error: "Bir hata oluştu, daha sonra tekrar deneyiniz.",
    });
  }
}
