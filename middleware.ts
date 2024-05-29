import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { request as axiosRequest } from "@/lib/axiosUtils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  fetch("http://web:8000/api/auth/user/", {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("エラー発生！！！", err);
    });

  // return NextResponse.redirect(new URL(request.url).origin);
}

export const config = {
  matcher: "/:path*",
};
