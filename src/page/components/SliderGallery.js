import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase"; // Pastikan konfigurasi Firebase Anda benar
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderGallery = () => {
  const [galleryData, setGalleryData] = useState([]); // State untuk menyimpan data gallery

  // Fungsi untuk mengambil data dari Firestore
  useEffect(() => {
    const fetchGalleryData = async () => {
      const galleryCollectionRef = collection(db, "gallery");
      try {
        const querySnapshot = await getDocs(galleryCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGalleryData(data);
      } catch (error) {
        console.error("Error fetching gallery data from Firestore:", error);
      }
    };

    fetchGalleryData();
  }, []);

  // Komponen untuk panah sebelumnya (prev)
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev mr-4" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="navy"
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
          stroke="navy"
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    initialSlide: 0,
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
    ],
  };

  return (
    <div className="w-full mx-auto pt-12 ">
      <div className="">
        <Slider {...settings}>
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg mb-10"
            >
              <img
                src={item.imageUrl} // Menggunakan URL gambar dari Firestore
                alt={item.title}
                className="aspect-[16/9] object-cover object-top"
              />
              <div className="py-6 px-6">
                <h3>
                  <a
                    href="#"
                    className="block mb-3 font-semibold text-xl text-primary hover:text-blue-600 truncate text-center"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="text-center mt-4 mb-4">{item.date}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderGallery;
