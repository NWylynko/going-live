import path from "node:path";
import fs from "node:fs";

export const getAssets = () => {
  const assetPath = path.join(__dirname, '../../assets');

  const files = fs.readdirSync(assetPath);

  return files;

}