// Test script to create a user via the live backend API
const testUserData = {
  uid: 'test-live-user-' + Date.now(),
  email: 'testuser@example.com',
  displayName: 'Test Live User',
  phoneNumber: '',
  emailVerified: true,
  photoURL: '',
  providerData: [{
    providerId: 'password',
    uid: 'testuser@example.com',
    displayName: 'Test Live User',
    email: 'testuser@example.com'
  }],
  authType: 'signup',
  lastSignInTime: new Date().toISOString()
};

const apiUrl = 'https://daliwebagencybackend.onrender.com';

async function createTestUser() {
  try {
    console.log('Creating test user with data:', testUserData);
    
    const response = await fetch(`${apiUrl}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUserData),
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Test user created successfully!');
      
      // Now fetch users to verify
      const getResponse = await fetch(`${apiUrl}/api/auth`);
      const users = await getResponse.json();
      console.log('\n📊 Current users in database:', users);
    } else {
      console.error('❌ Failed to create test user');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createTestUser();