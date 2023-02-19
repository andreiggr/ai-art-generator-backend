/* eslint-disable arrow-body-style */
import express from "express";
import * as dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";

// import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const cleanUpData = (posts) => {
  const { prompts, images } = posts;

  const isInfinite = prompts && prompts.length > 0 ? true : false;

  return images.map((image) => {
    return {
      ...image,
      url: isInfinite
        ? `https://lexica-serve-encoded-images2.sharif.workers.dev/md2/${image.id}`
        : image.src,
      prompt: isInfinite
        ? prompts.filter((prompt) => prompt.id === image.promptid)[0]
        : { prompt: image.prompt },
    };
  });
};

router.route("/").get(async (req, res) => {
  try {
    const { q } = req.query;

    const url = q
      ? `https://lexica.art/api/v1/search?q=${q}`
      : "https://lexica.art/api/infinite-prompts";

    const response = await fetch(url);
    const posts = await response.json();
    res.status(200).json({ success: true, data: cleanUpData(posts) });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again" + err,
    });
  }
});

export default router;
