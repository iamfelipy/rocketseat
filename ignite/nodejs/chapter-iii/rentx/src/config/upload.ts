import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

// arquivo de configuração de upload, customizado para ser usado por varios devs
// autonomia para o dev escolher em qual pasta ele pode salvar os arquivos

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
