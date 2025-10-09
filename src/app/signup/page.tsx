'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                return to homepage
              </a>
            </p>
          </div>
          <div className="flex justify-center">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                  card: 'shadow-lg',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden'
                }
              }}
              redirectUrl={callbackUrl}
              signInUrl={`/login${callbackUrl !== '/' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;