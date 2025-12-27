"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import CustomBorder from "./customBorder/CustomBorder";

function Counter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}


export default function WeLoveWhatWeDo() {
  return (
    <section className="w-full bg-white py-40">
      <div className="max-w-400 mx-auto px-4">
        <div className="flex flex-col lg:flex-row relative gap-10 items-stretch">

          {/* LEFT CARD */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-105 flex items-center justify-center w-full lg:w-[60%] z-10">
            
            {/* Background Image */}
            <Image
              src="/WeLove.jpg" // 🔁 replace later
              alt="Team"
              fill
              priority
              className="object-cover"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-green-400/40 to-emerald-600/90"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center px-6 md:px-14">
              <h2 className="text-5xl md:text-6xl font-bold">
                <Counter end={500} suffix="+" />
              </h2>

              <p className="uppercase tracking-widest mt-2 text-sm">
                Projects
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-3xl font-semibold">
                    +<Counter end={3500} />
                  </h3>
                  <p className="text-sm opacity-90 mt-1">
                    Users' Comments
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">
                    <Counter end={100} suffix="%" />
                  </h3>
                  <p className="text-sm opacity-90 mt-1">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 h-full relative z-20 w-full lg:w-[50%] lg:ml-[-10%] mt-[-50px] lg:mt-0 top-[70px]">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900">
              We <span className="text-green-500">Love</span> What <br />
              We Do
            </h2>

            <CustomBorder/>

            <p className="text-gray-600 mt-6 leading-relaxed">
              At LIMIFY, passion drives everything we do. We're not just
              about building websites or developing digital solutions—we're
              about creating meaningful experiences that make a real impact.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Custom Web Design & Development",
                "UI/UX Design",
                "Mobile App Development",
                "Digital Marketing & SEO",
                "E-Commerce Solutions",
                "CMS Solutions",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 text-lg" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
