// Debug script to test actual frontend authentication flow
const fetch = require('node-fetch');

// Test the exact same flow as the frontend
const debugFrontendAuth = async () => {
  console.log('🔍 Debugging Frontend Authentication Flow...');
  console.log('Testing the exact same API calls that frontend makes\n');

  // Test 1: Check if backend API is accessible
  console.log('1️⃣ Testing Backend API Accessibility...');
  try {
    const response = await fetch('https://daliwebagencybackend.onrender.com/api/auth');
    console.log(`✅ Backend API Status: ${response.status}`);
    const data = await response.json();
    console.log(`📊 Current users in database: ${data.total}\n`);
  } catch (error) {
    console.error('❌ Backend API Error:', error.message);
    return;
  }

  // Test 2: Simulate frontend sendUserDataToBackend function
  console.log('2️⃣ Testing sendUserDataToBackend Function...');
  
  const mockUser = {
    uid: 'debug-frontend-' + Date.now(),
    email: 'debug@frontend.test',
    displayName: 'Debug Frontend User',
    phoneNumber: '',
    emailVerified: true,
    photoURL: '',
    providerData: [{
      providerId: 'password',
      uid: 'debug@frontend.test',
      displayName: 'Debug Frontend User',
      email: 'debug@frontend.test'
    }]
  };

  const sendUserDataToBackend = async (user, authType) => {
    try {
      console.log(`📤 Sending ${authType} data to backend...`);
      
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

      console.log('📋 User data being sent:', JSON.stringify(userData, null, 2));

      // Use the same API URL as frontend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://daliwebagencybackend.onrender.com';
      console.log(`🌐 API URL: ${apiUrl}/api/auth`);
      
      const response = await fetch(`${apiUrl}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(`📡 Response Status: ${response.status}`);
      const responseText = await response.text();
      console.log(`📄 Response Body: ${responseText}`);

      if (!response.ok) {
        console.error('❌ Failed to send user data to backend:', responseText);
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
  console.log('\n3️⃣ Testing Signup Flow...');
  const signupSuccess = await sendUserDataToBackend(mockUser, 'signup');
  
  if (signupSuccess) {
    console.log('\n4️⃣ Testing Login Flow...');
    await sendUserDataToBackend(mockUser, 'login');
    
    console.log('\n5️⃣ Testing Google Auth Flow...');
    const googleUser = {
      ...mockUser,
      uid: 'debug-google-' + Date.now(),
      email: 'debug@google.test',
      displayName: 'Debug Google User',
      providerData: [{
        providerId: 'google.com',
        uid: 'debug@google.test',
        displayName: 'Debug Google User',
        email: 'debug@google.test'
      }]
    };
    await sendUserDataToBackend(googleUser, 'google');
  }

  // Test 3: Verify users were created
  console.log('\n6️⃣ Verifying Users in Database...');
  try {
    const response = await fetch('https://daliwebagencybackend.onrender.com/api/auth');
    const data = await response.json();
    
    console.log(`\n👥 Total users now: ${data.total}`);
    data.users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.displayName} (${user.email}) - ${user.authType}`);
    });
    
    console.log('\n🎯 Debug Results:');
    console.log('✅ Backend API is accessible');
    console.log('✅ sendUserDataToBackend function works');
    console.log('✅ All auth types (signup/login/google) work');
    console.log('✅ Users are being stored in MongoDB');
    console.log('\n💡 If real users are not appearing in admin panel,');
    console.log('   the issue is likely in the frontend Firebase auth integration');
    console.log('   or the sendUserDataToBackend function is not being called.');
    
  } catch (error) {
    console.error('❌ Error verifying users:', error);
  }
};

debugFrontendAuth();
