'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                return to homepage
              </a>
            </p>
          </div>
          
          {/* Prominent Signup Button */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an account?
            </p>
            <Link 
              href={`/signup${callbackUrl !== '/' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-lg"
            >
              Create Account
            </Link>
          </div>
          
          <div className="flex justify-center">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                  card: 'shadow-lg',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden'
                }
              }}
              redirectUrl={callbackUrl}
              signUpUrl={`/signup${callbackUrl !== '/' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;