'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const SyncUser = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const syncUserToBackend = async () => {
      if (!isSignedIn || !user || !isLoaded) return;

      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.id, // Clerk user ID as uid
            email: user.primaryEmailAddress?.emailAddress,
            displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
            phoneNumber: user.primaryPhoneNumber?.phoneNumber || '',
            emailVerified: user.primaryEmailAddress?.verification?.status === 'verified',
            photoURL: user.imageUrl || '',
            providerData: [{
              providerId: 'clerk',
              uid: user.id,
              displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
              email: user.primaryEmailAddress?.emailAddress
            }],
            authType: 'clerk',
            lastSignInTime: user.lastSignInAt ? new Date(user.lastSignInAt).toISOString() : new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to sync user to backend:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
        } else {
          const result = await response.text();
          console.log('User synced successfully to backend:', result);
        }
      } catch (error) {
        console.error('Error syncing user to backend:', error);
      }
    };

    syncUserToBackend();
  }, [isSignedIn, user, isLoaded]);

  return null; // This component doesn't render anything
};

export default SyncUser;