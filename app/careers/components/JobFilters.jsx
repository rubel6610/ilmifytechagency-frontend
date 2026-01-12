"use client";

import { Filter, DollarSign, MapPin, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const locationButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          locationButtonRef.current && !locationButtonRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 sticky top-24 z-40">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Filter className="mr-2" size={20} />
        Filters
      </h3>

      {/* Job Type */}
      <div className="mb-6 md:mb-8">
        <h4 className="font-semibold text-gray-700 mb-3 md:mb-4">Job Type</h4>
        <div className="space-y-1 md:space-y-2">
          {["All", "Full Time", "Part Time"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
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
      <div className="mb-6 md:mb-8">
        <h4 className="font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
          <DollarSign size={16} className="mr-2" />
          Salary Range
        </h4>
        <div className="space-y-1 md:space-y-2">
          {["All", "Low", "Medium", "High"].map((range) => (
            <button
              key={range}
              onClick={() => setSalaryFilter(range)}
              className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
                salaryFilter === range
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="relative" ref={dropdownRef}>
        <h4 className="font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </h4>
        <div
          ref={locationButtonRef}
          className="w-full border rounded-lg cursor-pointer px-3 md:px-4 py-2 md:py-3 flex justify-between items-center hover:bg-gray-50 text-sm md:text-base"
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
        >
          {locationFilter}
          <ChevronDown size={16} />
        </div>
        {locationDropdownOpen && (
          <div 
            className="dropdown-fixed absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg max-h-48 md:max-h-60 overflow-y-auto shadow-2xl"
            data-lenis-prevent
          >
            {locations.map((loc) => (
              <div
                key={loc}
                onClick={() => {
                  setLocationFilter(loc);
                  setLocationDropdownOpen(false);
                }}
                className={`px-3 md:px-4 py-2 md:py-3 mt-1 cursor-pointer hover:bg-emerald-500 hover:text-white text-sm md:text-base ${
                  locationFilter === loc ? "bg-emerald-500 text-white" : ""
                }`}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={resetFilters}
        className="w-full mt-6 md:mt-8 py-2 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm md:text-base"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default JobFilters;