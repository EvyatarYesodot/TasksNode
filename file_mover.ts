import { watch } from "fs";
import fs from "fs/promises";
import path from "path";

const pathFilesToMove = path.join(import.meta.dirname, "files_to_move");
const pathMovedFiles = path.join(import.meta.dirname, "moved_files");
const pathMovedFileTxt = path.join(import.meta.dirname, "moved_files.txt");

const moveFile = async (fileName: string): Promise<void> => {
  try {
    const oldPath = path.join(pathFilesToMove, fileName);
    const newPath = path.join(pathMovedFiles, fileName);
    await fs.access(oldPath);
    await fs.rename(oldPath, newPath);
    console.log(`file: -${fileName}- moving to -moved_files-.`);
    await fs.appendFile(pathMovedFileTxt, fileName + "\n", "utf8");
  } catch (error: any) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== "ENOENT") {
      console.error(`Error moving ${fileName}:`, nodeError);
    }
  }
};

const movingFiles = async (): Promise<void> => {
  try {
    await fs.mkdir(pathFilesToMove, { recursive: true });
    await fs.mkdir(pathMovedFiles, { recursive: true });
    await fs.writeFile(pathMovedFileTxt, "", { flag: "a" });
    console.log(`The system is running and listening to -files_to_move- :`);

    const filesToMove = await fs.readdir(pathFilesToMove);
    for (const fileName of filesToMove) {
      await moveFile(fileName);
    }
    watch(pathFilesToMove, async (_eventType, fileName) => {
      if (fileName) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await moveFile(fileName);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

movingFiles();
