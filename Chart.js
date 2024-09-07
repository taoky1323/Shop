const ctx = document.getElementById('profitChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar', // เปลี่ยนเป็น 'line', 'pie' หรือ 'doughnut' ตามความต้องการ
    data: {
        labels: ['สินค้า 1', 'สินค้า 2', 'สินค้า 3'], // กำหนดตามสินค้าที่บันทึก
        datasets: [{
            label: 'กำไร',
            data: [1200, 1500, 1800], // กำหนดตามข้อมูลที่มี
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
