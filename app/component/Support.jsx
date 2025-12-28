import Image from 'next/image';
import CustomBorder from './customBorder/CustomBorder';

const Support = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-400 mx-auto flex flex-col-reverse xl:flex-row items-center gap-12">
        
        {/* Left Side: Content */}
        <div className="w-full xl:w-1/2 order-2 xl:order-1">
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              With <span className="text-[#00D9A6]">Live Chat</span> <br />
              <span className='text-[#00D9A6]'>24/7</span> Support
            </h2>
            <CustomBorder/>
          </div>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              At iLMIFY, we understand that exceptional customer service is crucial to building trust 
              and long-lasting relationships. That’s why we offer Live Chat and 24/7 Support to 
              ensure your needs are met at any time, day or night.
            </p>
            <p>
              Our dedicated support team is always ready to assist you with any questions, concerns, 
              or technical issues you may have. Whether you need real-time help with navigating your 
              website, troubleshooting, or getting advice on our services, our live chat feature 
              ensures you’ll never have to wait long for assistance.
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full xl:w-1/2 order-1 xl:order-2 flex justify-center">
          <div className="relative w-full h-[300px] md:h-[450px]">
            {/* Replace 'support-team.png' with your actual image path */}
            <Image
              src="/WeLove.jpg" 
              alt="Support Team Illustration"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Support;