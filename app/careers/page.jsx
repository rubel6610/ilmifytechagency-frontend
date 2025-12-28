"use client";

import React, { useState } from "react";
import JobCard from "./components/JobCard";

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 3,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 4,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 5,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 6,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 7,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 8,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 9,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 10,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 11,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 12,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 13,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 14,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
    id: 15,
    title: "Frontend Developer (React / Next.js)",
    company: "TechSoft Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "৳60k – ৳90k",
    deadline: "30 Sep 2025",
  },
  {
    id: 16,
    title: "Backend Developer (Node.js)",
    company: "SoftCare",
    location: "Remote",
    type: "Remote",
    salary: "৳70k – ৳100k",
    deadline: "10 Oct 2025",
  },
  {
  id: 17,
  title: "UI/UX Designer",
  company: "Creative Minds",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳50k – ৳80k",
  deadline: "05 Oct 2025",
},
{
  id: 18,
  title: "Junior React Developer",
  company: "CodeSprint",
  location: "Remote",
  type: "Remote",
  salary: "৳40k – ৳65k",
  deadline: "12 Oct 2025",
},
{
  id: 19,
  title: "Laravel Backend Developer",
  company: "WebCraft",
  location: "Chattogram",
  type: "Full Time",
  salary: "৳60k – ৳95k",
  deadline: "15 Oct 2025",
},
{
  id: 20,
  title: "Digital Marketing Executive",
  company: "Brandify",
  location: "Dhaka, Bangladesh",
  type: "Part Time",
  salary: "৳30k – ৳50k",
  deadline: "20 Oct 2025",
},
{
  id: 21,
  title: "MERN Stack Developer",
  company: "DevHouse",
  location: "Remote",
  type: "Remote",
  salary: "৳80k – ৳120k",
  deadline: "25 Oct 2025",
},
{
  id: 22,
  title: "Software QA Engineer",
  company: "QualitySoft",
  location: "Sylhet",
  type: "Full Time",
  salary: "৳45k – ৳70k",
  deadline: "18 Oct 2025",
},
{
  id: 23,
  title: "Mobile App Developer (Flutter)",
  company: "AppNest",
  location: "Dhaka, Bangladesh",
  type: "Contract",
  salary: "৳70k – ৳110k",
  deadline: "22 Oct 2025",
},
{
  id: 24,
  title: "WordPress Theme Developer",
  company: "WPExperts",
  location: "Remote",
  type: "Freelance",
  salary: "৳35k – ৳60k",
  deadline: "28 Oct 2025",
},
{
  id: 25,
  title: "DevOps Engineer",
  company: "CloudNine",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳90k – ৳140k",
  deadline: "30 Oct 2025",
},
{
  id: 26,
  title: "Product Manager",
  company: "TechVision",
  location: "Remote",
  type: "Remote",
  salary: "৳100k – ৳150k",
  deadline: "01 Nov 2025",
},
{
  id: 27,
  title: "Graphic Designer",
  company: "DesignHub",
  location: "Khulna",
  type: "Part Time",
  salary: "৳25k – ৳40k",
  deadline: "08 Oct 2025",
},
{
  id: 28,
  title: "AI Research Assistant",
  company: "FutureAI",
  location: "Dhaka, Bangladesh",
  type: "Internship",
  salary: "৳20k – ৳30k",
  deadline: "18 Nov 2025",
},
{
  id: 29,
  title: "Data Analyst",
  company: "Insight Corp",
  location: "Remote",
  type: "Full Time",
  salary: "৳70k – ৳110k",
  deadline: "05 Nov 2025",
},
{
  id: 30,
  title: "Cyber Security Specialist",
  company: "SecureNet",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳95k – ৳145k",
  deadline: "10 Nov 2025",
},
{
  id: 31,
  title: "Content Writer (Tech)",
  company: "WriteNow",
  location: "Remote",
  type: "Freelance",
  salary: "৳20k – ৳35k",
  deadline: "12 Oct 2025",
},
{
  id: 32,
  title: "Business Analyst",
  company: "BizTech",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳60k – ৳90k",
  deadline: "15 Nov 2025",
},
{
  id: 33,
  title: "Customer Support Executive",
  company: "HelpDesk Pro",
  location: "Rajshahi",
  type: "Full Time",
  salary: "৳30k – ৳45k",
  deadline: "20 Oct 2025",
},
{
  id: 34,
  title: "SEO Specialist",
  company: "RankBoost",
  location: "Remote",
  type: "Contract",
  salary: "৳40k – ৳70k",
  deadline: "25 Oct 2025",
},
{
  id: 35,
  title: "Full Stack Engineer",
  company: "StackFlow",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳85k – ৳130k",
  deadline: "02 Nov 2025",
},
{
  id: 36,
  title: "IT Support Engineer",
  company: "SysCare",
  location: "Barishal",
  type: "Full Time",
  salary: "৳35k – ৳55k",
  deadline: "18 Oct 2025",
},
{
  id: 37,
  title: "Python Developer",
  company: "PyWorks",
  location: "Remote",
  type: "Remote",
  salary: "৳75k – ৳115k",
  deadline: "28 Oct 2025",
},
{
  id: 38,
  title: "HR Executive",
  company: "PeopleFirst",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳40k – ৳65k",
  deadline: "30 Oct 2025",
},
{
  id: 39,
  title: "Blockchain Developer",
  company: "ChainTech",
  location: "Remote",
  type: "Contract",
  salary: "৳120k – ৳180k",
  deadline: "15 Nov 2025",
},
{
  id: 40,
  title: "Game Developer (Unity)",
  company: "PlayZone",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳70k – ৳110k",
  deadline: "22 Nov 2025",
},
{
  id: 41,
  title: "System Analyst",
  company: "InfoSys BD",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳65k – ৳95k",
  deadline: "12 Nov 2025",
},
{
  id: 42,
  title: "Sales Executive",
  company: "SalesPro",
  location: "Comilla",
  type: "Full Time",
  salary: "৳30k – ৳50k",
  deadline: "10 Oct 2025",
},
{
  id: 43,
  title: "Technical Recruiter",
  company: "HireFast",
  location: "Remote",
  type: "Remote",
  salary: "৳45k – ৳70k",
  deadline: "18 Oct 2025",
},
{
  id: 44,
  title: "Cloud Solutions Architect",
  company: "SkyCloud",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳130k – ৳200k",
  deadline: "30 Nov 2025",
},
{
  id: 45,
  title: "Database Administrator",
  company: "DataCore",
  location: "Remote",
  type: "Contract",
  salary: "৳80k – ৳120k",
  deadline: "05 Nov 2025",
},
{
  id: 46,
  title: "Junior Software Engineer",
  company: "NextGen Soft",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳35k – ৳55k",
  deadline: "20 Oct 2025",
},
{
  id: 47,
  title: "E-commerce Manager",
  company: "ShopEase",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳60k – ৳90k",
  deadline: "25 Nov 2025",
},
{
  id: 48,
  title: "Network Engineer",
  company: "NetSecure",
  location: "Chattogram",
  type: "Full Time",
  salary: "৳55k – ৳85k",
  deadline: "10 Nov 2025",
},
{
  id: 49,
  title: "React Native Developer",
  company: "MobileX",
  location: "Remote",
  type: "Remote",
  salary: "৳75k – ৳115k",
  deadline: "28 Nov 2025",
},
{
  id: 50,
  title: "Project Coordinator",
  company: "BuildRight",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳45k – ৳70k",
  deadline: "15 Nov 2025",
},
{
  id: 51,
  title: "Junior Data Scientist",
  company: "DataLabs",
  location: "Remote",
  type: "Internship",
  salary: "৳25k – ৳40k",
  deadline: "05 Dec 2025",
},
{
  id: 52,
  title: "Technical Content Creator",
  company: "DevMedia",
  location: "Remote",
  type: "Freelance",
  salary: "৳30k – ৳50k",
  deadline: "12 Nov 2025",
},
{
  id: 53,
  title: "ERP Consultant",
  company: "BizSolutions",
  location: "Dhaka, Bangladesh",
  type: "Contract",
  salary: "৳90k – ৳140k",
  deadline: "18 Dec 2025",
},
{
  id: 54,
  title: "Software Trainer",
  company: "CodeAcademy",
  location: "Dhaka, Bangladesh",
  type: "Part Time",
  salary: "৳40k – ৳60k",
  deadline: "20 Nov 2025",
},
{
  id: 55,
  title: "IT Project Manager",
  company: "ManageIT",
  location: "Remote",
  type: "Full Time",
  salary: "৳110k – ৳170k",
  deadline: "30 Dec 2025",
},
{
  id: 56,
  title: "Technical Support Engineer",
  company: "Supportly",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳35k – ৳55k",
  deadline: "10 Nov 2025",
},
{
  id: 57,
  title: "Machine Learning Engineer",
  company: "MLWorks",
  location: "Remote",
  type: "Remote",
  salary: "৳120k – ৳180k",
  deadline: "15 Dec 2025",
},
{
  id: 58,
  title: "Web Accessibility Specialist",
  company: "InclusiveWeb",
  location: "Remote",
  type: "Contract",
  salary: "৳60k – ৳90k",
  deadline: "25 Nov 2025",
},
{
  id: 59,
  title: "Startup Operations Manager",
  company: "LaunchPad",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳70k – ৳110k",
  deadline: "05 Jan 2026",
},
{
  id: 60,
  title: "Junior QA Tester",
  company: "BugFree",
  location: "Remote",
  type: "Internship",
  salary: "৳20k – ৳30k",
  deadline: "15 Dec 2025",
},
{
  id: 61,
  title: "Salesforce Developer",
  company: "CRMPro",
  location: "Remote",
  type: "Remote",
  salary: "৳85k – ৳130k",
  deadline: "20 Dec 2025",
},
{
  id: 62,
  title: "Technical Project Lead",
  company: "LeadTech",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳100k – ৳160k",
  deadline: "31 Dec 2025",
},
{
  id: 63,
  title: "AR/VR Developer",
  company: "RealityX",
  location: "Remote",
  type: "Contract",
  salary: "৳110k – ৳170k",
  deadline: "10 Jan 2026",
},
{
  id: 64,
  title: "Startup Growth Hacker",
  company: "GrowthLab",
  location: "Remote",
  type: "Freelance",
  salary: "৳50k – ৳80k",
  deadline: "20 Jan 2026",
},
{
  id: 65,
  title: "IT Auditor",
  company: "AuditSafe",
  location: "Dhaka, Bangladesh",
  type: "Full Time",
  salary: "৳65k – ৳95k",
  deadline: "25 Jan 2026",
},
{
  id: 66,
  title: "Junior Cloud Engineer",
  company: "CloudStarter",
  location: "Remote",
  type: "Internship",
  salary: "৳30k – ৳45k",
  deadline: "05 Feb 2026",
}

];


const ITEMS_PER_PAGE = 12;

const Careers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  //  Search + Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || job.type === filter;

    return matchSearch && matchFilter;
  });

  //  Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-400 mx-auto px-6 my-8">
      {/* 🔹 Top Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        
        {/* Left */}
        <h3 className="text-primary font-semibold text-lg lg:text-2xl">
          Total Jobs <span className="text-gray-500 text-base">| {filteredJobs.length}+</span>
        </h3>

        {/* Center */}
        <input
          className="rounded-md border border-primary h-10 px-4 w-full focus:outline-none placeholder:text-sm"
          type="search"
          placeholder="Search Vacancies"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Right */}
        <select
          className="rounded-md border border-primary h-10 px-4 w-full md:w-auto justify-self-end"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Jobs</option>
          <option value="Full Time">Full Time</option>
          <option value="Remote">Remote</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>

      {/*  Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/*  Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md border transition ${
                currentPage === index + 1
                  ? "bg-white text-primary hover:bg-gray-100"
                  : "bg-primary text-gray-500 border-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
