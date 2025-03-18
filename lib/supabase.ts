import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getSupabaseUrl(
  file: Buffer,
  fileName: string,
  fileType: string
) {
  try {
    const file_name = fileName
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-.]/g, "");

    const uploadName = `${file_name}-${Date.now()}`;

    const { data: filedata, error } = await supabase.storage
      .from("legalcase-summary")
      .upload(uploadName, file, {
        contentType: fileType,
        cacheControl: "3600",
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("legalcase-summary").getPublicUrl(filedata.path);

    return {
      fileUrl: publicUrl,
      fileName: fileName,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
