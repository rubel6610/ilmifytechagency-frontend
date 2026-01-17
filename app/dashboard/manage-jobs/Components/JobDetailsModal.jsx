import { X, Calendar, MapPin, Briefcase, DollarSign, Users } from "lucide-react";
import Image from "next/image";

export default function JobDetailsModal({ job, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white px-8 py-6 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">JOB SPECIFICATIONS</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-transform hover:rotate-90"><X /></button>
        </div>

        <div className="p-8 space-y-8">
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <Image height={100} width={100} src={job.company.logo} alt="logo" className="w-16 h-16 rounded-2xl border object-contain p-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-[#0ddaa0] font-semibold">{job.company.name}</p>
            </div>
          </div>

          {/* Key Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
            <DetailItem icon={<MapPin size={16}/>} label="Location" value={`${job.employmentInfo.jobLocation.city}, ${job.employmentInfo.jobLocation.country}`} />
            <DetailItem icon={<Briefcase size={16}/>} label="Job Type" value={job.jobType} />
            <DetailItem icon={<DollarSign size={16}/>} label="Salary" value={job.salaryAndBenefits.salary.range} />
            <DetailItem icon={<Users size={16}/>} label="Vacancy" value={`${job.vacancy} Positions`} />
            <DetailItem icon={<Calendar size={16}/>} label="Deadline" value={job.jobSummary.applicationDeadline} color="text-red-600" />
            <DetailItem icon={<Calendar size={16}/>} label="Experience" value={job.jobSummary.experienceRequired} />
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Description Overview</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{job.jobDescription.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, color = "text-gray-900" }) {
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