import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import selamat from "../../assets/images/gallery/Dok_Ucapan Selamat Mubes IAIF 2022-2025.jpg";
import mubes from "../../assets/images/gallery/Dok_Mubes IAIF 2022-2025.jpg";
import rapat from "../../assets/images/gallery/Dok_Rapat Koordinasi Pengurus IAIF.jpg";
import lantik from "../../assets/images/gallery/Dok_Pelantikan dan Raker_2.jpg";

const SliderGallery = () => {
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Gunakan komponen panah sebelumnya yang sudah dibuat
    nextArrow: <NextArrow />, // Gunakan komponen panah berikutnya yang sudah dibuat
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
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  const data = [
    {
      nama: "Ucapam Selamat Mubes IAIF 2022-2025",
      img: selamat,
      ket: "Terpilihnya Aldy Rialdy Atmadja sebagai ketua IAIF periode 2022 - 2025",
    },
    {
      nama: "Pelantikan dan Raker",
      img: lantik,
      ket: "Di lantiknya Aldy Rialdy Atmadja sebagai ketua IAIF periode 2022 - 2025",
    },
    {
      nama: "Rapat Koordinasi",
      img: rapat,
      ket: "Rapat Koordinasi Pengurus IAIF",
    },
    {
      nama: "Mubes IAIF 2022-2025",
      img: mubes,
      ket: "Musyawarah Besar IAIF",
    },
  ];

  return (
    <div className="w-full mx-auto pt-12 ">
      <div className="">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
              <img
                src={d.img}
                alt="alt"
                className="aspect-[16/9] object-cover object-top"
              />
              <div className="py-6 px-6">
                <h3>
                  <a
                    href="#"
                    className="block mb-3 font-semibold text-xl text-primary hover:text-blue-600 truncate text-center"
                  >
                    {d.nama}
                  </a>
                </h3>
                <p className="text-center mt-4 mb-4">{d.ket}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderGallery;
