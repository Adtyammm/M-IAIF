import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Briefcase,
  DollarSign,
  CheckCircle,
  Share2,
  Heart,
  Clock,
} from "lucide-react";

const JobDetail = () => {
  const [showFixedButton, setShowFixedButton] = useState(false);

  // Function to handle scroll and determine if fixed button should be visible
  useEffect(() => {
    const handleScroll = () => {
      const applyButton = document.getElementById("apply-button");
      if (applyButton) {
        const rect = applyButton.getBoundingClientRect();
        // Check if the button is out of viewport (scrolled past)
        setShowFixedButton(rect.bottom < 0 || rect.top > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const job = {
    id: 1,
    title: "Parts And Service Representative Sales",
    company: "PT Galaksi Mandiri Utama",
    isHot: true,
    verified: true,
    logoUrl: "/api/placeholder/80/80",
    employmentType: "Penuh waktu",
    location: "Manado",
    experience: "Min. 1 years of experience",
    salary: "Negotiable",
    recruiterActivity: "1h lalu",
    description: [
      "Menjual sparepart dan service kepada existing dan new customer",
      "Merancang rencana penjualan bulanan dan tahunan",
      "Menganalisa permintaan dan harga komodit di target pasaran",
      "Menjalin hubungan baik dengan customer",
      "Mengumpulkan feedback dari customer mengenai produk (part dan jasa) dan menginformasikan feedback tersebut kepada perusahaan",
    ],
    qualifications: [
      "Minimal Diploma",
      "Memiliki pengalaman minimal 1 tahun di bidang sales/marketing alat berat lebih diprioritaskan",
      "Bersedia dinas ke luar kota, khususnya area Sulawesi dan Indonesia Timur",
      "Dapat mengoperasikan Microsoft Office (Word, Excel, Powerpoint, Outlook)",
      "Memiliki kemampuan komunikasi yang baik",
      "Dapat bekerja dalam tim maupun individu",
      "Berorientasi pada target",
      "Memiliki SIM A/C",
      "Mampu bekerja di bawah tekanan",
      "Jujur, teliti, dan bertanggung jawab",
      "Memiliki motivasi tinggi untuk belajar",
      "Memahami produk otomotif, khususnya spare parts",
      "Memiliki jaringan pelanggan di area Sulawesi menjadi nilai tambah",
      "Fasih berbahasa Inggris menjadi nilai tambah",
      "Bersedia untuk melalui proses on-the-job training selama 3 bulan",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-4 sm:p-6 font-sans">
      {/* Header section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Company logo banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="relative w-20 h-20 rounded-xl bg-yellow-400 flex items-center justify-center text-white font-bold mr-4 overflow-hidden shadow-md mb-4 sm:mb-0">
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
              <span className="absolute text-xl font-black tracking-tighter">
                MAN
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center flex-wrap">
                  {job.title}
                  {job.isHot && (
                    <span className="text-orange-500 ml-1 text-2xl">🔥</span>
                  )}
                </h1>
                <div className="bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-xs font-medium flex items-center self-start">
                  <Clock className="w-3 h-3 mr-1" />
                  Rekruter aktif {job.recruiterActivity}
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-purple-700 font-semibold text-lg">
                  {job.company}
                </p>
                {job.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-500 ml-1.5" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-start">
                <User className="w-5 h-5 text-purple-600 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="text-purple-700 font-medium">
                  {job.employmentType}
                </span>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-600 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">On-site • {job.location}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-gray-600 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{job.experience}</span>
              </div>

              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-gray-600 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{job.salary}</span>
              </div>
            </div>
          </div>

          <div
            id="apply-button"
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium text-base flex items-center justify-center shadow-sm hover:shadow-md flex-1 sm:flex-initial">
              Lamar Cepat
            </button>

            <div className="flex gap-2 sm:gap-3">
              <button className="border border-gray-200 rounded-xl w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-500" />
              </button>

              <button className="border border-gray-200 rounded-xl w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-500 font-medium">
            Tidak Perlu Sign Up!
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-5">
          Deskripsi Pekerjaan
        </h2>
        <ul className="space-y-3.5">
          {job.description.map((item, index) => (
            <li key={index} className="flex items-start text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Qualifications section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-5">
          Kualifikasi
        </h2>
        <ul className="space-y-3.5">
          {job.qualifications.map((item, index) => (
            <li key={index} className="flex items-start text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional sections to make content longer */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-5">
          Benefit
        </h2>
        <ul className="space-y-3.5">
          <li className="flex items-start text-sm md:text-base">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
            <span className="text-gray-700 leading-relaxed">
              Gaji pokok + komisi penjualan
            </span>
          </li>
          <li className="flex items-start text-sm md:text-base">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
            <span className="text-gray-700 leading-relaxed">
              BPJS Kesehatan & Ketenagakerjaan
            </span>
          </li>
          <li className="flex items-start text-sm md:text-base">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
            <span className="text-gray-700 leading-relaxed">
              Tunjangan transportasi
            </span>
          </li>
          <li className="flex items-start text-sm md:text-base">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
            <span className="text-gray-700 leading-relaxed">
              Tunjangan komunikasi
            </span>
          </li>
          <li className="flex items-start text-sm md:text-base">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3.5 flex-shrink-0"></div>
            <span className="text-gray-700 leading-relaxed">
              Insentif pencapaian target
            </span>
          </li>
        </ul>
      </div>

      {/* Apply button fixed on mobile - only shown when main button is not visible */}
      {showFixedButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200 shadow-lg flex justify-center z-10">
          <button className="bg-purple-600 text-white w-full px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium text-base flex items-center justify-center">
            Lamar Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
