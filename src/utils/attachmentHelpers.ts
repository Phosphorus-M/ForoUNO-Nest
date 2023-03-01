import crypto from "crypto";
import path from "path";
import fs, { createWriteStream } from "fs";
import constants from "../constants";
import { finished } from "stream/promises";
import type { FileUpload } from "graphql-upload";
import { ReadStream } from "fs-capacitor";

export function generateAttachName(filename: string, user_id: number, date: Date) {
    const month =
        date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const roundedDate = Math.floor(date.getTime() / 1000);
    const hashedFileName = crypto
        .createHash("md5")
        .update(filename)
        .digest("hex");

    return `${year}${month}/post_${user_id}_${roundedDate}_${hashedFileName}.attach`;
}

export function ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}


export async function saveFilesInDisk(files: FileUpload[], tId: number, uId: number, attachments_raw) {
    for (const upload of files) {
        const { createReadStream, filename, mimetype } = await upload;
        console.log(upload, createReadStream);
        const stream: ReadStream = createReadStream();

        const uploadDate = new Date();
        const attachName = generateAttachName(filename, uId, uploadDate);
        const path = `${constants.UPLOAD_DIRECTORY}/${attachName}`;
        ensureDirectoryExistence(path);

        const out = createWriteStream(path);
        stream.pipe(out).on("finish", () => {
            const { size } = fs.statSync(path);

            attachments_raw.push({
                tId,
                filename,
                attachname: attachName,
                filetype: mimetype,
                filesize: size,
            });
        });
        await finished(out);
        await finished(stream);

    }
}
