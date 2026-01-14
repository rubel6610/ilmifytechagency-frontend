import { useState } from "react";
import { X, Save } from "lucide-react";

export default function EditJobModal({ job, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...job });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-black text-gray-800">EDIT CORE DATA</h2>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
              Job Title
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border-2 rounded-xl px-4 py-3 outline-none focus:border-[#0ddaa0] transition-colors font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Status
              </label>
              <select
                value={formData.jobSummary.jobStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobSummary: {
                      ...formData.jobSummary,
                      jobStatus: e.target.value,
                    },
                  })
                }
                className="w-full border-2 rounded-xl px-4 py-3 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Deadline
              </label>
              <input
                type="date"
                value={formData.jobSummary.applicationDeadline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobSummary: {
                      ...formData.jobSummary,
                      applicationDeadline: e.target.value,
                    },
                  })
                }
                className="w-full border-2 rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Salary Range
              </label>
              <input
                value={formData.salaryAndBenefits.salary.range}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salaryAndBenefits: {
                      ...formData.salaryAndBenefits,
                      salary: {
                        ...formData.salaryAndBenefits.salary,
                        range: e.target.value,
                      },
                    },
                  })
                }
                className="w-full border-2 rounded-xl px-4 py-3 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Vacancy
              </label>
              <input
                value={formData.vacancy}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                   vacancy:Number(e.target.value)
                  })
                }
                className="w-full border-2 rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-8 pt-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 font-bold text-gray-400 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-[#0ddaa0] text-white rounded-xl font-bold shadow-lg shadow-[#0ddaa0]/30 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Update Job
          </button>
        </div>
      </form>
    </div>
  );
}
