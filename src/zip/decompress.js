import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";

const sourceFile = join(dirname(fileURLToPath(import.meta.url)), "files", "archive.gz");
const destinationFile = join(dirname(fileURLToPath(import.meta.url)), "files", "fileToCompress.txt");

const decompress = async () => {
  const readable = createReadStream(sourceFile);
  const writable = createWriteStream(destinationFile);
  const gunzipStream = createGunzip();

  try {
    await pipeline(readable, gunzipStream, writable);
  } catch (error) {
    throw error;
  }
};

await decompress();
