// ฟังก์ชันคำนวณกำไรจากเปอร์เซ็นต์ (เดิม)
function calculateProfit() {
    const productName = document.getElementById('productName').value;
    const brandName = document.getElementById('brandName').value;
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const weightOrQuantity = parseFloat(document.getElementById('weightOrQuantity').value);
    const desiredProfit = parseFloat(document.getElementById('desiredProfit').value);

    if (!productName || !costPrice || !weightOrQuantity || !desiredProfit) {
        alert('กรุณากรอกข้อมูลให้ครบ');
        return;
    }
    const sellingPriceBox = costPrice * (1 + desiredProfit / 100);
    const sellingPriceUnit = sellingPriceBox / weightOrQuantity;
 // เพิ่มหรือแก้ไขข้อมูลใน LocalStorage
 addOrUpdateFruitData(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit);

 // แสดงเฉพาะผลลัพธ์การคำนวณจากเปอร์เซ็นต์
 displayPercentageData(); // ฟังก์ชันนี้จะแสดงผลในตารางผลลัพธ์การคำนวณจากเปอร์เซ็นต์
}

// ฟังก์ชันใหม่สำหรับคำนวณกำไรจากจำนวนเงิน
function calculateProfitWithFixedAmount() {
    const productName = document.getElementById('productName').value;
    const brandName = document.getElementById('brandName').value;
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const weightOrQuantity = parseFloat(document.getElementById('weightOrQuantity').value);
    const fixedProfit = parseFloat(document.getElementById('fixedProfit').value);

    if (!productName || !costPrice || !weightOrQuantity || !fixedProfit) {
        alert('กรุณากรอกข้อมูลให้ครบ');
        return;
    }

    const sellingPriceBox = costPrice + fixedProfit;
    const sellingPriceUnit = sellingPriceBox / weightOrQuantity;

    // เพิ่มหรือแก้ไขข้อมูลใน LocalStorage
    addOrUpdateFruitData(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit);

    // แสดงผลเฉพาะในตารางยอดเงิน
    displayFruitData(); // อัปเดตผลลัพธ์การคำนวณยอดเงินเท่านั้น
}
function calculateProfit() {
    const productName = document.getElementById('productName').value;
    const brandName = document.getElementById('brandName').value;
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const weightOrQuantity = parseFloat(document.getElementById('weightOrQuantity').value);
    const desiredProfit = parseFloat(document.getElementById('desiredProfit').value);

    if (!productName || !costPrice || !weightOrQuantity || !desiredProfit) {
        alert('กรุณากรอกข้อมูลให้ครบ');
        return;
    }

    const sellingPriceBox = costPrice * (1 + desiredProfit / 100);
    const sellingPriceUnit = sellingPriceBox / weightOrQuantity;

    // เพิ่มหรือแก้ไขข้อมูลใน LocalStorage
    addOrUpdateFruitData(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit);

    // แสดงผลเฉพาะในตารางเปอร์เซ็นต์
    displayPercentageData(); // อัปเดตผลลัพธ์การคำนวณจากเปอร์เซ็นต์เท่านั้น
}

function displayResultWithFixedAmount(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit) {
    const resultTable = document.getElementById('resultTableFixed');
    const resultBody = document.getElementById('resultBodyFixed');

    // คำนวณกำไร
    const profitAmount = sellingPriceBox - costPrice; // กำไร = ราคาขาย - ราคาต้นทุน
    const profitPercentage = (profitAmount / costPrice) * 100; // คำนวณกำไรเป็นเปอร์เซ็นต์

    if (resultBody && resultTable) {
        resultBody.innerHTML += `
            <tr>
                <td>${productName}</td>
                <td>${brandName || '-'}</td>
                <td>${costPrice.toFixed(2)}</td>
                <td>${sellingPriceBox.toFixed(2)}</td>
                <td>${sellingPriceUnit.toFixed(2)}</td>
                <td>${profitAmount.toFixed(2)}</td>
                <td>${profitPercentage.toFixed(2)}%</td> <!-- แสดงกำไรเป็นเปอร์เซ็นต์ -->
            </tr>
        `;
        resultTable.style.display = 'table'; // แสดงตาราง
    } else {
        console.error("ไม่พบ element สำหรับแสดงผลลัพธ์");
    }
}

function displayResultWithPercentage(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit) {
    const resultTable = document.getElementById('resultTablePercentage');
    const resultBody = document.getElementById('resultBodyPercentage');
    
    resultBody.innerHTML += `
        <tr>
            <td>${productName}</td>
            <td>${brandName || '-'}</td>
            <td>${costPrice.toFixed(2)}</td>
            <td>${sellingPriceBox.toFixed(2)}</td>
            <td>${sellingPriceUnit.toFixed(2)}</td>
        </tr>
    `;
    
    resultTable.style.display = 'table';
}
// บันทึกข้อมูลใน LocalStorage
function saveToLocalStorage(data) {
    localStorage.setItem('fruitData', JSON.stringify(data)); // แปลงข้อมูลเป็น JSON และบันทึกลง LocalStorage
}

// โหลดข้อมูลจาก LocalStorage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem('fruitData');
    return storedData ? JSON.parse(storedData) : []; // ถ้ามีข้อมูลใน LocalStorage ให้แปลงจาก JSON กลับมาใช้
}

function addOrUpdateFruitData(productName, brandName, costPrice, sellingPriceBox, sellingPriceUnit) {
    let fruitData = loadFromLocalStorage();

    // ตรวจสอบว่ามีรายการที่ชื่อผลไม้และยี่ห้อตรงกันหรือไม่
    let found = false;
    for (let i = 0; i < fruitData.length; i++) {
        if (fruitData[i].productName === productName && fruitData[i].brandName === brandName) {
            // ถ้าชื่อผลไม้และยี่ห้อตรงกัน ให้แก้ไขรายการนั้น
            fruitData[i].costPrice = costPrice;
            fruitData[i].sellingPriceBox = sellingPriceBox;
            fruitData[i].sellingPriceUnit = sellingPriceUnit;
            found = true;
            break;
        }
    }

    // ถ้าไม่พบรายการเดิม ให้เพิ่มรายการใหม่
    if (!found) {
        fruitData.push({
            productName: productName,
            brandName: brandName,
            costPrice: costPrice,
            sellingPriceBox: sellingPriceBox,
            sellingPriceUnit: sellingPriceUnit
        });
    }

    // บันทึกข้อมูลใหม่กลับไปยัง LocalStorage
    saveToLocalStorage(fruitData);

    // แสดงข้อมูลในตาราง
    displayFruitData();
    displayPercentageData();
}

function displayFruitData() {
    const resultTable = document.getElementById('resultTableFixed');
    const resultBody = document.getElementById('resultBodyFixed');
    const fruitData = loadFromLocalStorage();

    // ล้างข้อมูลในตารางก่อน
    resultBody.innerHTML = '';

    // แสดงข้อมูลที่เก็บไว้ใน LocalStorage
    fruitData.forEach((data, index) => {
        const profitAmount = data.sellingPriceBox - data.costPrice;
        const profitPercentage = (profitAmount / data.costPrice) * 100;

        resultBody.innerHTML += `
            <tr>
                <td>${data.productName}</td>
                <td>${data.brandName || '-'}</td>
                <td>${data.costPrice.toFixed(2)}</td>
                <td>${data.sellingPriceBox.toFixed(2)}</td>
                <td>${data.sellingPriceUnit.toFixed(2)}</td>
                <td>${profitAmount.toFixed(2)}</td>
                <td>${profitPercentage.toFixed(2)}%</td>
                <td><button onclick="deleteRow(${index})">ลบ</button></td>
            </tr>
        `;
    });

    resultTable.style.display = 'table'; // แสดงตาราง
}
function displayPercentageData() {
    const resultTable = document.getElementById('resultTablePercentage');
    const resultBody = document.getElementById('resultBodyPercentage');
    const fruitData = loadFromLocalStorage();

    // ล้างข้อมูลในตารางก่อน
    resultBody.innerHTML = '';

    // แสดงข้อมูลที่เก็บไว้ใน LocalStorage
    fruitData.forEach((data, index) => {
        resultBody.innerHTML += `
            <tr>
                <td>${data.productName}</td>
                <td>${data.brandName || '-'}</td>
                <td>${data.costPrice.toFixed(2)}</td>
                <td>${data.sellingPriceBox.toFixed(2)}</td>
                <td>${data.sellingPriceUnit.toFixed(2)}</td>
            </tr>
        `;
    });

    resultTable.style.display = 'table'; // แสดงตาราง
}

window.onload = function() {
    displayFruitData(); // โหลดข้อมูลที่เก็บไว้และแสดงในตารางเมื่อหน้าเว็บถูกโหลด
};

function deleteRow(index) {
    let fruitData = loadFromLocalStorage();

    // ลบรายการที่ตำแหน่ง index ออกจาก array
    fruitData.splice(index, 1);

    // บันทึกข้อมูลใหม่กลับไปที่ LocalStorage
    saveToLocalStorage(fruitData);

    // อัปเดตตารางใหม่
    displayFruitData();
    displayPercentageData(); // อัปเดตทั้งตารางยอดเงินและตารางเปอร์เซ็นต์
}

function editRow(index) {
    let fruitData = loadFromLocalStorage();
    const data = fruitData[index];

    // ใส่ข้อมูลจากแถวที่เลือกลงในฟอร์ม
    document.getElementById('productName').value = data.productName;
    document.getElementById('brandName').value = data.brandName;
    document.getElementById('costPrice').value = data.costPrice;
    document.getElementById('weightOrQuantity').value = data.sellingPriceUnit; // สมมติว่าน้ำหนัก/จำนวน = หน่วยขาย
    document.getElementById('fixedProfit').value = (data.sellingPriceBox - data.costPrice); // กำไรที่คำนวณได้

    // ลบรายการนั้นออกเพื่อให้แก้ไขใหม่ได้
    fruitData.splice(index, 1);

    // บันทึกการลบรายการเก่ากลับไปที่ LocalStorage
    saveToLocalStorage(fruitData);

    // อัปเดตตาราง
    displayFruitData();
}

