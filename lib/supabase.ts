import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getSupabaseUrl(file: File) {
  try {
    const fileName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-.]/g, "");

    const contentType = file.type;

    console.log("ContentType from user is ", contentType);
    const uploadName = `${fileName}-${Date.now()}`;

    const { data: filedata, error } = await supabase.storage
      .from("legalcase-summary")
      .upload(uploadName, file, {
        contentType: contentType,
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
      fileName: (file.name as string) ?? "",
    };
  } catch (e) {
    console.log(e);
  }
}
