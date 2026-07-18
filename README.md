# เว็บไซต์ลงทะเบียนเรียนคอร์ส Basic Audacity - Learn Thai with Air (LTWA)

โปรเจกต์นี้คือหน้า Landing Page ระดับพรีเมียมสำหรับประชาสัมพันธ์และรับสมัครผู้เรียนในคอร์สสอนใช้งานโปรแกรม Audacity ขั้นพื้นฐานของ **Learn Thai with Air (LTWA)** ที่พัฒนาขึ้นด้วยโครงสร้าง HTML, CSS, และ Javascript แบบ Single Page Application (SPA) ซึ่งโหลดได้รวดเร็ว ตอบสนองได้ทุกอุปกรณ์ (Responsive) และไม่มีค่าใช้จ่ายในการโฮสต์

---

## 🚀 ฟีเจอร์เด่นที่พัฒนาเสร็จสิ้น
1. **Premium & Responsive Design:** การออกแบบโทนสีสิริมงคลสไตล์หรูหรา (Royal Purple & Warm Gold) รองรับหน้าจอคอมพิวเตอร์ แท็บเล็ต และสมาร์ตโฟน
2. **Dynamic Seat Counter:** ระบบนับจำนวนที่นั่งที่ลดลงแบบไดนามิกจำลองสถานการณ์จำกัดที่นั่งเพื่อเพิ่มความตระหนักเร่งด่วนในการสมัครเรียน
3. **Interactive UI Components:**
   - ระบบ FAQ แบบขยาย/พับได้ (Accordion)
   - หลักสูตรการเรียนแบบ Timeline ที่แสดงผลเป็นโมดูลอย่างเป็นระเบียบ
   - แถบรีวิวสไลด์อัตโนมัติ (Testimonials Auto-play Carousel)
4. **Interactive Form Validation & Slip Upload:** 
   - แบบฟอร์มลงทะเบียนที่มีความคล่องตัว มีช่องตรวจสอบความถูกต้องของข้อมูล (Email, เบอร์โทร 9-10 หลัก)
   - ระบบลากและวางหลักฐานการโอนเงิน (Drag and Drop Slip Upload) พร้อมแสดงตัวอย่างรูปภาพสลิปทันที
5. **Local Database & CSV Export (Admin Panel):**
   - บันทึกข้อมูลผู้สมัครไว้ในเบราว์เซอร์อัตโนมัติ (`localStorage`) เพื่อทดสอบการทำงาน
   - **ทางเข้าลับ (Secret Admin):** สามารถกดลิงก์แผงควบคุมที่ด้านล่างสุดของหน้าจอ หรือ **คลิกติดต่อกัน 3 ครั้งที่โลโก้ด้านบน** เพื่อเปิดแผงควบคุมรายชื่อผู้สมัคร ซึ่งสามารถตรวจสอบข้อมูล, คลิกดูรูปภาพสลิปขนาดจริง, เคลียร์ข้อมูล หรือกดส่งออกรายงานเป็นไฟล์ Excel / CSV (รองรับภาษาไทย) ได้อย่างง่ายดาย

---

## 🛠️ วิธีการรันโปรเจกต์ภายในเครื่อง
คุณสามารถรันหน้าเว็บได้ทันทีโดยไม่ต้องทำการติดตั้งเซิร์ฟเวอร์หรือบิวด์ระบบเพิ่ม:
- เพียงดับเบิลคลิกเปิดไฟล์ `index.html` ผ่านเว็บบราวเซอร์ของคุณ (เช่น Google Chrome, Safari, Microsoft Edge)
- หน้าเว็บจะพร้อมทำงานและทดสอบกรอกข้อมูลสมัครเรียนได้เลยทันที!

---

## ☁️ แนะนำแนวทางการโฮสต์หน้าเว็บฟรี (Free Deployment)
คุณสามารถอัปโหลดโฟลเดอร์นี้เพื่อเปิดใช้งานออนไลน์ได้ฟรี 100% ผ่านแพลตฟอร์มยอดนิยม:
1. **GitHub Pages:** นำโค้ดขึ้น GitHub Repository จากนั้นไปตั้งค่าที่ Settings > Pages > เปิดใช้บริการใช้งานได้ทันที
2. **Netlify:** ลากและวาง (Drag & Drop) โฟลเดอร์ของโปรเจกต์นี้เข้าไปที่แผงควบคุมของ Netlify เพื่อออนไลน์เว็บไซต์ได้ภายใน 10 วินาที
3. **Vercel:** ใช้คำสั่ง `vercel` หรืออัปโหลดผ่านหน้าคอนโซลของ Vercel

---

## 📊 วิธีเชื่อมต่อระบบลงทะเบียนจริงเข้าสู่ Google Sheets
ตามแผนงานเดิมที่ใช้ **Google Forms + Google Sheets** เมื่อต้องการเชื่อมระบบส่งสลิปโอนเงินและการลงทะเบียนจริงจากหน้าเว็บนี้ไปบันทึกใน Google Sheets โดยตรงแบบฟรี สามารถเลือกทำได้ 2 วิธีดังนี้:

### วิธีที่ 1: การยิงข้อมูลตรงไปยัง Google Forms (ไม่ต้องเขียนเซิร์ฟเวอร์หลังบ้าน)
เป็นวิธีที่ง่ายที่สุดโดยหน้าเว็บจะยิงข้อมูลหลังบ้านไปยัง Google Form ที่เราสร้างไว้:

1. **สร้างแบบฟอร์มบน Google Forms** ให้มีช่องข้อมูลตรงกัน
2. **ค้นหาค่า Entry ID** ของช่องกรอกข้อมูลแต่ละช่องใน Google Form (โดยกดสิทธิ์ดูซอร์สโค้ดหน้าฟอร์ม ค้นหาคำว่า `entry.xxxxxxxxx`)
3. **ปรับเปลี่ยนโค้ดใน `app.js`** ในฟังก์ชันการส่งฟอร์ม (`regForm.addEventListener('submit')`) ให้เป็นการยิงคำขอ POST ข้อมูลไปยังฟอร์มหลักดังนี้:

```javascript
// ตัวอย่างการเชื่อมระบบยิงไปยัง Google Form
const formUrl = "https://docs.google.com/forms/d/e/[รหัสฟอร์มของคุณ]/formResponse";
const data = new URLSearchParams();

data.append("entry.111111111", registration.firstName);
data.append("entry.222222222", registration.lastName);
data.append("entry.333333333", registration.email);
data.append("entry.444444444", registration.phone);
data.append("entry.555555555", registration.lineId);
data.append("entry.666666666", registration.country);
data.append("entry.777777777", registration.learningGoals);

// สำหรับภาพสลิปโอนเงิน จำเป็นต้องแปลงเป็นข้อความ Base64 หรือลิงก์ที่อัปโหลดแยก
data.append("entry.888888888", registration.slipImage); 

fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: data
}).then(() => {
    // ดำเนินการต่อเมื่อบันทึกผลสำเร็จ
});
```

---

### วิธีที่ 2: ใช้ Google Apps Script (แนะนำ - สามารถเก็บสลิปใน Google Drive และลงข้อมูลใน Sheets ได้ดีที่สุด)
เนื่องจากการแนบรูปภาพสลิปลง Google Form ตรงๆ ผ่าน AJAX บนหน้าเว็บจะติดสิทธิ์ความปลอดภัย การเขียน Google Apps Script สั้นๆ เป็น Web App จะปลอดภัยและจัดการสลิปได้ยอดเยี่ยม:

1. **สร้าง Google Sheet** ใหม่เพื่อเป็นตารางเก็บรายชื่อ
2. ไปที่เมนู **ส่วนขยาย (Extensions) > Apps Script**
3. คัดลอกและวางโค้ดสคริปต์นี้ลงไป (โดยสคริปต์จะแปลงภาพ Base64 เป็นไฟล์ภาพเซฟลง Google Drive และเขียนแถวข้อมูลลง Sheet):

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // จัดการอัปโหลดรูปภาพสลิปลง Google Drive
    var folder = DriveApp.getFolderById("ใส่รหัสโฟลเดอร์ของGoogleDriveตรงนี้");
    var content = data.slipImage.split(",")[1];
    var contentType = data.slipImage.split(";")[0].split(":")[1];
    var blob = Utilities.newBlob(Utilities.base64Decode(content), contentType, "Slip_" + data.firstName + "_" + Date.now());
    var file = folder.createFile(blob);
    var fileUrl = file.getUrl(); // ลิงก์รูปภาพสลิปใน Drive
    
    // บันทึกข้อมูลลงตารางแถวถัดไป
    sheet.appendRow([
      new Date(),
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
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. กด **Deploy > New Deployment** เลือกชนิดเป็น **Web App**
5. ตั้งค่าการเข้าถึง (Who has access) เป็น **Anyone** และคลิก Deploy
6. คัดลอกลิงก์ Web App URL ที่ได้ไปแทนที่การบันทึก LocalStorage ในไฟล์ `app.js` ดังนี้:

```javascript
// ตัวอย่างการเรียกใช้งาน Apps Script Web App URL
fetch("ลิงก์_Web_App_URL_จาก_Apps_Script_ของคุณ", {
    method: "POST",
    body: JSON.stringify(registration)
})
.then(response => response.json())
.then(data => {
    if (data.result === 'success') {
        // ดำเนินการต่อเมื่อสมัครเรียนเสร็จสิ้น
    }
});
```

ด้วยสถาปัตยกรรมและการประสานงานแบบนี้ เว็บไซต์จะใช้งานได้อย่างสมบูรณ์และเปิดให้บริการได้ฟรีโดยไม่เสียค่าบำรุงรักษาแม้แต่บาทเดียว!
