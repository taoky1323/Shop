function formatAddress() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputDiv = document.getElementById('output');
    const errorDiv = document.getElementById('error');
    outputDiv.textContent = '';
    errorDiv.textContent = '';

    if (!inputText) {
        errorDiv.textContent = 'กรุณากรอกข้อมูลที่อยู่ก่อนทำการจัดเรียง';
        return;
    }

    const lines = inputText.split('\n'); // แยกบรรทัดจากข้อมูลที่ป้อน
    let formattedOutput = '';
    let hasError = false;

    lines.forEach((line, index) => {
        if (line.trim() === '') return; // ข้ามบรรทัดที่ว่าง

        const match = line.match(/^(.*?)\s*(หมู่\s*\d+)?\s*(\d+\/\d+|\d+)?\s*(ต\.|ตำบล\s*)(.*?)\s*(อ\.|อำเภอ\s*)(.*?)\s*(จ\.|จังหวัด\s*)(.*?)\s*(\d{5})\s*(\d{10})\s*(.*)$/);
        
        if (match) {
            let [
                , // ไม่ใช้
                name,
                village,
                houseNumber,
                subDistrictPrefix,
                subDistrict,
                districtPrefix,
                district,
                provincePrefix,
                province,
                postalCode,
                phoneNumber,
                note
            ] = match;

            // ตรวจสอบและปรับแต่งชื่อพื้นที่
            if (province.trim() === "กรุงเทพ" || province.trim() === "กรุงเทพมหานคร") {
                subDistrict = `แขวง${subDistrict.trim()}`;
                district = `เขต${district.trim()}`;
                province = 'กรุงเทพมหานคร';
            } else {
                subDistrict = `ตำบล${subDistrict.trim()}`;
                district = `อำเภอ${district.trim()}`;
                province = `จังหวัด${province.trim()}`;
            }

            formattedOutput += `ผู้รับ: ${name.trim()}\n`;
            if (village) {
                formattedOutput += `หมู่บ้าน: ${village.trim()} `;
            }
            if (houseNumber) {
                formattedOutput += `บ้านเลขที่: ${houseNumber.trim()}\n`;
            } else {
                formattedOutput += `บ้านเลขที่: ไม่ระบุ\n`;
            }
            formattedOutput += `${subDistrict} ${district} ${province}\n`;
            formattedOutput += `รหัสไปรษณีย์: ${postalCode}\n`;
            formattedOutput += `เบอร์โทรติดต่อ: ${phoneNumber}\n`;
            if (note.trim()) {
                formattedOutput += `หมายเหตุ: ${note.trim()}\n`;
            }
            formattedOutput += '\n';
        } else {
            formattedOutput += `บรรทัดที่ ${index + 1}: รูปแบบที่อยู่ไม่ถูกต้อง\n\n`;
            hasError = true;
        }
    });

    outputDiv.textContent = formattedOutput.trim();

    if (hasError) {
        errorDiv.textContent = 'บางบรรทัดมีรูปแบบที่อยู่ไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง';
    }
}

function saveAsImage() {
    const outputDiv = document.getElementById('output');

    // ใช้ html2canvas เพื่อแปลง div เป็นรูปภาพ
    html2canvas(outputDiv, { scale: 3 }).then(canvas => {
        // สร้างลิงก์เพื่อดาวน์โหลดภาพ
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'label.png';
        link.click();
    });
}
