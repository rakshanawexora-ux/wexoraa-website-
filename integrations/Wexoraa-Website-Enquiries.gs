/** Paste into the SAME Apps Script project as the previous form setup.
 * Run setupWebsiteEnquiries once, then Deploy > New deployment > Web app.
 * Execute as: Me. Access: Anyone. The private Sheet is never made public.
 */
function setupWebsiteEnquiries() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('WEXORAA_SHEET_ID');
  if (!id) {
    const book = SpreadsheetApp.create('Wexoraa Enquiries');
    id = book.getId();
    props.setProperty('WEXORAA_SHEET_ID', id);
  }
  const book = SpreadsheetApp.openById(id);
  let tab = book.getSheetByName('Website Enquiries');
  if (!tab) tab = book.insertSheet('Website Enquiries');
  if (!tab.getLastRow()) {
    tab.appendRow(['Received at','Name','Company','Email','Phone','Website','Service','Message / Business problem','Preferred contact','Source','Page','Score (self-reported)','Assessment answers','Consent','Request ID','Payload hash','Submitted at']);
    tab.setFrozenRows(1);
    tab.getRange(1,1,1,17).setFontWeight('bold').setBackground('#86C232');
  }
  console.log('PRIVATE SHEET: ' + book.getUrl());
  console.log('Setup complete. Deploy this project as a Web app, execute as Me, access Anyone.');
}
function doPost(e) {
  const json = obj => ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  let lock;
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw || raw.length > 16000) return json({accepted:false,error:'Invalid or oversized enquiry.'});
    const p = JSON.parse(raw);
    const text = (key,max,required) => {
      const value = typeof p[key] === 'string' ? p[key].trim() : '';
      if ((required && !value) || value.length > max) throw new Error('Please check your '+key+'.');
      return value;
    };
    const name=text('name',100,true), company=text('company',150,false), email=text('email',254,true), phone=text('phone',30,true);
    const website=text('website',300,false), interest=text('interest',120,true), message=text('message',5000,true), preferred=text('preferred',30,true);
    const source=text('source',60,true), page=text('page',300,true), requestId=text('requestId',80,true), submittedAt=text('submittedAt',60,true);
    if (name.length<2 || message.length<10 || phone.length<7 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[A-Za-z0-9-]{20,80}$/.test(requestId) || p.consent!==true || p.companyUrl) return json({accepted:false,error:'Please check your details and privacy consent.'});
    if (p.score!==null && (!Number.isInteger(p.score) || p.score<0 || p.score>100)) return json({accepted:false,error:'Invalid score.'});
    const answers=p.answers ? JSON.stringify(p.answers) : '';
    if(answers.length>6000) return json({accepted:false,error:'Assessment is too long.'});
    const bookId=PropertiesService.getScriptProperties().getProperty('WEXORAA_SHEET_ID');
    if (!bookId) return json({accepted:false,error:'Response storage is not configured.'});
    lock=LockService.getScriptLock();
    if(!lock.tryLock(10000)) return json({accepted:false,error:'Please retry in a moment.'});
    const tab=SpreadsheetApp.openById(bookId).getSheetByName('Website Enquiries');
    if(!tab) return json({accepted:false,error:'Please run setupWebsiteEnquiries first.'});
    const hash=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,raw).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('');
    if(tab.getLastRow()>1) {
      const found=tab.getRange(2,15,tab.getLastRow()-1,1).createTextFinder(requestId).matchEntireCell(true).findNext();
      if(found) return tab.getRange(found.getRow(),16).getValue()===hash ? json({accepted:true,requestId:requestId}) : json({accepted:false,error:'Request changed. Please reload and retry.'});
    }
    // Limited per-address burst protection, not a substitute for CAPTCHA at scale.
    const cache=CacheService.getScriptCache();
    const emailHash=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,email.toLowerCase()).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('');
    const count=Number(cache.get('burst:'+emailHash)||0);
    if(count>=5) return json({accepted:false,error:'Too many attempts. Please try again later.'});
    // Prefix potential formula cells so visitor input is stored as text.
    const safe=value => /^[=+@\-\t\r]/.test(String(value)) ? "'"+value : value;
    tab.appendRow([new Date(),name,company,email,phone,website,interest,message,preferred,source,page,p.score===null?'':p.score,answers,'Yes',requestId,hash,submittedAt].map(safe));
    SpreadsheetApp.flush();
    cache.put('burst:'+emailHash,String(count+1),600);
    return json({accepted:true,requestId:requestId});
  } catch (error) {
    return json({accepted:false,error:'Could not save your enquiry. Please check the form or try again later.'});
  } finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    service: 'Wexoraa website enquiries',
    configured: Boolean(PropertiesService.getScriptProperties().getProperty('WEXORAA_SHEET_ID'))
  })).setMimeType(ContentService.MimeType.JSON);
}
