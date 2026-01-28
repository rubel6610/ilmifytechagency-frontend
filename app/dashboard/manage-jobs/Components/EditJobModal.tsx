import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { Job, useGetJobByIdQuery } from "@/redux/service/jobApi";

interface EditJobModalProps {
  jobId: string;
  onClose: () => void;
  onSave: (updatedJob: Job) => void;
}

export default function EditJobModal({ jobId, onClose, onSave }: EditJobModalProps) {
  const { data: job, isLoading } = useGetJobByIdQuery(jobId);
  const [formData, setFormData] = useState<Job | null>(null);

  useEffect(() => {
    if (job) {
      setFormData({ ...job });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-black text-gray-800 uppercase">Edit Core Data</h2>
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0ddaa0] transition-colors font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Status
              </label>
              <select
                value={formData.applicationStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicationStatus: e.target.value as any,
                  })
                }
                className="w-full border focus:border-[#0ddaa0] rounded-xl px-4 py-3 outline-none"
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Deadline
              </label>
              <input
                type="date"
                value={formData.applicationDeadline ? formData.applicationDeadline.split("T")[0] : ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicationDeadline: e.target.value,
                  })
                }
                className="w-full border focus:border-[#0ddaa0] rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Salary Range
              </label>
              <input
                value={formData.salary || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: e.target.value,
                  })
                }
                className="w-full border focus:border-[#0ddaa0] rounded-xl px-4 py-3 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                Vacancy
              </label>
              <input
                type="number"
                value={formData.vacancy || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vacancy: Number(e.target.value),
                  })
                }
                className="w-full border focus:border-[#0ddaa0] rounded-xl px-4 py-3 outline-none"
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
