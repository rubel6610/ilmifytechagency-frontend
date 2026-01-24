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
  onFilterChange,
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

  // Handle filter change with scroll
  const handleFilterChange = (type) => {
    setFilter(type);
    if (onFilterChange) onFilterChange();
  };

  // Handle salary filter change with scroll
  const handleSalaryFilterChange = (range) => {
    setSalaryFilter(range);
    if (onFilterChange) onFilterChange();
  };

  // Handle location filter change with scroll
  const handleLocationFilterChange = (loc) => {
    setLocationFilter(loc);
    setLocationDropdownOpen(false);
    if (onFilterChange) onFilterChange();
  };

  // Handle reset with scroll
  const handleResetFilters = () => {
    resetFilters();
    if (onFilterChange) onFilterChange();
  };

  return (
    <div className="bg-white rounded-2xl lg:shadow-lg lg:border lg:border-gray-100 lg:p-4 px-4 lg:sticky top-30 z-40">
      <h3 className="text-xl md:text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Filter className="mr-2" size={20} />
        Filters
      </h3>

      {/* Job Type */}
      <div className="mb-5">
        <h4 className="font-bold text-gray-700 mb-5">Job Type</h4>
        <div className="space-y-3">
          {["All", "Full Time", "Part Time", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`w-full text-left px-3 md:px-4 py-2 lg:py-3 rounded-lg transition-all  md:text-base ${
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
      <div className="mb-5">
        <h4 className="font-bold text-gray-700 mb-4 flex items-center">
          <DollarSign size={16} className="mr-2" />
          Salary Range
        </h4>
        <div className="space-y-3 ">
          {["All", "Low", "Medium", "High"].map((range) => (
            <button
              key={range}
              onClick={() => handleSalaryFilterChange(range)}
              className={`w-full text-left px-3 md:px-4 py-2 lg:py-3 rounded-lg transition-all  md:text-base ${
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
        <h4 className="font-bold text-gray-700 mb-6 flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </h4>
        <div
          ref={locationButtonRef}
          className="w-full border rounded-lg cursor-pointer px-3 md:px-4 py-3 lg:py-3 flex justify-between items-center hover:bg-gray-50  md:text-base"
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
        >
          {locationFilter}
          <ChevronDown size={16} className={`transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`} />
        </div>
        {locationDropdownOpen && (
          <div 
            className="absolute left-0 right-0 top-5 mt-1 bg-white border rounded-lg max-h-48 md:max-h-60 overflow-y-auto shadow-2xl"
            data-lenis-prevent
            style={{
              bottom: "auto",
              transform: "translateY(-100%)"
            }}
          >
            {locations.map((loc) => (
              <div
                key={loc}
                onClick={() => handleLocationFilterChange(loc)}
                className={`px-4 py-3 mt-0.5 cursor-pointer hover:bg-emerald-500 hover:text-white  md:text-base ${
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
        onClick={handleResetFilters}
        className="w-full mt-3 md:mt-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium  md:text-base"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default JobFilters;