const fs = require('fs');

async function run() {
    try {
        // Login
        const loginRes = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'tester@example.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        if (!loginData.token) {
            console.error('Login failed:', loginData);
            return;
        }
        console.log('Token obtained.');

        // Upload
        const formData = new FormData();
        formData.append('itemName', 'Kipas Angin');
        formData.append('borrowerName', 'Budi');
        formData.append('phoneNumber', '08123456789');
        formData.append('conditionNotes', 'Baru');

        const filePath = 'C:/Users/MyBook Hype AMD/.gemini/antigravity/brain/cba44558-9690-4f15-b5e0-ce91ddc0c1f4/uploaded_image_1763969955664.png';
        const fileBuffer = fs.readFileSync(filePath);
        const blob = new Blob([fileBuffer], { type: 'image/png' });
        formData.append('image', blob, 'uploaded_image_1763969955664.png');

        const res = await fetch('http://localhost:5000/api/lendings', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${loginData.token}` },
            body: formData
        });
        const text = await res.text();
        console.log('Response Status:', res.status);
        fs.writeFileSync('response.html', text);
        try {
            const data = JSON.parse(text);
            console.log('Upload Result:', data);
        } catch (e) {
            console.log('Failed to parse JSON. Saved response to response.html');
        }
    } catch (e) {
        console.error(e);
    }
}
run();
