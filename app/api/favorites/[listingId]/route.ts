import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getcurrentuser";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favouiteIds || [])];

  favouriteIds.push(listingId);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouiteIds: favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favouiteIds || [])];

  favouriteIds = favouriteIds.filter((id)=>id!==listingId)

  const user = await prisma.user.update({
    where:{
        id:currentUser.id
    },
    data:{
        favouiteIds: favouriteIds,
    }
  })

  return NextResponse.json(user)
}
