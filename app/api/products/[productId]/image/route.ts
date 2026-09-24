import { NextRequest, NextResponse } from "next/server";
import { uploadProductImage } from "@/src/lib/storage";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "File must be an image" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  await uploadProductImage(productId, buffer);

  return NextResponse.json({
    success: true,
    images: {
      320: `/media/product/${productId}/320.webp`,
      640: `/media/product/${productId}/640.webp`,
      1280: `/media/product/${productId}/1280.webp`,
    },
  });
}
