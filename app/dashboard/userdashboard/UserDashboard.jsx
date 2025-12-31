import React from 'react';

const UserDashboard = () => {
    return (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-slate-600">Total Jobs</h4>
        <p className="text-3xl font-bold text-sky-400">12</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-slate-600">Active Jobs</h4>
        <p className="text-3xl font-bold text-green-500">8</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-slate-600">Total applied</h4>
        <p className="text-3xl font-bold text-orange-400">7</p>
      </div>
    </div>
    );
};

export default UserDashboard;