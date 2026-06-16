import XLSX from "xlsx";
import fs from "fs";

// Read Excel file
const workbook = XLSX.readFile("./data/PM_Wheat_Receptors2.xlsx");


const sheetName = workbook.SheetNames[2];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Save JSON file
fs.writeFileSync(
  "./data/data.json",
  JSON.stringify(data, null, 2)
);

console.log("JSON file created successfully");