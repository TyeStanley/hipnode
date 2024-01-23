"use server";

import sharp from "sharp";

export const getBlurData = async (url: string) => {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const { width, height } = await sharp(buffer).metadata();
  const imageBuffer = await sharp(buffer).resize(10, 10).webp().toBuffer();
  const blurDataURL = `data:image/webp;base64,${imageBuffer.toString(
    "base64"
  )}`;

  return { width, height, blurDataURL };
};
