"use client";

import { X, Calendar, MapPin, Briefcase, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import { JobListItem } from "@/redux/service/jobApi";

interface JobDetailsModalProps {
  job: JobListItem;
  onClose: () => void;
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white px-8 py-6 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">JOB SPECIFICATIONS</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-transform hover:rotate-90"
          >
            <X />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <Image 
              height={100} 
              width={100} 
              src={job.thumbnail || "/placeholder-company.png"} 
              alt="logo" 
              className="w-16 h-16 rounded-2xl border object-contain p-1" 
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-[#0ddaa0] font-semibold">{job.slug}</p>
            </div>
          </div>

          {/* Key Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
            <DetailItem icon={<MapPin size={16}/>} label="Location" value={job.location} />
            <DetailItem icon={<Briefcase size={16}/>} label="Job Type" value={job.jobType} />
            {job.applicationDeadline && (
              <DetailItem 
                icon={<Calendar size={16}/>} 
                label="Deadline" 
                value={new Date(job.applicationDeadline).toLocaleDateString()} 
                color="text-red-600" 
              />
            )}
            <DetailItem 
              icon={<Users size={16}/>} 
              label="Status" 
              value={job.applicationStatus} 
              color={job.applicationStatus === "OPEN" ? "text-emerald-600" : "text-gray-600"}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Employment Type</h4>
              <p className="text-gray-600">{job.employmentType}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Work Mode</h4>
              <p className="text-gray-600">{job.workMode}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Created Date</h4>
              <p className="text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

function DetailItem({ icon, label, value, color = "text-gray-900" }: DetailItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400 bg-white p-2 rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">{label}</p>
        <p className={`text-sm font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}