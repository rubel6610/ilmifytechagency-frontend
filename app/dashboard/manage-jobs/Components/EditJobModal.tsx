"use client";
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import Swal from "sweetalert2";
import {
  Job,
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/redux/service/jobApi";

interface EditJobModalProps {
  jobId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditJobModal({
  jobId,
  onClose,
  onSuccess,
}: EditJobModalProps) {
  const { data: job, isLoading } = useGetJobByIdQuery(jobId);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const [formData, setFormData] = useState<Partial<Job>>({});

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (
    key: keyof Job,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("title", formData.title || "");
      payload.append(
        "applicationStatus",
        formData.applicationStatus || "OPEN"
      );
      payload.append(
        "applicationDeadline",
        formData.applicationDeadline || ""
      );
      payload.append("salary", formData.salary || "");
      payload.append(
        "vacancy",
        String(formData.vacancy || 0)
      );

      const res = await updateJob({
        id: jobId,
        formData: payload,
      }).unwrap();

      if (res.status) {
        Swal.fire("Updated!", res.message, "success");
        onSuccess();
        onClose();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update job", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-black text-gray-800 uppercase">
            Edit Job
          </h2>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">
              Job Title
            </label>
            <input
              value={formData.title || ""}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Status
              </label>
              <select
                value={formData.applicationStatus}
                onChange={(e) =>
                  handleChange(
                    "applicationStatus",
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Deadline
              </label>
              <input
                type="date"
                value={
                  formData.applicationDeadline
                    ? formData.applicationDeadline.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "applicationDeadline",
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Salary
              </label>
              <input
                value={formData.salary || ""}
                onChange={(e) =>
                  handleChange("salary", e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Vacancy
              </label>
              <input
                type="number"
                value={formData.vacancy || 0}
                onChange={(e) =>
                  handleChange(
                    "vacancy",
                    Number(e.target.value)
                  )
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 font-bold text-gray-400 hover:bg-gray-50 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {isUpdating ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
