import fs from "fs";

export const deleteFile = async (filename: string) => {
    // veririca se arquivo existe na URL que for passada no parametro.

    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    // deleta o arquivo
    await fs.promises.unlink(filename);
};
