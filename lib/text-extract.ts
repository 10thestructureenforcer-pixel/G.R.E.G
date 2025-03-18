import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";

export async function extractTextFromFile(
  fileBuffer: Buffer,
  fileType: string
) {
  try {
    let rawDocs = [];

    const blob = new Blob([fileBuffer], { type: fileType });

    if (fileType === "application/pdf") {
      const loader = new PDFLoader(blob);
      rawDocs = await loader.load();
      return rawDocs;
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const loader = new DocxLoader(blob);
      rawDocs = await loader.load();
      return rawDocs;
    } else if (fileType === "text/plain") {
      const loader = new TextLoader(blob);
      rawDocs = await loader.load();
      return rawDocs;
    } else {
      throw new Error("Unsupported File Type: " + fileType);
    }
  } catch (e) {
    console.error("Error extracting text:", e);
    throw e;
  }
}
