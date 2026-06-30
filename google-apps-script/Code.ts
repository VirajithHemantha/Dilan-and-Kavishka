const SCRIPT_PROP = PropertiesService.getScriptProperties();

function setup() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key") || SpreadsheetApp.getActiveSpreadsheet().getId());
    
    // Parse the incoming JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      data = e.parameter;
    }
    
    const type = data.type || "Unknown";
    
    // Select sheet based on type, or create if it doesn't exist
    let sheetName = type === "RSVP" ? "RSVP" : (type === "Wish" ? "Wishes" : "Submissions");
    let sheet = doc.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      
      // Setup headers based on type
      if (type === "RSVP") {
        sheet.appendRow(["Timestamp", "Full Name", "Number of Guests", "Dietary Notes"]);
        sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#d4c4b0");
      } else if (type === "Wish") {
        sheet.appendRow(["Timestamp", "Name", "Message"]);
        sheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#d4c4b0");
      } else {
        sheet.appendRow(["Timestamp", "Data"]);
      }
      
      // Auto resize columns
      sheet.autoResizeColumns(1, 4);
    }
    
    const timestamp = new Date();
    
    if (type === "RSVP") {
      sheet.appendRow([
        timestamp,
        data.fullName || "",
        data.guests || "",
        data.dietaryNotes || ""
      ]);
    } else if (type === "Wish") {
      sheet.appendRow([
        timestamp,
        data.name || "",
        data.message || ""
      ]);
    } else {
      sheet.appendRow([timestamp, JSON.stringify(data)]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error: any) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
