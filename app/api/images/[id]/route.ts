import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const idParam = (await params).id;
  const res = await fetch(`${process.env.BACKEND_URL}/image/${idParam}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return new Response("Image not found", { status: 404 });
  }
  // const image = await res.arrayBuffer();
  // const blob = new Blob([image], { type: "image/jpeg" });
  // const file = new File([blob], "downloaded_image.jpg", { type: "image/jpeg" });
  const file = res.body;
  return new Response(file, {
    headers: {
      ...res.headers,
      "content-type": "image/jpeg",
      "content-disposition": `attachment; filename="downloaded_image.jpg"`,
    },
  });
}
