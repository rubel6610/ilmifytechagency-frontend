import React from "react";

const Careers = () => {
  return (
    <div className="max-w-400 mx-auto">
      <div className="flex justify-between px-8 ">
        <h3 className="text-secondary font-semibold text-2xl ">
          Total Jobs {" "}
          <span className="font-semibold text-lg">|
            53201<span>+ Vacancies</span>
          </span>
        </h3>
        <input
          className="rounded-md border-primary border w-74 h-10 px-4  focus:outline-none"
          type="search"
          name="job_search"
          id="job_search"
          placeholder="Search Vacancies"
        />
      </div>
    </div>
  );
};

export default Careers;
