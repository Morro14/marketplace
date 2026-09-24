import { Storage } from "@google-cloud/storage";
import sharp from "sharp";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCS_BUCKET!);

export async function uploadProductImage(
  productId: number | string,
  input: Buffer,
) {
  const widths = [320, 640, 1280];

  await Promise.all(
    widths.map(async (width) => {
      const output = await sharp(input)
        .resize({
          width,
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toBuffer();

      const path = `media/product/${productId}/${width}.webp`;

      await bucket.file(path).save(output, {
        contentType: "image/webp",
        resumable: false,
      });
    }),
  );
}
