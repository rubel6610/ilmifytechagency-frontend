import React from "react";
import { MapPin, DollarSign, Briefcase, Clock, Calendar, FileText, User, X } from "lucide-react";

interface JobDetailsModalProps {
  job: any; // Using any for now as this component seems to expect a different structure than the main AppliedJob interface
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div data-lenis-prevent className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto no-scrollbar">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
            <p className="text-emerald-100">{job.companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Location</span>
              </div>
              <p className="text-gray-900 font-medium">{job.location}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Salary</span>
              </div>
              <p className="text-gray-900 font-medium">{job.salary}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Job Type</span>
              </div>
              <p className="text-gray-900 font-medium">{job.jobType}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Experience</span>
              </div>
              <p className="text-gray-900 font-medium">{job.experience}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Applied On</span>
              </div>
              <p className="text-gray-900 font-medium">{new Date(job.appliedDate).toLocaleDateString()}</p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-emerald-600" />
                <span className="text-sm font-semibold text-gray-600">Deadline</span>
              </div>
              <p className="text-gray-900 font-medium">{new Date(job.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={20} className="text-emerald-600" />
              About the Position
            </h3>
            <p className="text-gray-700 leading-relaxed">{job.fullDescription}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase size={20} className="text-emerald-600" />
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {job.responsibilities?.map((resp: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <User size={20} className="text-emerald-600" />
              Requirements
            </h3>
            <ul className="space-y-2">
              {job.requirements?.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-600 mb-1">Application Status</p>
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 font-semibold rounded-lg">
              {job.status}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-6 flex gap-3 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            Update Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
