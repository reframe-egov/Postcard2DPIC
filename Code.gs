/**
 * Postcards from 2035: backend for the GitHub-hosted page.
 * Paste this into Extensions > Apps Script from your Google Sheet, then deploy as a web app
 * (Execute as: Me, Who has access: Anyone). See README.md.
 *
 * The facilitator password lives here, on Google's side, so it never appears in the public page.
 */
const PASSWORD = 'ReimagineDPIC';
const SHEET_NAME = 'Responses';
const FIELDS = ['name','stamp','picture','pictureWhy','unsolved','personaNow','persona2035','metaphor','metaphorWhy',
  'overheardWho','overheard','vanishWho','vanishLoss','only1','only2','only3','shift','build','hardest','wish'];
const HEADERS = ['id','updatedAt'].concat(FIELDS);
const MAX_LEN = 5000;

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, error: 'bad_request' }); }

  if (body.action === 'save') {
    if (!/^r-[a-z0-9]{8,30}$/.test(String(body.id || ''))) return json({ ok: false, error: 'bad_id' });
    save(String(body.id), body.data || {});
    return json({ ok: true });
  }

  if (body.action === 'list') {
    if (body.key !== PASSWORD) {
      Utilities.sleep(800); // slows down guessing
      return json({ ok: false, error: 'wrong_password' });
    }
    return json({ ok: true, rows: readAll() });
  }

  return json({ ok: false, error: 'unknown_action' });
}

function doGet() {
  return json({ ok: true, message: 'Postcards from 2035 backend is running.' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Text that starts with = + - @ could run as a formula in Sheets, so it is stored as plain text.
function clean(v) {
  if (Array.isArray(v)) v = v.join('; ');
  if (v === null || v === undefined) return '';
  let s = String(v).slice(0, MAX_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function save(id, data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet();
    const row = [id, new Date()].concat(FIELDS.map(function (f) { return clean(data[f]); }));
    const last = sh.getLastRow();
    if (last > 1) {
      const ids = sh.getRange(2, 1, last - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (ids[i][0] === id) {
          sh.getRange(i + 2, 1, 1, row.length).setValues([row]);
          return;
        }
      }
    }
    sh.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function readAll() {
  const sh = sheet();
  const values = sh.getDataRange().getValues();
  const head = values.shift() || [];
  return values.map(function (r) {
    const o = {};
    head.forEach(function (h, i) {
      let v = r[i];
      if (v instanceof Date) v = v.toISOString();
      if (typeof v === 'string' && v.charAt(0) === "'") v = v.slice(1);
      o[h] = v;
    });
    return o;
  }).sort(function (a, b) { return String(b.updatedAt).localeCompare(String(a.updatedAt)); });
}
