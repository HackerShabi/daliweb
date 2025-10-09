// Test script to verify frontend authentication sends data to backend
const fetch = require('node-fetch');

// Simulate what the frontend sendUserDataToBackend function does
const testFrontendAuth = async () => {
  console.log('🧪 Testing Frontend Authentication Flow...');
  
  // Simulate user data that would come from Firebase Auth
  const mockFirebaseUser = {
    uid: 'frontend-test-' + Date.now(),
    email: 'frontendtest@daliweb.com',
    displayName: 'Frontend Test User',
    phoneNumber: '',
    emailVerified: true,
    photoURL: '',
    providerData: [{
      providerId: 'password',
      uid: 'frontendtest@daliweb.com',
      displayName: 'Frontend Test User',
      email: 'frontendtest@daliweb.com'
    }]
  };

  // Simulate the sendUserDataToBackend function
  const sendUserDataToBackend = async (user, authType) => {
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || '',
        providerData: user.providerData,
        authType,
        lastSignInTime: new Date().toISOString()
      };

      const apiUrl = 'https://daliwebagencybackend.onrender.com';
      console.log('📡 Sending user data to backend:', userData);
      
      const response = await fetch(`${apiUrl}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.text();
      console.log('\n✅ Backend Response:');
      console.log('Status:', response.status);
      console.log('Response:', result);

      if (!response.ok) {
        console.error('❌ Failed to send user data to backend:', result);
        return false;
      } else {
        console.log('✅ User data sent to backend successfully');
        return true;
      }
    } catch (error) {
      console.error('❌ Error sending user data to backend:', error);
      return false;
    }
  };

  // Test signup flow
  console.log('\n🔐 Testing Signup Flow...');
  const signupSuccess = await sendUserDataToBackend(mockFirebaseUser, 'signup');
  
  if (signupSuccess) {
    // Test login flow with same user
    console.log('\n🔑 Testing Login Flow...');
    await sendUserDataToBackend(mockFirebaseUser, 'login');
    
    // Test Google auth flow
    console.log('\n🌐 Testing Google Auth Flow...');
    const googleUser = {
      ...mockFirebaseUser,
      uid: 'google-test-' + Date.now(),
      email: 'googletest@daliweb.com',
      displayName: 'Google Test User',
      providerData: [{
        providerId: 'google.com',
        uid: 'googletest@daliweb.com',
        displayName: 'Google Test User',
        email: 'googletest@daliweb.com'
      }]
    };
    await sendUserDataToBackend(googleUser, 'google');
    
    // Verify users in database
    console.log('\n📊 Checking users in database...');
    try {
      const getResponse = await fetch('https://daliwebagencybackend.onrender.com/api/auth');
      const users = await getResponse.json();
      
      console.log('\n👥 Current users in database:');
      console.log(`Total users: ${users.total}`);
      users.users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.displayName || 'No Name'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   UID: ${user.uid}`);
        console.log(`   Auth Type: ${user.authType}`);
        console.log(`   Status: ${user.status}`);
      });
      
      console.log('\n🎉 Frontend authentication flow test completed!');
      console.log('✅ Users should now appear in admin panel at https://daliwebadmin.vercel.app');
    } catch (error) {
      console.error('❌ Error fetching users:', error);
    }
  }
};

testFrontendAuth();
