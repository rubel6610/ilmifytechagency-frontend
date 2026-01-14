"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";

export default function EditJobModal({ job, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...job });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Basic logic for nested updates (e.g., job title vs summary.vacancy)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Job Information</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Job Title</label>
              <input 
                name="title"
                value={formData.title} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#0ddaa0]" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Job Status</label>
              <select 
                name="summary.jobStatus"
                value={formData.summary.jobStatus} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#0ddaa0]"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Vacancy</label>
              <input 
                name="summary.vacancy"
                value={formData.summary.vacancy} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#0ddaa0]" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Deadline</label>
              <input 
                name="deadline"
                value={formData.deadline} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#0ddaa0]" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Education Requirements</label>
            <textarea 
              name="requirements.education"
              value={formData.requirements.education} 
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#0ddaa0]"
            />
          </div>
        </form>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-8 py-2 bg-[#0ddaa0] text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:scale-105 transition-all"
          >
            <Save size={18} /> Update Job
          </button>
        </div>
      </motion.div>
    </div>
  );
}