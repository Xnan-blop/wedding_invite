// Google Apps Script to receive RSVP data and registry selections

function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let registrySheet = spreadsheet.getSheetByName('Registry');
    
    if (!registrySheet) {
      return ContentService.createTextOutput(JSON.stringify({ selectedItems: [] })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = registrySheet.getDataRange().getValues();
    const selectedItems = [];
    
    // Skip header row, get all item names
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === 'Registry Selection') {
        selectedItems.push(data[i][2]); // Item name is in column 2
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ selectedItems: selectedItems })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(JSON.stringify({ selectedItems: [], error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Handle RSVP submissions
    if (data.type === 'rsvp') {
      // Add header row if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Type', 'Timestamp', 'Name', 'Email', 'Number of Guests', 'Attending', 'Dietary Restrictions']);
      }
      
      // Append the new RSVP data
      sheet.appendRow([
        'RSVP',
        data.timestamp,
        data.name,
        data.email,
        data.guests,
        data.attendance,
        data.dietary
      ]);
    }
    
    // Handle registry selections
    if (data.type === 'registry_selection') {
      // Get or create registry sheet
      let registrySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registry');
      if (!registrySheet) {
        registrySheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Registry');
      }
      
      // Add header row if sheet is empty
      if (registrySheet.getLastRow() === 0) {
        registrySheet.appendRow(['Type', 'Timestamp', 'Item Name', 'Selected By']);
      }
      
      // Append the registry selection
      registrySheet.appendRow([
        'Registry Selection',
        data.timestamp,
        data.itemName,
        data.selectedBy
      ]);
    }
    
    return ContentService.createTextOutput('Success');
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput('Error: ' + error);
  }
}
