import { getUserData } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
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
    console.log("data: ", data);
    return NextResponse.json(data, { status: 200, statusText: " Successfull" });
  } catch (err) {
    console.log("error get user data: ", err);
    return new NextResponse("Unable to get user data ", { status: 400 });
  }
};
