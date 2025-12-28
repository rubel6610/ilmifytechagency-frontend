"use client";

import { useState } from "react";

export default function PostJobPage() {
  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "",
    vacancy: "",
    age: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posted Job:", job);
    alert("Job posted (demo)");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-slate-800">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Job Title"
          className="input"
          onChange={handleChange}
        />

        <input
          name="companyName"
          placeholder="Company Name"
          className="input"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Job Location"
          className="input"
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="vacancy"
            placeholder="Vacancy"
            className="input"
            onChange={handleChange}
          />
          <input
            name="age"
            placeholder="Age Limit"
            className="input"
            onChange={handleChange}
          />
        </div>

        <input
          type="date"
          name="deadline"
          className="input"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="input h-28"
          onChange={handleChange}
        />

        <button className="bg-sky-400 text-white px-6 py-2 rounded hover:bg-sky-500">
          Post Job
        </button>
      </form>
    </div>
  );
}
