/**
 * Google Apps Script for LTWA Registration System
 * 
 * Target Google Sheet ID: 1eX88pByrAcUKeSexbilY5BNVbsuChJKwF1ib1VHzJqY
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1eX88pByrAcUKeSexbilY5BNVbsuChJKwF1ib1VHzJqY/edit
 * 2. Go to Extensions > Apps Script (ส่วนขยาย > Apps Script)
 * 3. Delete any default code in Code.gs, paste this script, and click Save.
 * 4. Create a folder in Google Drive to store payment slips, copy its Folder ID, and paste it into DRIVE_FOLDER_ID below.
 * 5. Click Deploy > New Deployment (การใช้งานร่วมกัน > การใช้งานร่วมกันใหม่)
 * 6. Select type: Web App (เว็บแอป)
 * 7. Set Execute as: Me (คุณ)
 * 8. Set Who has access: Anyone (ทุกคน)
 * 9. Click Deploy, authorize permissions, and copy the Web App URL.
 * 10. Paste the Web App URL into your Admin Panel on http://localhost:8000/ to activate live syncing!
 */

var SPREADSHEET_ID = "1eX88pByrAcUKeSexbilY5BNVbsuChJKwF1ib1VHzJqY";
var DRIVE_FOLDER_ID = "1Z0JqnD2tqc030XSuvdZllRGK3j51T1vb"; // โฟลเดอร์เก็บสลิปโอนเงินที่ตั้งค่าไว้

function doPost(e) {
  // Add CORS headers support
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheets()[0]; // Use the first tab

    // Initialize Headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "วันเวลาที่สมัคร",
        "รหัสผู้สมัคร",
        "ชื่อจริง",
        "นามสกุล",
        "อีเมล",
        "เบอร์โทรศัพท์",
        "LINE ID",
        "ประเทศ",
        "เป้าหมายในการเรียน",
        "ลิงก์รูปภาพสลิป (Google Drive)"
      ]);
      // Format headers bold
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
    }

    var fileUrl = "No file uploaded";

    // Handle payment slip upload to Google Drive if slip image is present
    if (data.slipImage && data.slipImage.indexOf(",") !== -1) {
      var folder;
      if (DRIVE_FOLDER_ID === "YOUR_DRIVE_FOLDER_ID_HERE" || DRIVE_FOLDER_ID === "") {
        // Fallback: Create folder named "LTWA_Payment_Slips" in root if folder ID is not specified
        var folders = DriveApp.getFoldersByName("LTWA_Payment_Slips");
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder("LTWA_Payment_Slips");
        }
      } else {
        folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      }

      var parts = data.slipImage.split(",");
      var contentType = parts[0].split(";")[0].split(":")[1];
      var base64Data = parts[1];
      var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, "Slip_" + data.firstName + "_" + data.lastName + "_" + Date.now());
      
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); // Make image link viewable
      fileUrl = file.getUrl();
    }

    // Append registration row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("th-TH"),
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.lineId,
      data.country,
      data.learningGoals,
      fileUrl
    ]);

    var result = { result: "success", message: "Successfully saved to Google Sheets!" };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);

  } catch (error) {
    var errorResult = { result: "error", message: error.toString() };
    return ContentService.createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Handle OPTIONS request for CORS preflight if browser triggers it
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
