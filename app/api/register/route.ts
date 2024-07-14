import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, password, name } = body;

  const hashpassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashpassword,
    },
  });
  return NextResponse.json({
    sucess:true,
    data:user
  })
}
