import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
          <h1 className="text-primary text-8xl font-black mb-2 opacity-30">Blog</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            This story <br /> 
            <span className="text-secondary">has not been written yet.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            The blog post you are looking for might have been moved, deleted, 
            or perhaps it never existed in this timeline. Lets get you back 
            to some better reading.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* ✅ Fixed: href added */}
            <Link  
              href="/blog"
              className="px-8 py-3 bg-primary text-primary font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              Back to Blog
            </Link>
            <Link 
              href="/" 
              className="px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-primary hover:text-emerald-600 hover:border-emerald-500 transition-all duration-300 text-center"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Right Side: Image/Illustration */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Decorative Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
            <div className="absolute -bottom-8 right-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
            
            {/* ✅ Added: 404 Illustration */}
            <div className="relative z-10">
              {/* Option 1: Use Image component */}
              <Image
                src="/not-added.png"
                alt="Blog not found illustration"
                width={400}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogNotFound;