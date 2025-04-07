import { NextResponse } from "next/server";
import Exa from "exa-js";

export async function GET() {
  try {
    const exa = new Exa(process.env.EXA_API_KEY as string);
    const result = await exa.searchAndContents(
      "Latest Visa and immigration News of USA",
      {
        text: {
          maxCharacters: 1000,
        },
        category: "news",
        type: "auto",
      }
    );

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("Error fetching Exa feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}
