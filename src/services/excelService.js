// excelService.js - SheetJS powered Excel importer, schema validator, and diagnostic engine
import { SOURCES_DATASET } from '../data/sourcesDataset.js';

export class ExcelService {
  /**
   * Parse an uploaded ArrayBuffer or File from input[type=file]
   * Reads Sheet 1 (Overview), Sheet 2 (365-Day Plan), Sheet 3 (Sources)
   */
  static parseWorkbook(workbook) {
    const report = {
      sheetNames: workbook.SheetNames,
      importedDays: 0,
      importedSources: 0,
      warnings: [],
      errors: [],
      days: [],
      sources: {}
    };

    try {
      // 1. Find Sheets (by exact name or fuzzy pattern)
      const sheet2Name = workbook.SheetNames.find(n => n.toLowerCase().includes('365') || n.toLowerCase().includes('plan')) || workbook.SheetNames[1] || workbook.SheetNames[0];
      const sheet3Name = workbook.SheetNames.find(n => n.toLowerCase().includes('source')) || workbook.SheetNames[2];

      // 2. Parse Sources from Sheet 3 if present
      if (sheet3Name && workbook.Sheets[sheet3Name]) {
        const rawSources = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheet3Name], { defval: "" });
        for (const row of rawSources) {
          const key = (row["Source Key"] || row["Key"] || row["key"] || "").toString().trim();
          if (key) {
            report.sources[key] = {
              key,
              name: (row["Resource"] || row["Resource Name"] || row["resource"] || key).toString().trim(),
              url: (row["URL"] || row["Url"] || row["url"] || "https://github.com/").toString().trim(),
              whatToStudy: (row["What to study"] || row["Study"] || "").toString().trim(),
              whatToSkip: (row["What to skip"] || row["Skip"] || "").toString().trim(),
              quality: "PRIMARY"
            };
            report.importedSources++;
          }
        }
      }

      // Merge with default sources
      const allSources = { ...SOURCES_DATASET, ...report.sources };

      // 3. Parse Roadmap Days from Sheet 2
      if (!sheet2Name || !workbook.Sheets[sheet2Name]) {
        report.errors.push("Could not find the 365-Day Plan sheet in the uploaded Excel workbook.");
        return report;
      }

      const rawDays = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheet2Name], { defval: "" });

      if (rawDays.length === 0) {
        report.errors.push("The roadmap sheet appears to be empty.");
        return report;
      }

      const seenDays = new Set();

      rawDays.forEach((row, index) => {
        const rowNum = index + 2;
        const dayVal = parseInt(row["Day"] || row["day"] || row["DAY"] || 0, 10);
        
        if (!dayVal || isNaN(dayVal)) {
          report.warnings.push(`Row ${rowNum}: Skipped row with missing or invalid Day number.`);
          return;
        }

        if (seenDays.has(dayVal)) {
          report.warnings.push(`Row ${rowNum}: Duplicate Day ${dayVal} detected. Overwriting with later entry.`);
        }
        seenDays.add(dayVal);

        const topic = (row["Topic"] || row["topic"] || "").toString().trim();
        if (!topic) {
          report.warnings.push(`Day ${dayVal}: Missing Topic title.`);
        }

        const sourceKey = (row["Source key"] || row["Source Key"] || row["source_key"] || "OWN").toString().trim();
        const sourceUrl = (row["Source URL"] || row["Source Url"] || (allSources[sourceKey] ? allSources[sourceKey].url : "")).toString().trim();
        const srcInfo = allSources[sourceKey] || {};

        const dayObj = {
          day: dayVal,
          date: (row["Date"] || row["date"] || "").toString().trim(),
          week: parseInt(row["Week"] || row["week"] || Math.ceil(dayVal / 7), 10),
          phase: (row["Phase"] || row["phase"] || "Core AI Engineering").toString().trim(),
          topic: topic || `Day ${dayVal} Roadmap Topic`,
          concepts: (row["Concepts"] || row["concepts"] || "").toString().trim(),
          learnSection: (row["LEARN (45 min) - source & section"] || row["LEARN source & section"] || row["Learn Section"] || "").toString().trim(),
          sourceKey: sourceKey || "OWN",
          sourceName: srcInfo.name || (sourceKey === "OWN" ? "Independent Practice" : sourceKey),
          sourceUrl: sourceUrl || "https://github.com/",
          whatToStudy: srcInfo.whatToStudy || "Study core concepts and implement lab exercises.",
          whatToSkip: srcInfo.whatToSkip || "Theoretical proofs not required for engineering.",
          quality: srcInfo.quality || "PRIMARY",
          implementTask: (row["IMPLEMENT / BUILD (75 min)"] || row["IMPLEMENT / BUILD"] || row["Implement"] || "").toString().trim(),
          reviseTask: (row["Revise (5 min)"] || row["Revise"] || "").toString().trim(),
          deliverable: (row["Deliverable"] || row["deliverable"] || "").toString().trim(),
          difficulty: parseInt(row["Difficulty"] || row["difficulty"] || 3, 10),
          checkpoint: (row["Checkpoint"] || row["checkpoint"] || "").toString().trim(),
          status: (row["Done (Y/N)"] === "Y" || row["Done"] === "Y") ? "COMPLETED" : "NOT_STARTED",
          mastery: 0,
          timeSpentMinutes: 0,
          remarks: "",
          notes: "",
          doubts: [],
          revisionDue: null,
          revisionStep: 0
        };

        report.days.push(dayObj);
      });

      report.days.sort((a, b) => a.day - b.day);
      report.importedDays = report.days.length;

      if (report.importedDays < 365) {
        report.warnings.push(`Workbook contains ${report.importedDays} days (expected 365).`);
      }

    } catch (err) {
      console.error("Excel parse error:", err);
      report.errors.push(`Parse error: ${err.message}`);
    }

    return report;
  }
}

if (typeof window !== 'undefined') {
  window.ExcelService = ExcelService;
}
