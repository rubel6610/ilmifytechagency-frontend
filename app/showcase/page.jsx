import React from "react";
import Cards from "./component/Cards";


const Showcase = () => {
  return (
    <div className="max-w-8xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-44 md:pb-34 md:pt-70  ">
        <div>
          <h1 className="font-semibold text-3xl mb-10 md:mb-0 md:text-5xl tracking-wide leading-10 md:leading-14 ">Our recent <span className="text-primary">web designs</span> & <br /> some examples of <br /> past <span className="text-primary">projects</span> </h1>
        </div>
        <div className="opacity-80 md:text-lg">
          <p>At iLMiFY, we take pride in delivering modern, responsive, and user-friendly web designs that reflect the unique identity of each business. Our recent projects showcase our expertise in creating visually appealing websites that engage users and drive results.</p>
          <br />
          <p>From e-commerce platforms to corporate websites, our portfolio highlights a diverse range of successful projects. Each one demonstrates our commitment to innovation, functionality, and client satisfaction. Explore our work and see how we’ve helped businesses grow and succeed online.</p>
        </div>
      </div>

      {/* card */}
      <Cards />
    </div>

  );
};

export default Showcase;
