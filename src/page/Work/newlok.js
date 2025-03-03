import React from "react";
import { User, MapPin, Briefcase, DollarSign, CheckCircle } from "lucide-react";

// Color themes for different job categories
const jobThemes = {
  IT: "from-blue-50 to-indigo-50 border-l-4 border-blue-500",
  Finance: "from-emerald-50 to-green-50 border-l-4 border-emerald-500",
  Sales: "from-amber-50 to-yellow-50 border-l-4 border-amber-500",
  Education: "from-purple-50 to-violet-50 border-l-4 border-purple-500",
  Design: "from-rose-50 to-pink-50 border-l-4 border-rose-500",
  Admin: "from-cyan-50 to-sky-50 border-l-4 border-cyan-500",
  Engineering: "from-orange-50 to-red-50 border-l-4 border-orange-500",
  Operations: "from-teal-50 to-emerald-50 border-l-4 border-teal-500",
};

const getCategoryFromTitle = (title) => {
  title = title.toLowerCase();
  if (title.includes("design") || title.includes("creative")) return "Design";
  if (title.includes("sales") || title.includes("account")) return "Sales";
  if (title.includes("finance") || title.includes("admin")) return "Admin";
  if (title.includes("education") || title.includes("outreach"))
    return "Education";
  if (title.includes("engineer") || title.includes("mechanical"))
    return "Engineering";
  if (title.includes("operations") || title.includes("fleet"))
    return "Operations";
  if (
    title.includes("tech") ||
    title.includes("it") ||
    title.includes("recruit")
  )
    return "IT";
  return "Sales"; // Default
};

const JobCard = ({ job }) => {
  const category = getCategoryFromTitle(job.title);
  const themeClass = jobThemes[category] || jobThemes.Sales;

  return (
    <div className="w-1/3 p-2">
      <div
        className={`bg-gradient-to-br ${themeClass} rounded-lg shadow-sm h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
      >
        <div className="px-4 py-4">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-white/70 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Job title and company */}
          <div className="flex mb-3">
            <div className="w-12 h-12 flex-shrink-0 mr-3 bg-white rounded-full p-1.5 shadow-sm">
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
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
          <div className="mt-4 pt-3 border-t border-gray-200/50 flex justify-between items-center">
            {job.recruiterActivity && (
              <span className="text-xs text-gray-500">
                Rekruter aktif {job.recruiterActivity}
              </span>
            )}
            <button className="text-xs bg-white/80 hover:bg-white text-purple-700 font-medium px-3 py-1 rounded-full shadow-sm transition-colors duration-200">
              Apply
            </button>
          </div>
        </div>
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
          <button className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition duration-200">
            Lihat Lowongan Lainnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsBoard;
