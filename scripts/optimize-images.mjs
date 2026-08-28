import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const source = join(process.cwd(), "public/assets/irisco/reference");
const output = join(process.cwd(), "public/assets/irisco/optimized");
await mkdir(output, { recursive: true });

for (const file of await readdir(source)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const stem = parse(file).name;
  const input = sharp(join(source, file)).rotate();
  await input.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(join(output, `${stem}-1600.webp`));
  await input.clone().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(output, `${stem}-900.webp`));
  await input.clone().resize({ width: 1200, withoutEnlargement: true }).avif({ quality: 55, effort: 5 }).toFile(join(output, `${stem}-1200.avif`));
}

await sharp(join(source, "logo.jpg"))
  .trim({ background: "#ffffff", threshold: 18 })
  .resize({ width: 520, withoutEnlargement: true })
  .webp({ quality: 92 })
  .toFile(join(output, "logo-wordmark.webp"));

console.log("IRISCO image variants generated.");
