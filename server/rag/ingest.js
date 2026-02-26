// fs: Node.js file system module for reading files and directories
import fs from "fs";

// path: Node.js utility for constructing and resolving file paths
import path from "path";

// fileURLToPath: converts a file:// URL to a regular file path (needed for ES modules)
import { fileURLToPath } from "url";

// getDocument: pdfjs-dist function that parses a PDF file and returns a document object
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// Get the directory path of this current file (ES module equivalent of __dirname in CommonJS)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the absolute path to the folder containing the resume PDFs
const PDF_DIR = path.resolve(
  __dirname,
  "../../resume-ray-azhar/resumepdf_azhar_ray"
);

// loadResumeText: reads all PDF files from the resume directory and extracts their text
// Returns a single string containing all resume text, used as context for the chatbot
export async function loadResumeText() {
  // Read the directory and filter for only .pdf files
  const pdfFiles = fs
    .readdirSync(PDF_DIR)
    .filter((f) => f.endsWith(".pdf"));

  // Throw an error if no PDFs are found — the chatbot needs resume data to function
  if (pdfFiles.length === 0) {
    throw new Error(`No PDF files found in ${PDF_DIR}`);
  }

  console.log(`Found ${pdfFiles.length} PDF(s): ${pdfFiles.join(", ")}`);

  // Accumulator string for all extracted text across all PDFs
  let allText = "";

  // Loop through each PDF file and extract its text content
  for (const file of pdfFiles) {
    const filePath = path.join(PDF_DIR, file);

    // Read the PDF file into a buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF using pdfjs-dist — returns a document with pages
    const doc = await getDocument({ data: new Uint8Array(dataBuffer) }).promise;

    let text = "";

    // Iterate through each page of the PDF (pages are 1-indexed)
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);

      // Get the text content of the page — returns an object with an "items" array
      const content = await page.getTextContent();

      // Join all text items on the page into a single string, separated by spaces
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }

    // Append this PDF's text to the total, with a separator showing the filename
    allText += `\n--- ${file} ---\n${text}\n`;
  }

  console.log(`Loaded ${allText.length} characters from PDFs`);

  // Return all extracted resume text as a single string
  return allText;
}
