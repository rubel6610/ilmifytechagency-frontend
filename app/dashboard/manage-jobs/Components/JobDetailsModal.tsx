"use client";

import { X, Calendar, MapPin, Briefcase, DollarSign, Users, Globe, Mail, Phone, Clock, GraduationCap, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useGetJobByIdQuery } from "@/redux/service/jobApi";

interface JobDetailsModalProps {
  jobId: string;
  onClose: () => void;
}

export default function JobDetailsModal({ jobId, onClose }: JobDetailsModalProps) {
  const { data: response, isLoading } = useGetJobByIdQuery(jobId);
  const job = response?.data;

  if (isLoading) {
    return (
      <div  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#0ddaa0] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-bold text-gray-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div data-lenis-prevent className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white px-8 py-6 border-b flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase">Job Details</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ref: {job.id.slice(-8)}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-transform hover:rotate-90"
          >
            <X />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Header Info */}
          <div className="flex items-start gap-4 p-4 border rounded-2xl bg-gray-50/50">
            <Image 
              height={100} 
              width={100} 
              src={job.thumbnail || "/placeholder-company.png"} 
              alt="logo" 
              className="w-20 h-20 rounded-2xl border bg-white object-contain p-2" 
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">{job.title}</h3>
              <p className="text-[#0ddaa0] font-bold text-sm">{job.companyName}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase">{job.employmentType}</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100 uppercase">{job.jobType}</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-black rounded-lg border border-purple-100 uppercase">{job.workMode}</span>
              </div>
            </div>
          </div>

          {/* Key Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <DetailItem icon={<MapPin size={16}/>} label="Location" value={job.location} />
            <DetailItem icon={<Briefcase size={16}/>} label="Experience" value={job.experience} />
            <DetailItem icon={<DollarSign size={16}/>} label="Salary" value={job.salary} />
            <DetailItem icon={<Users size={16}/>} label="Vacancy" value={job.vacancy.toString()} />
            <DetailItem 
              icon={<Calendar size={16}/>} 
              label="Published" 
              value={new Date(job.createdAt).toLocaleDateString()} 
            />
             <DetailItem 
              icon={<Calendar size={16}/>} 
              label="Deadline" 
              value={job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "No Deadline"} 
              color="text-red-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Requirements & Info */}
            <div className="space-y-6">
              <Section title="Requirements">
                <div className="space-y-3">
                  <RichInfo icon={<GraduationCap size={14}/>} label="Education" value={job.education} />
                  <RichInfo icon={<Briefcase size={14}/>} label="Job Level" value={job.jobLevel} />
                  <RichInfo icon={<Users size={14}/>} label="Gender" value={job.gender || "Any"} />
                  <RichInfo icon={<Clock size={14}/>} label="Working Hours" value={job.workingHours} />
                  <RichInfo icon={<Calendar size={14}/>} label="Office Days" value={job.officeDays} />
                </div>
              </Section>

              <Section title="Company Info">
                <div className="space-y-3">
                  <RichInfo icon={<Globe size={14}/>} label="Website" value={job.companyWebsite} isLink />
                  <RichInfo icon={<Mail size={14}/>} label="Email" value={job.companyEmail} />
                  <RichInfo icon={<Phone size={14}/>} label="Phone" value={job.companyPhone} />
                </div>
              </Section>
            </div>

            {/* List based content */}
            <div className="space-y-6">
               <Section title="Responsibilities">
                <ul className="space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-[#0ddaa0] mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Mandatory Skills">
                <div className="flex flex-wrap gap-2">
                  {job.mandatorySkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white border rounded-full text-xs font-bold text-gray-700 shadow-sm">{skill}</span>
                  ))}
                </div>
              </Section>

              {job.niceToHave.length > 0 && (
                <Section title="Nice to Have">
                  <div className="flex flex-wrap gap-2">
                    {job.niceToHave.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">{skill}</span>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>

          <Section title="Job Overview">
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-dashed whitespace-pre-wrap">
              {job.overview}
            </p>
          </Section>

          {job.benefits.length > 0 && (
            <Section title="Benefits">
              <div className="flex flex-wrap gap-3">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-sm font-bold border border-emerald-100">
                    <CheckCircle size={14} />
                    {benefit}
                  </div>
                ))}
              </div>
            </Section>
          )}

          <div className="pt-4 border-t flex justify-between items-center text-xs text-gray-400 font-bold uppercase">
             <span>Status: {job.applicationStatus}</span>
             <span>Applications: {job.applicationsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{title}</h4>
      {children}
    </div>
  );
}

function RichInfo({ icon, label, value, isLink = false }: { icon: React.ReactNode; label: string; value: string; isLink?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-300">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 leading-none mb-1">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#0ddaa0] hover:underline">{value}</a>
        ) : (
          <p className="text-sm font-bold text-gray-700">{value}</p>
        )}
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