import React from "react";
import {
  User,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="w-1/3 p-2">
      <div className="bg-white rounded-md border border-gray-200 shadow-sm relative h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-purple-200">
        <div className="px-4 py-4">
          {/* Job title and company */}
          <div className="flex mb-3">
            <div className="w-12 h-12 flex-shrink-0 mr-3">
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                className="w-full h-full object-contain border border-gray-200 rounded-md"
              />
            </div>

            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-200">
                {job.title}
              </h3>
              <div className="flex items-center">
                <p className="text-gray-700 text-sm">{job.company}</p>
                {job.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Job details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <User className="w-4 h-4 text-purple-600 mr-2 mt-0.5" />
              <span className="text-purple-600 font-medium">
                {job.employmentType}
              </span>
            </div>

            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-600 mr-2 mt-0.5" />
              <span className="text-gray-700">On-site • {job.location}</span>
            </div>

            <div className="flex items-start">
              <Briefcase className="w-4 h-4 text-gray-600 mr-2 mt-0.5" />
              <span className="text-gray-700">{job.experience}</span>
            </div>

            <div className="flex items-start">
              {job.salary ? (
                <>
                  <DollarSign className="w-4 h-4 text-gray-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{job.salary}</span>
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 text-gray-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">Negotiable</span>
                </>
              )}
            </div>
          </div>

          {/* Recruiter info */}
          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            {job.recruiterActivity && `Rekruter aktif ${job.recruiterActivity}`}
          </div>
        </div>

        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-purple-500/0 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-md pointer-events-none"></div>
      </div>
    </div>
  );
};

const JobsBoard = () => {
  const jobs = [
    {
      id: 1,
      title: "Parts And Service Representative",
      company: "PT Galaksi Mandiri Utama",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Manado",
      experience: "Min. 1 years of experience",
      salary: null,
      verified: true,
      recruiterActivity: "1h lalu",
    },
    {
      id: 2,
      title: "Commercial Vehicle Account Executive",
      company: "Adira Finance",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Makassar",
      experience: "Min. 4 years of experience",
      salary: null,
      verified: true,
      recruiterActivity: "1h lalu",
    },
    {
      id: 3,
      title: "Senior Sales",
      company: "PT Inti Talenta Teknologi",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Jakarta Selatan",
      experience: "Min. 5+ years of experience",
      salary: "Rp8.500.000 – 12.000.000",
      verified: false,
      recruiterActivity: "1h lalu",
    },
    {
      id: 4,
      title: "Education Outreach Specialist",
      company: "Cakrawala University",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Jakarta Selatan",
      experience: "Min. Freshgrad",
      salary: null,
      verified: true,
      recruiterActivity: "2h lalu",
    },
    {
      id: 5,
      title: "CREATIVE DESIGN",
      company: "PT Istana Surya Perkasa",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Surabaya",
      experience: "Min. Freshgrad",
      salary: null,
      verified: true,
      recruiterActivity: "2h lalu",
    },
    {
      id: 6,
      title: "Admin Finance - Surabaya",
      company: "PT Gree Electric Appliances Indonesia",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Surabaya",
      experience: "Min. 1 years of experience",
      salary: null,
      verified: true,
      recruiterActivity: "7j lalu",
    },
    {
      id: 7,
      title: "Recruitment Internship",
      company: "Anteraja",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Magang",
      location: "Jakarta Selatan",
      experience: "Min. 4th Year College Student",
      salary: null,
      verified: true,
      recruiterActivity: "",
    },
    {
      id: 8,
      title: "Fleet Team Leader - Makassar",
      company: "PT XanhSM Green & Smart Mobility",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Makassar",
      experience: "Min. 4 years of experience",
      salary: null,
      verified: true,
      recruiterActivity: "",
    },
    {
      id: 9,
      title: "Operations Specialist - Makassar",
      company: "PT XanhSM Green & Smart Mobility",
      logoUrl: "/api/placeholder/48/48",
      employmentType: "Penuh waktu",
      location: "Makassar",
      experience: "Min. 1 years of experience",
      salary: null,
      verified: true,
      recruiterActivity: "",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Lowongan Kerja Terbaru
        </h1>

        <div className="flex flex-wrap -mx-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 rounded-md border border-purple-500 text-purple-600 bg-white hover:bg-purple-50 transition-colors duration-300">
            Lihat Lowongan Lainnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsBoard;
