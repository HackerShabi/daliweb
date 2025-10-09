'use client';

import { useState } from 'react';
import { useUser, useAuth, SignInButton, SignOutButton } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';

const TestAuthPage = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  const sendUserDataToBackend = async () => {
    if (!isSignedIn || !user) {
      addLog('❌ User not signed in');
      return;
    }

    addLog(`🚀 sendUserDataToBackend called with Clerk user: ${user.id}, ${user.primaryEmailAddress?.emailAddress}`);
    
    try {
      const token = await getToken();
      
      const userData = {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
        authType: 'clerk'
      };

      addLog(`📤 Sending user data: ${JSON.stringify(userData, null, 2)}`);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://daliwebagencybackend.onrender.com';
      addLog(`🌐 API URL: ${apiUrl}/api/auth`);
      
      const response = await fetch(`${apiUrl}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });

      addLog(`📡 Backend response status: ${response.status}`);
      const responseText = await response.text();
      addLog(`📄 Backend response: ${responseText}`);

      if (response.ok) {
        addLog('✅ User data sent to backend successfully!');
      } else {
        addLog(`❌ Failed to send user data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      addLog(`❌ Error sending user data to backend: ${error}`);
      console.error('Error:', error);
    }
  };

  const testClerkAuth = async () => {
    setIsLoading(true);
    addLog('🔄 Testing Clerk authentication...');
    
    try {
      if (isSignedIn && user) {
        addLog(`✅ User is signed in: ${user.primaryEmailAddress?.emailAddress}`);
        addLog(`👤 User ID: ${user.id}`);
        addLog(`📧 Email: ${user.primaryEmailAddress?.emailAddress}`);
        addLog(`👤 Name: ${user.firstName} ${user.lastName}`);
        addLog(`🖼️ Image: ${user.imageUrl}`);
        
        // Test getting auth token
        try {
          const token = await getToken();
          addLog(`🔑 Auth token obtained: ${token ? 'Yes' : 'No'}`);
          if (token) {
            addLog(`🔑 Token preview: ${token.substring(0, 20)}...`);
          }
        } catch (tokenError) {
          addLog(`❌ Error getting token: ${tokenError}`);
        }
        
        await sendUserDataToBackend();
      } else {
        addLog('❌ User is not signed in');
      }
    } catch (error) {
      addLog(`❌ Error during auth test: ${error}`);
      console.error('Auth test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isLoaded) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading authentication...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Clerk Authentication Test</h1>
            
            {/* Auth Status */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
              <div className="space-y-2">
                <p><strong>Signed In:</strong> {isSignedIn ? '✅ Yes' : '❌ No'}</p>
                {isSignedIn && user && (
                  <>
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                    <p><strong>Last Sign In:</strong> {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'N/A'}</p>
                  </>
                )}
              </div>
            </div>

            {/* Auth Actions */}
            <div className="mb-8 space-y-4">
              <h2 className="text-xl font-semibold">Authentication Actions</h2>
              <div className="flex flex-wrap gap-4">
                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                ) : (
                  <SignOutButton>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      Sign Out
                    </button>
                  </SignOutButton>
                )}
                
                <button
                  onClick={testClerkAuth}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {isLoading ? 'Testing...' : 'Test Auth & Backend Sync'}
                </button>
                
                <button
                  onClick={clearLogs}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Clear Logs
                </button>
              </div>
            </div>

            {/* Logs */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Test Logs</h2>
              <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-500">No logs yet. Click "Test Auth & Backend Sync" to start testing.</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Test Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>Click "Sign In" to authenticate with Clerk</li>
                <li>Once signed in, click "Test Auth & Backend Sync" to test the integration</li>
                <li>Check the logs to see the authentication flow and backend communication</li>
                <li>Verify that user data is properly synced with the backend</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestAuthPage;