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

        // Get Lendings to find an ID
        const getRes = await fetch('http://localhost:5000/api/lendings', {
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        const lendings = await getRes.json();
        if (lendings.length === 0) {
            console.log('No lendings found to test update/delete.');
            return;
        }
        const item = lendings[0];
        console.log('Testing with item:', item._id, item.itemName);

        // Test Update
        console.log('Testing Update...');
        const updateRes = await fetch(`http://localhost:5000/api/lendings/${item._id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        console.log('Update Status:', updateRes.status);
        const updateData = await updateRes.json();
        console.log('Update Result:', updateData);

        // Test Delete
        console.log('Testing Delete...');
        const deleteRes = await fetch(`http://localhost:5000/api/lendings/${item._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        console.log('Delete Status:', deleteRes.status);
        const deleteData = await deleteRes.json();
        console.log('Delete Result:', deleteData);

    } catch (e) {
        console.error(e);
    }
}
run();
