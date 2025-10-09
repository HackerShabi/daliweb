// Direct test of backend API to see if it's working
const fetch = require('node-fetch');

const testBackendDirect = async () => {
  console.log('🔍 Testing Backend API Directly...');
  
  const apiUrl = 'https://daliwebagencybackend.onrender.com';
  
  // Test 1: Check if backend is accessible
  console.log('\n1️⃣ Testing Backend Accessibility...');
  try {
    const response = await fetch(`${apiUrl}/api/auth`);
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log(`Current users: ${data.total}`);
    console.log('✅ Backend is accessible\n');
  } catch (error) {
    console.error('❌ Backend not accessible:', error.message);
    return;
  }
  
  // Test 2: Test POST request (same as frontend)
  console.log('2️⃣ Testing POST Request...');
  const testUser = {
    uid: 'test-direct-' + Date.now(),
    email: 'test@direct.com',
    displayName: 'Direct Test User',
    phoneNumber: '',
    emailVerified: true,
    photoURL: '',
    providerData: [{
      providerId: 'password',
      uid: 'test@direct.com',
      displayName: 'Direct Test User',
      email: 'test@direct.com'
    }],
    authType: 'signup',
    lastSignInTime: new Date().toISOString()
  };
  
  try {
    console.log('📤 Sending POST request...');
    console.log('Data:', JSON.stringify(testUser, null, 2));
    
    const response = await fetch(`${apiUrl}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    
    console.log(`\n📡 Response Status: ${response.status}`);
    const responseText = await response.text();
    console.log(`📄 Response Body: ${responseText}`);
    
    if (response.ok) {
      console.log('✅ POST request successful');
    } else {
      console.log('❌ POST request failed');
    }
  } catch (error) {
    console.error('❌ POST request error:', error.message);
  }
  
  // Test 3: Check if user was created
  console.log('\n3️⃣ Checking if user was created...');
  try {
    const response = await fetch(`${apiUrl}/api/auth`);
    const data = await response.json();
    
    console.log(`\nTotal users now: ${data.total}`);
    const directTestUser = data.users.find(u => u.email === 'test@direct.com');
    
    if (directTestUser) {
      console.log('✅ User was created successfully!');
      console.log('User details:', JSON.stringify(directTestUser, null, 2));
    } else {
      console.log('❌ User was NOT created');
    }
    
    console.log('\n👥 All users in database:');
    data.users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.displayName} (${user.email}) - ${user.authType}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  }
  
  console.log('\n🎯 Test Results:');
  console.log('If this test works but frontend doesn\'t, the issue is:');
  console.log('1. Frontend sendUserDataToBackend is not being called');
  console.log('2. Frontend has CORS issues');
  console.log('3. Frontend environment variables are wrong');
  console.log('4. Frontend network/firewall blocking requests');
};

testBackendDirect();
