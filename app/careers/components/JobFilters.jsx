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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent Lenis from interfering with dropdown scroll
  useEffect(() => {
    if (locationDropdownOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector('.location-dropdown');
      if (dropdown) {
        // Add data attribute to prevent Lenis interference
        dropdown.setAttribute('data-no-lenis', 'true');
        
        // Ensure scroll works
        dropdown.addEventListener('wheel', (e) => {
          e.stopPropagation();
        }, { passive: false });
      }
    }
  }, [locationDropdownOpen]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 z-40" ref={dropdownRef}>
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
      <div className="relative">
        <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </h4>
        <div
          className="w-full border rounded-lg cursor-pointer px-4 py-3 flex justify-between items-center hover:bg-gray-50"
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
        >
          {locationFilter}
          <ChevronDown size={16} />
        </div>
        {locationDropdownOpen && (
          <div 
            className="location-dropdown absolute z-50 mt-1 w-full bg-white border rounded-lg max-h-60 overflow-y-auto shadow-lg"
            data-no-lenis="true"
            style={{ 
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {locations.map((loc) => (
              <div
                key={loc}
                onClick={() => {
                  setLocationFilter(loc);
                  setLocationDropdownOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-emerald-500 hover:text-white rounded-lg ${
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
        className="w-full mt-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default JobFilters;