// excelService.js - SheetJS powered Excel importer, exporter, schema validator, and dual-track engine
import { SOURCES_DATASET } from '../data/sourcesDataset.js';
import { DSA_CATEGORIES } from '../data/dsaDataset.js';

function slugify(text) {
  return (text || '').toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function extractHyperlink(cell) {
  if (!cell) return '';
  // 1. Direct cell link
  if (cell.l && cell.l.Target) return cell.l.Target;
  // 2. Formula =HYPERLINK("url", "text")
  if (cell.f && typeof cell.f === 'string') {
    const match = cell.f.match(/HYPERLINK\(\s*["']([^"']+)["']/i);
    if (match && match[1]) return match[1];
  }
  // 3. String value if it looks like a URL
  if (cell.v && typeof cell.v === 'string' && (cell.v.startsWith('http://') || cell.v.startsWith('https://'))) {
    return cell.v;
  }
  return '';
}

export class ExcelService {
  /**
   * Universal workbook dispatcher: auto-detects DSA vs AI Roadmap
   */
  static parseWorkbook(workbook) {
    const sheetNames = workbook.SheetNames || [];
    const isDsa = sheetNames.some(n => 
      n.toLowerCase().includes('practice') || 
      n.toLowerCase().includes('already solved') || 
      n.toLowerCase().includes('leetcode')
    );

    if (isDsa) {
      return ExcelService.parseDsaWorkbook(workbook);
    }
    return ExcelService.parseRoadmapWorkbook(workbook);
  }

  /**
   * Parse DSA Tracker Workbook (Practice 250 & Already Solved sheets)
   */
  static parseDsaWorkbook(workbook) {
    const report = {
      type: 'DSA',
      sheetNames: workbook.SheetNames,
      practiceProblems: [],
      alreadySolved: [],
      warnings: [],
      errors: []
    };

    try {
      const xlsx = (typeof window !== 'undefined' && window.XLSX) ? window.XLSX : null;
      if (!xlsx) {
        report.errors.push("SheetJS (XLSX) is not loaded.");
        return report;
      }

      // 1. Parse Practice 250 Sheet
      const pSheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('practice') || n.toLowerCase().includes('250')) || workbook.SheetNames[0];
      const pSheet = workbook.Sheets[pSheetName];

      if (pSheet && pSheet['!ref']) {
        const pRange = xlsx.utils.decode_range(pSheet['!ref']);
        let currentCategory = "Arrays & Hashing";
        let globalId = 1;

        for (let R = 4; R <= pRange.e.r; R++) {
          const row = [];
          for (let C = 0; C <= 11; C++) {
            const addr = xlsx.utils.encode_cell({ r: R, c: C });
            const cell = pSheet[addr];
            const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
            const link = extractHyperlink(cell);
            row.push({ val, link });
          }

          const col0 = String(row[0].val || '').trim();
          const col1 = String(row[1].val || '').trim();
          const col2 = row[2].val; // LC #
          const col3 = String(row[3].val || '').trim(); // Problem name

          // Section header detection
          if (col0 && (col0.match(/^\d+\./) || col0.toLowerCase().includes('problems')) && !col2) {
            currentCategory = col0.replace(/\(\d+\s*problems\)/i, '').replace(/^\d+\.\s*/, '').trim();
            continue;
          }
          if (col1 && !col2 && !col3) {
            currentCategory = col1.replace(/\(\d+\s*problems\)/i, '').replace(/^\d+\.\s*/, '').trim();
            continue;
          }

          if (col2 || col3) {
            const lcNum = Number(col2) || 0;
            const probName = col3 || String(row[2].val || '');
            const diff = String(row[4].val || 'Medium').trim();
            const pattern = String(row[5].val || '').trim();
            const companies = String(row[6].val || '').trim();

            let link = row[7].link || row[3].link || row[2].link || '';
            if (!link) {
              const slug = slugify(probName);
              link = `https://leetcode.com/problems/${slug}/`;
            }

            const rawStatus = String(row[8].val || '').trim().toUpperCase();
            let status = 'NOT_STARTED';
            if (rawStatus === 'DONE' || rawStatus === 'COMPLETED' || rawStatus === 'Y') status = 'DONE';
            else if (rawStatus === 'REVISE') status = 'REVISE';
            else if (rawStatus === 'SKIPPED') status = 'SKIPPED';
            else if (rawStatus === 'IN PROGRESS' || rawStatus === 'IN_PROGRESS') status = 'IN_PROGRESS';

            const dateSolved = String(row[9].val || '').trim();
            const attempts = Number(row[10].val) || (status === 'DONE' ? 1 : 0);
            const notes = String(row[11].val || '').trim();

            let cat = col1 || currentCategory || 'General';
            cat = cat.replace(/^\d+\.\s*/, '').trim();

            const isHighPriority = [
              'Arrays & Hashing', 'Sliding Window', 'Stack & Monotonic Stack', 
              'Binary Search', 'Binary Trees', 'Graphs: BFS & DFS', 
              '1D Dynamic Programming', '2D / Grid & String DP', 'Design (LLD-style)'
            ].some(ic => cat.includes(ic));

            report.practiceProblems.push({
              id: globalId++,
              subTopic: cat,
              lcNumber: lcNum,
              problem: probName,
              difficulty: diff,
              pattern: pattern,
              companies: companies,
              link: link,
              status: status,
              dateSolved: dateSolved,
              attempts: attempts,
              notes: notes,
              mistakes: "",
              mastery: status === 'DONE' ? 4 : 0,
              priority: isHighPriority ? 'HIGH' : 'MEDIUM'
            });
          }
        }
      }

      // 2. Parse Already Solved Sheet
      const aSheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('already')) || workbook.SheetNames[1];
      const aSheet = workbook.Sheets[aSheetName];

      if (aSheet && aSheet['!ref']) {
        const aRange = xlsx.utils.decode_range(aSheet['!ref']);
        let aCategory = "Arrays & Hashing";
        let aGlobalId = 1;

        for (let R = 4; R <= aRange.e.r; R++) {
          const row = [];
          for (let C = 0; C <= 6; C++) {
            const addr = xlsx.utils.encode_cell({ r: R, c: C });
            const cell = aSheet[addr];
            const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
            const link = extractHyperlink(cell);
            row.push({ val, link });
          }

          const col0 = String(row[0].val || '').trim();
          const col1 = String(row[1].val || '').trim();
          const col2 = row[2].val;
          const col3 = String(row[3].val || '').trim();

          if (col0 && (col0.match(/^\d+\./) || col0.includes('(')) && !col2) {
            aCategory = col0.replace(/\(\d+\)/i, '').replace(/^\d+\.\s*/, '').trim();
            continue;
          }
          if (col1 && !col2 && !col3) {
            aCategory = col1.replace(/\(\d+\)/i, '').replace(/^\d+\.\s*/, '').trim();
            continue;
          }

          if (col2 || col3) {
            const lcNum = Number(col2) || 0;
            const probName = col3;
            const diff = String(row[4].val || 'Medium').trim();
            let link = row[5].link || row[3].link || row[2].link || '';
            if (!link) {
              const slug = slugify(probName);
              link = `https://leetcode.com/problems/${slug}/`;
            }
            const revised = String(row[6].val || '').trim();

            let cat = col1 || aCategory || 'General';
            cat = cat.replace(/^\d+\.\s*/, '').trim();

            report.alreadySolved.push({
              id: aGlobalId++,
              subTopic: cat,
              lcNumber: lcNum,
              problem: probName,
              difficulty: diff,
              link: link,
              revisionStatus: revised === 'Yes' || revised === 'Done' ? 'REVISED' : 'DUE',
              lastRevised: '',
              nextRevision: '',
              notes: ''
            });
          }
        }
      }

    } catch (e) {
      console.error("ExcelService.parseDsaWorkbook error:", e);
      report.errors.push(e.message);
    }

    return report;
  }

  /**
   * Parse AI Roadmap Workbook (365-Day Plan & Sources sheets)
   */
  static parseRoadmapWorkbook(workbook) {
    const report = {
      type: 'AI_ROADMAP',
      sheetNames: workbook.SheetNames,
      importedDays: 0,
      importedSources: 0,
      warnings: [],
      errors: [],
      days: [],
      sources: {}
    };

    try {
      const xlsx = (typeof window !== 'undefined' && window.XLSX) ? window.XLSX : null;
      if (!xlsx) {
        report.errors.push("SheetJS (XLSX) is not loaded.");
        return report;
      }

      // 1. Find Sheets
      const sheet2Name = workbook.SheetNames.find(n => n.toLowerCase().includes('365') || n.toLowerCase().includes('plan')) || workbook.SheetNames[1] || workbook.SheetNames[0];
      const sheet3Name = workbook.SheetNames.find(n => n.toLowerCase().includes('source')) || workbook.SheetNames[2];

      // 2. Parse Sources
      if (sheet3Name && workbook.Sheets[sheet3Name]) {
        const rawSources = xlsx.utils.sheet_to_json(workbook.Sheets[sheet3Name], { defval: "" });
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

      const allSources = { ...SOURCES_DATASET, ...report.sources };

      // 3. Parse Roadmap Days
      if (!sheet2Name || !workbook.Sheets[sheet2Name]) {
        report.errors.push("Could not find the 365-Day Plan sheet in the uploaded Excel workbook.");
        return report;
      }

      const rawDays = xlsx.utils.sheet_to_json(workbook.Sheets[sheet2Name], { defval: "" });

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
          report.warnings.push(`Row ${rowNum}: Duplicate Day ${dayVal} detected.`);
        }
        seenDays.add(dayVal);

        const topic = (row["Topic"] || row["topic"] || "").toString().trim();
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

  /**
   * Export DSA Track Progress to formatted Excel workbook
   */
  static exportDsaToExcel(problems = [], alreadySolved = []) {
    if (typeof window === 'undefined' || !window.XLSX) return;

    const wb = window.XLSX.utils.book_new();

    // 1. Practice 250 rows
    const pRows = problems.map(p => ({
      "Category": p.subTopic,
      "LC #": p.lcNumber,
      "Problem Name": p.problem,
      "Difficulty": p.difficulty,
      "Pattern": p.pattern || '',
      "Companies": p.companies || '',
      "LeetCode URL": p.link || '',
      "Status": p.status || 'NOT_STARTED',
      "Date Solved": p.dateSolved || '',
      "Attempts": p.attempts || 0,
      "Mastery (1-5)": p.mastery || 0,
      "Approach Notes": p.approach || p.notes || '',
      "Mistakes / Gotchas": p.mistakes || ''
    }));
    const pSheet = window.XLSX.utils.json_to_sheet(pRows);
    window.XLSX.utils.book_append_sheet(wb, pSheet, "Practice 250");

    // 2. Already Solved rows
    const aRows = alreadySolved.map(a => ({
      "Category": a.subTopic,
      "LC #": a.lcNumber,
      "Problem Name": a.problem,
      "Difficulty": a.difficulty,
      "LeetCode URL": a.link || '',
      "Revision Status": a.revisionStatus || 'DUE',
      "Last Revised": a.lastRevised || '',
      "Next Revision": a.nextRevision || '',
      "Notes": a.notes || ''
    }));
    const aSheet = window.XLSX.utils.json_to_sheet(aRows);
    window.XLSX.utils.book_append_sheet(wb, aSheet, "Already Solved");

    window.XLSX.writeFile(wb, `LeetCode_250_Practice_Tracker_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  /**
   * Export AI Roadmap Track Progress to formatted Excel workbook
   */
  static exportRoadmapToExcel(days = []) {
    if (typeof window === 'undefined' || !window.XLSX) return;

    const wb = window.XLSX.utils.book_new();

    const dRows = days.map(d => ({
      "Day": d.day,
      "Date": d.date || '',
      "Week": d.week || Math.ceil(d.day / 7),
      "Phase": d.phase || '',
      "Topic": d.topic || '',
      "Concepts": d.concepts || '',
      "Learn Section (45m)": d.learnSection || '',
      "Source Key": d.sourceKey || '',
      "Source URL": d.sourceUrl || '',
      "Implement Task (75m)": d.implementTask || '',
      "Deliverable": d.deliverable || '',
      "Status": d.status || 'NOT_STARTED',
      "Mastery": d.mastery || 0,
      "Time (min)": d.timeSpentMinutes || 0,
      "Remarks": d.remarks || '',
      "Notes": d.notes || ''
    }));

    const dSheet = window.XLSX.utils.json_to_sheet(dRows);
    window.XLSX.utils.book_append_sheet(wb, dSheet, "365-Day Plan");

    window.XLSX.writeFile(wb, `AI_Engineer_365_Roadmap_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  }
}

if (typeof window !== 'undefined') {
  window.ExcelService = ExcelService;
}
