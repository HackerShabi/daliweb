// Test script to simulate real user registration through frontend flow
const realUserData = {
  uid: 'real-user-' + Date.now(),
  email: 'realuser@daliweb.com',
  displayName: 'Real User Test',
  phoneNumber: '',
  emailVerified: true,
  photoURL: '',
  providerData: [{
    providerId: 'password',
    uid: 'realuser@daliweb.com',
    displayName: 'Real User Test',
    email: 'realuser@daliweb.com'
  }],
  authType: 'signup',
  lastSignInTime: new Date().toISOString()
};

const apiUrl = 'https://daliwebagencybackend.onrender.com';

async function createRealUser() {
  try {
    console.log('🚀 Creating real user through frontend flow...');
    console.log('User data:', realUserData);
    
    const response = await fetch(`${apiUrl}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(realUserData),
    });

    const result = await response.text();
    console.log('\n📡 Backend Response:');
    console.log('Status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('\n✅ Real user created successfully!');
      
      // Fetch all users to verify
      console.log('\n📊 Fetching all users from admin API...');
      const getResponse = await fetch(`${apiUrl}/api/auth`);
      const users = await getResponse.json();
      
      console.log('\n👥 Current users in database:');
      console.log(`Total users: ${users.total}`);
      users.users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.displayName || 'No Name'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   UID: ${user.uid}`);
        console.log(`   Auth Type: ${user.authType}`);
        console.log(`   Status: ${user.status}`);
        console.log(`   Created: ${user.creationTime}`);
      });
      
      console.log('\n🎉 Authentication flow verified! Users should now appear in admin panel.');
    } else {
      console.error('❌ Failed to create real user');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createRealUser();
