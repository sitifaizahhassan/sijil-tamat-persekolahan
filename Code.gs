/**
 * KOD GOOGLE APPS SCRIPT — Pangkalan Data Sijil Berhenti Sekolah
 * ================================================================
 * Fungsi: Jadi "jambatan" (API) antara aplikasi web dengan Google Sheet.
 * 6 guru boleh kongsi & lihat data yang sama.
 *
 * CARA PASANG (lihat PANDUAN-SETUP.md untuk langkah penuh):
 * 1. Buka Google Sheet anda -> menu Extensions -> Apps Script
 * 2. Padam kod sedia ada, tampal (paste) SEMUA kod ini
 * 3. Klik Simpan (ikon disket)
 * 4. Klik Deploy -> New deployment -> pilih "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Salin "Web app URL" yang diberi -> masukkan dalam index.html
 */

// ====== TETAPAN ======
var SHEET_NAME = 'Murid';
var HEADERS = [
  'id','nama','kp','sijillahir','tempatlahir','tarikhlahir','tarikhmasuk',
  'idmurid','darjahmasuk','tarikhtamat','darjahakhir','sekolahdahulu',
  'kelakuan','sebab','uniform','kelab','sukan','lain'
];

// Pastikan sheet & header wujud
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

// ====== BACA (GET) ======
function doGet(e) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < HEADERS.length; j++) {
      obj[HEADERS[j]] = data[i][j];
    }
    if (obj.id) rows.push(obj);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== TULIS (POST): tambah / kemas kini / padam ======
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var req = JSON.parse(e.postData.contents);
    var action = req.action;
    var sheet = getSheet();
    var result = { ok: true };

    if (action === 'add') {
      var m = req.murid;
      m.id = 'M' + new Date().getTime();
      var row = HEADERS.map(function (h) { return m[h] || ''; });
      sheet.appendRow(row);
      result.id = m.id;

    } else if (action === 'update') {
      var m = req.murid;
      var rowIdx = findRow(sheet, m.id);
      if (rowIdx > 0) {
        var row = HEADERS.map(function (h) { return m[h] || ''; });
        sheet.getRange(rowIdx, 1, 1, HEADERS.length).setValues([row]);
      } else {
        result.ok = false; result.error = 'ID tidak dijumpai';
      }

    } else if (action === 'delete') {
      var rowIdx = findRow(sheet, req.id);
      if (rowIdx > 0) {
        sheet.deleteRow(rowIdx);
      } else {
        result.ok = false; result.error = 'ID tidak dijumpai';
      }

    } else {
      result.ok = false; result.error = 'Action tidak sah';
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Cari nombor baris ikut id
function findRow(sheet, id) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) return i + 1;
  }
  return -1;
}
