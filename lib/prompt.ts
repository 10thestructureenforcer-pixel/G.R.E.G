import { Conflict } from "./types";

export const generateMemoPrompt = (conflict: Conflict): string => {
  const conflictType =
    conflict.type === "opposingParty"
      ? "direct conflict"
      : "potential conflict";
  const matchDetails = conflict.matches
    .map(
      (match) =>
        `Client: ${match.clientName}${
          match.A_number ? `, A-Number: ${match.A_number}` : ""
        }${
          match.sponsorCompany
            ? `, Sponsor Company: ${match.sponsorCompany}`
            : ""
        }`
    )
    .join("\n");

  return `
      Please generate a professional legal memo regarding a ${conflictType}  of interest:
      
      Conflict Details:
      ${conflict.message}
      
      Matching Records:
      ${matchDetails}
      
      Please include:
      1. Summary of the conflict
      2. Potential ethical implications
      3. Recommended actions
      4. Any necessary disclosures or waivers needed
    `.trim();
};
