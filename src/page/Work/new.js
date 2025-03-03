import React, { useState } from "react";
import {
  User,
  MapPin,
  Briefcase,
  DollarSign,
  CheckCircle,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

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
    <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
      <div
        className={`bg-gradient-to-br ${themeClass} rounded-lg shadow-sm h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
      >
        <div className="px-5 py-4">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-white/70 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Job title and company */}
          <div className="flex mb-4">
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
          <div className="space-y-3 text-sm">
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
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobsBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Jobs");

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

  const filterOptions = [
    "All Jobs",
    "IT",
    "Finance",
    "Sales",
    "Design",
    "Education",
    "Admin",
    "Engineering",
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Lowongan Kerja Terbaru
            </h1>
            <p className="text-gray-600">
              Temukan karir impian Anda dari {jobs.length} lowongan kerja
              tersedia
            </p>
          </div>

          {/* Quick stats */}
          <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm flex space-x-4">
            <div>
              <p className="text-xs text-gray-500">Total Lowongan</p>
              <p className="text-lg font-bold text-purple-600">{jobs.length}</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-gray-500">Kategori</p>
              <p className="text-lg font-bold text-purple-600">8</p>
            </div>
          </div>
        </div>

        {/* Search and filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 text-sm outline-none transition"
                placeholder="Cari lowongan, perusahaan, atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <div className="relative inline-block text-left z-10">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedFilter}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                </div>
                {/* Dropdown menu would go here */}
              </div>

              <button className="bg-purple-600 text-white rounded-lg px-4 py-2.5 hover:bg-purple-700 transition-colors duration-200 shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedFilter === option
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Job listings */}
        <div className="flex flex-wrap -mx-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load more button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition duration-200">
            Lihat Lowongan Lainnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsBoard;
