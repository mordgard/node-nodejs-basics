import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

const sourceFile = join(dirname(fileURLToPath(import.meta.url)), "files", "fileToCompress.txt");
const destinationFile = join(dirname(fileURLToPath(import.meta.url)), "files", "archive.gz");

const compress = async () => {
  const readable = createReadStream(sourceFile);
  const writable = createWriteStream(destinationFile);
  const gzipStream = createGzip();

  try {
    await pipeline(readable, gzipStream, writable);
  } catch (error) {
    throw error;
  }
};

await compress();
