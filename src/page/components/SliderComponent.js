import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase.js";
import {
  doc,
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile from "../../assets/images/user.jpg";

const arrowStyle = {
  margin: "0 10px", // Menambahkan jarak horizontal 10px antara panah dan slide
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev mr-4" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="navy" // Mengatur warna panah menjadi navy
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}

// Komponen untuk panah berikutnya (next)
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="navy" // Mengatur warna panah menjadi navy
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

function SliderComponent() {
  const [jabatanData, setJabatanData] = useState([]);
  const [filteredJabatanData, setFilteredJabatanData] = useState([]);

  useEffect(() => {
    getJabatan();
  }, []);

  const getJabatan = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jabatan")); // Mengambil dokumen dari koleksi "jabatan"

      const jabatanData = [];
      querySnapshot.forEach((doc) => {
        const jabatan = doc.data(); // Ambil data jabatan dari dokumen

        // Periksa apakah ada bidang "pengurus" dan apakah itu merupakan objek
        if (jabatan.pengurus && typeof jabatan.pengurus === "object") {
          // Ambil setiap entri dalam map pengurus
          Object.entries(jabatan.pengurus).forEach(
            ([nama, jabatanPengurus]) => {
              // Periksa apakah ID pengurus sudah ada dalam array jabatanData
              const existingIndex = jabatanData.findIndex(
                (item) => item.id === doc.id && item.nama === nama
              );
              if (existingIndex === -1) {
                // Jika ID pengurus belum ada, tambahkan
                jabatanData.push({
                  id: doc.id, // ID jabatan
                  nama: nama, // Nama pengurus
                  jabatan: jabatanPengurus, // Jabatan pengurus
                });
              }
            }
          );
        }
      });

      setJabatanData(jabatanData);
    } catch (error) {
      console.error("Error fetching jabatan data:", error.message);
    }
  };

  const filterJabatanData = () => {
    const filteredData = jabatanData.filter(
      (jabatan) =>
        jabatan.jabatan.jabatan_pengurus &&
        (jabatan.jabatan.jabatan_pengurus.toLowerCase().includes("umum") ||
          jabatan.jabatan.jabatan_pengurus.toLowerCase().includes("ketua"))
    );
    setFilteredJabatanData(filteredData);
  };

  // Panggil fungsi filterJabatanData untuk menerapkan filter pada jabatanData
  useEffect(() => {
    filterJabatanData();
  }, [jabatanData]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Gunakan komponen panah sebelumnya yang sudah dibuat
    nextArrow: <NextArrow />, // Gunakan komponen panah berikutnya yang sudah dibuat
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  console.log(jabatanData);
  return (
    <div className="">
      <div className="w-full mx-auto pt-12 items-center">
        <div className=" ">
          <Slider {...settings}>
            {filteredJabatanData.map((jabatan) => (
              <div key={jabatan.id}>
                <div>
                  <div className="bg-white h-[370px] text-black rounded-xl shadow-lg">
                    <div className="h-56 rounded-t-xl bg-indigo-400 flex justify-center items-center">
                      <img
                        src={profile}
                        alt=""
                        className="h-44 w-44 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                      {/* Menampilkan data jabatan dan nama pengurus */}
                      <p className="text-xl font-semibold text-center">
                        {jabatan.jabatan.jabatan_pengurus}
                      </p>
                      <p className="text-xl ">
                        {jabatan.jabatan.nama_pengurus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
