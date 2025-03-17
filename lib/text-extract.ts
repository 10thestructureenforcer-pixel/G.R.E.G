import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

export async function extractTextFromFile(
  fileBuffer: Buffer,
  fileType: string
) {
  try {
    let rawDocs = [];
    if (fileType === "application/pdf") {
      const loader = new PDFLoader(new Blob([fileBuffer], { type: fileType }));
      rawDocs = await loader.load();
      return rawDocs;
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const loader = new DocxLoader(new Blob([fileBuffer], { type: fileType }));
      rawDocs = await loader.load();
      return rawDocs;
    } else if (fileType === "text/plain") {
      return fileBuffer.toString("utf-8");
    } else {
      throw new Error("Unsupported File Type: " + fileType);
    }
  } catch (e) {
    console.error("Error extracting text:", e);
    throw e;
  }
}
