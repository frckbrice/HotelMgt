import { getServerSession } from "next-auth";
import { getUserData } from "@/libs/apis";
import { authOptions } from "@/libs/auth";

import { NextResponse } from "next/server";
import { User } from "@/components/models/user";

console.log("entring api ");

export async function GET(
  req: Request,
  res: Response
): Promise<User | Response> {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("user not logged in");
    return new NextResponse("Authentication required!!", {
      status: 500,
    });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    // console.log("api user data: ", data);
    return NextResponse.json(data, { status: 200, statusText: " Successfull" });
  } catch (err) {
    console.log("error getting user data: ", err);
    return new NextResponse("Unable to get user data ", { status: 400 });
  }
}
