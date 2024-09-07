function toggleForm() {
    const serviceType = document.getElementById('serviceType').value;
    document.getElementById('interCoolForm').style.display = serviceType === 'interCool' ? 'block' : 'none';
    document.getElementById('fruitDeliveryForm').style.display = serviceType === 'fruitDelivery' ? 'block' : 'none';
    document.getElementById('makesendForm').style.display = serviceType === 'makesend' ? 'block' : 'none';
}

function calculateShipping() {
    const serviceType = document.getElementById('serviceType').value;
    let shippingCost = 0;
    let resultText = '';

    if (serviceType === 'interCool') {
        const boxSize = document.getElementById('boxSize').value;
        const destination = document.getElementById('destination').value;

        if (boxSize === 'S1') {
            shippingCost = (destination === 'bangkok') ? 130 : (destination === 'central') ? 180 : 240;
        } else if (boxSize === 'S2') {
            shippingCost = (destination === 'bangkok') ? 150 : (destination === 'central') ? 210 : 260;
        } else if (boxSize === 'A1') {
            shippingCost = (destination === 'bangkok') ? 190 : (destination === 'central') ? 240 : 300;
        } else if (boxSize === 'A2') {
            shippingCost = (destination === 'bangkok') ? 220 : (destination === 'central') ? 270 : 330;
        } else if (boxSize === 'B1') {
            shippingCost = (destination === 'bangkok') ? 250 : (destination === 'central') ? 320 : 400;
        } else if (boxSize === 'B2') {
            shippingCost = (destination === 'bangkok') ? 290 : (destination === 'central') ? 380 : 460;
        }
        resultText = `ค่าจัดส่งสำหรับ ${boxSize} ไปยัง ${destination} คือ ${shippingCost} บาท`;

    } else if (serviceType === 'fruitDelivery') {
        const weight = parseInt(document.getElementById('weight').value);
        if (weight <= 3) shippingCost = 50;
        else if (weight === 4) shippingCost = 60;
        else if (weight === 5) shippingCost = 70;
        else if (weight === 6) shippingCost = 80;
        else if (weight === 7) shippingCost = 85;
        else if (weight === 8) shippingCost = 95;
        else if (weight === 9) shippingCost = 105;
        else if (weight === 10) shippingCost = 120;
        else if (weight <= 15) shippingCost = 165;
        else if (weight <= 20) shippingCost = 210;
        else if (weight <= 25) shippingCost = 230;
        else if (weight <= 30) shippingCost = 250;
        resultText = `ค่าจัดส่งสำหรับน้ำหนัก ${weight} กก. คือ ${shippingCost} บาท`;

    } else if (serviceType === 'makesend') {
        const parcelSize = document.getElementById('parcelSize').value;
        const makesendDestination = document.getElementById('makesendDestination').value;

        if (parcelSize === 'Envelope') {
            shippingCost = (makesendDestination === 'bangkok') ? 60 : (makesendDestination === 'metro') ? 80 : 0;
        } else if (parcelSize === 'S60') {
            shippingCost = (makesendDestination === 'bangkok') ? 80 : (makesendDestination === 'metro') ? 100 : (makesendDestination === 'coolBangkok') ? 120 : 140;
        } else if (parcelSize === 'S80') {
            shippingCost = (makesendDestination === 'bangkok') ? 100 : (makesendDestination === 'metro') ? 120 : (makesendDestination === 'coolBangkok') ? 140 : 170;
        } else if (parcelSize === 'S100') {
            shippingCost = (makesendDestination === 'bangkok') ? 120 : (makesendDestination === 'metro') ? 140 : (makesendDestination === 'coolBangkok') ? 170 : 190;
        } else if (parcelSize === 'S120') {
            shippingCost = (makesendDestination === 'bangkok') ? 140 : (makesendDestination === 'metro') ? 160 : (makesendDestination === 'coolBangkok') ? 190 : 210;
        } else if (parcelSize === 'S140') {
            shippingCost = (makesendDestination === 'bangkok') ? 160 : (makesendDestination === 'metro') ? 180 : (makesendDestination === 'coolBangkok') ? 210 : 230;
        } else if (parcelSize === 'S160') {
            shippingCost = (makesendDestination === 'bangkok') ? 180 : (makesendDestination === 'metro') ? 200 : (makesendDestination === 'coolBangkok') ? 230 : 250;
        } else if (parcelSize === 'S180') {
            shippingCost = (makesendDestination === 'bangkok') ? 200 : (makesendDestination === 'metro') ? 220 : (makesendDestination === 'coolBangkok') ? 250 : 260;
        } else if (parcelSize === 'S200') {
            shippingCost = (makesendDestination === 'bangkok') ? 240 : (makesendDestination === 'metro') ? 260 : 0;
        }
        resultText = `ค่าจัดส่งสำหรับ ${parcelSize} ไปยัง ${makesendDestination} คือ ${shippingCost} บาท`;

    } else {
        resultText = 'กรุณาเลือกบริการและขนาดที่ถูกต้อง';
    }

    document.getElementById('result').textContent = resultText;
}

function calculateVolume() {
    const width = parseFloat(document.getElementById('width').value);
    const length = parseFloat(document.getElementById('length').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(width) || isNaN(length) || isNaN(height) || width <= 0 || length <= 0 || height <= 0) {
        document.getElementById('volume-result').textContent = 'กรุณากรอกค่าที่ถูกต้องสำหรับกว้าง ยาว และสูง';
        return;
    }

    const volume = width * length * height;
    document.getElementById('volume-result').textContent = `ปริมาตรของกล่องคือ ${volume.toFixed(2)} ลูกบาศก์เซนติเมตร`;
}
