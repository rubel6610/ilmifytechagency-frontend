// components/AppliedJobCard.jsx
import Image from "next/image";
import Link from "next/link";

const AppliedJobCard = ({ job }) => {
  return (
    <div className="bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md rounded-md p-4 ">
      <div className="flex gap-4 items-center">
        <Image
          src={job.companyImage}
          alt={job.companyName}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.companyName}</p>
          <p className="text-sm text-gray-400">{job.location}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Salary: {job.salary}</p>
        <p>Deadline: {job.deadline}</p>
      </div>

      <div className="mt-4 text-right">
        <Link href={`/dashboard/userdashboard/applied-jobs/${job.id}`} >
          <button className="text-sm text-teal-500 hover:underline">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppliedJobCard;
