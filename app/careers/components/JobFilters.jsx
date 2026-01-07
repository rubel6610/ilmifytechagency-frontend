"use client";

import PageWrapper from "@/app/component/PageWrapper";
import { Filter, DollarSign, MapPin } from "lucide-react";

const JobFilters = ({
  filter,
  setFilter,
  salaryFilter,
  setSalaryFilter,
  locationFilter,
  setLocationFilter,
  locations,
  resetFilters,
}) => {
  return (
    <PageWrapper>
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 ">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Filter className="mr-2" size={20} />
        Filters
      </h3>

      {/* Job Type */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-700 mb-4">Job Type</h4>
        <div className="space-y-2">
          {["All", "Full Time", "Part Time", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                filter === type
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
          <DollarSign size={16} className="mr-2" />
          Salary Range
        </h4>
        {["All", "Low", "Medium", "High"].map((range) => (
          <button
            key={range}
            onClick={() => setSalaryFilter(range)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              salaryFilter === range
                ? "bg-emerald-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Location */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocationFilter(loc)}
              className={`w-full text-left px-4 py-3  rounded-lg transition-all ${
                locationFilter === loc
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full mt-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
      >
        Clear All Filters
      </button>
    </div>
    </PageWrapper>
   
  );
};

export default JobFilters;
