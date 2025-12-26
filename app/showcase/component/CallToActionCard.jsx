const CallToActionCard = () => {
  return (
    <div className="w-full px-4">
      <div
        className="
          max-w-365
          mx-auto
          rounded-2xl
          bg-linear-to-r
          from-[#0ddaa0]
          to-[#8ce064]
          py-20
          px-6
          flex
          flex-col
          items-center
          text-center
          text-white
          shadow-xl shadow-green-300/30 
        "
      >
        {/* Small Heading */}
        <p className="text-sm md:text-base opacity-90 mb-3">
          What Are You Waiting for?
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold mb-10">
          Let&apos;s Talk About Work
        </h2>

        {/* Button */}
        <button
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            text-sm
            tracking-wide
            hover:scale-105
            transition-transform
            duration-300
            shadow-xl
          "
        >
          START NOW
        </button>
      </div>
    </div>
  );
};

export default CallToActionCard;
