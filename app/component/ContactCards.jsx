import React from "react";

const ContactCards = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 xl:grid-cols-2 px-3.75 md:px-13.75 xl:px-8.75 xl:gap-6 items-stretch max-w-400 mx-auto">
        {/* Left Card - Dark */}
        <div className="bg-linear-to-r from-[#5a5757] to-[#111111] text-white rounded-xl px-3.75 pt-18 pb-13 flex flex-col items-center text-center justify-center shadow-2xl xl:h-87.25">
          <p className="text-white/50 text-[17px] font-medium mb-1.25">
            Are You Ready?
          </p>
          <div className="text-[39px] md:text-4xl font-bold mb-6 md:flex">
            <div className="mr-2">Start a New</div> <div>Project</div>
          </div>
          <p className="text-gray-300 text-[16px] md:text-base leading-relaxed px-6 w-93.5">
            We'd love to hear from you! Whether you're ready to start a project,
            have questions about our services, or just want to say hello, our
            team at iLMiFY is here to help.
          </p>
        </div>

        {/* Right Card - Gradient */}
        <div className="bg-linear-to-r from-[#00D9A5] to-[#8FE481] mt-15 lg:mt-16 xl:mt-0 shadow-[10px_10px_20px_rgba(16,185,129,0.4)] text-white rounded-xl pt-15 pb-10 flex flex-col items-center text-center justify-center relative overflow-hidden xl:h-87.25">
          <p className="text-white/50 text-[17px] font-medium mb-1.25">
            What Are You Waiting for?
          </p>
          <div className="text-[39px] md:text-4xl font-bold mb-6 md:flex">
            <div className="mr-2">Lets Talk About</div> <div>Work</div>
          </div>

          <button className="bg-[#222] hover:bg-black text-white text-xs font-bold mt-8 py-4 px-10 rounded-full uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
