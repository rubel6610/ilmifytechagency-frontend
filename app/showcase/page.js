import React from "react";

const Showcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-50 max-w-7xl mx-auto ">
      <div>
        <h1 className="font-semibold text-5xl ">Our recent <span className="text-primary">web designs</span> & <br/> some examples of <br/> past <span className="text-primary">projects</span> </h1>
      </div> 
      <div className="">
        <p>At iLMiFY, we take pride in delivering modern, responsive, and user-friendly web designs that reflect the unique identity of each business. Our recent projects showcase our expertise in creating visually appealing websites that engage users and drive results.</p>
        <br/>
        <p>From e-commerce platforms to corporate websites, our portfolio highlights a diverse range of successful projects. Each one demonstrates our commitment to innovation, functionality, and client satisfaction. Explore our work and see how we’ve helped businesses grow and succeed online.</p>
      </div>
    </div>
  );
};

export default Showcase;
