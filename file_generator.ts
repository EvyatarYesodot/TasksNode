import fs from "fs/promises";
import path from "path";
import { generate } from "random-words";

const file_generator = async (numFile: number,numTxt: number,): Promise<void> => {
  try {
    let textWritingNum = numTxt;
    const dirName = "created_files";
    await fs.mkdir(dirName, { recursive: true });
    for (let i = 0; i < numFile; i++) {
      const fileName = `file${i + 1}.txt`;
      const filePath = path.join(dirName, fileName);
      await fs.writeFile(
        filePath,
        generate({ exactly: textWritingNum, join: " " }),
        "utf-8",
      );
      console.log(`file name: ${fileName}, sum words writ: ${textWritingNum}.`);
      textWritingNum *= 2;
    }
  } catch (error) {
    console.error(error);
  }
};


file_generator(5,8);
