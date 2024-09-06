import React, { useEffect } from "react";
import Header from "../components/Header";
import alumni from "../../assets/images/image_1_about.png";
import SliderComponent from "../components/SliderComponent";
import Slider from "react-slick";
import ScrollReveal from "scrollreveal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderGallery from "../components/SliderGallery";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    ScrollReveal().reveal(".scroll", {
      delay: 500,
      duration: 3000,
      distance: "68px",
      origin: "bottom",
    });
    ScrollReveal({ reset: true });
  }, []);
  return (
    <>
      <Header />
      <div className="pt-24 scroll">
        <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
          <p className="text-6xl font-bold text-white">Tentang Kami</p>
          <a className="text-white text-xl mt-16 font-medium" href="/">
            Beranda{" "}
            <span className="ml-3 font-medium">
              {"/"}
              <span className="mr-3 font-medium"></span> Tentang Kami
            </span>
          </a>
        </div>
      </div>
      <div>
        <section id="about" class="pt-12 pb-24 scroll">
          <div className="container mx-auto items-center">
            <img
              src={alumni}
              alt="adtyamm"
              className="max-w-full mx-auto w-3/4 rounded-2xl"
            />
            <h1 className="pt-12 pb-12 text-center text-4xl font-bold text-primary">
              Ikatan Alumni Teknik Informatika UIN SGD Bandung
            </h1>
            <div className="container max-w-screen-lg mx-auto text-center">
              <p className="text-justify text-lg">
                Ikatan Alumni Teknik Informatika Universitas Islam Negeri Sunan
                Gunung DJati Bandung ( IAIF UIN SGD Bandung) meranghkul
                jejak-jejak prestassi dan deikasi para alumni Program Studi
                Teknik Informatika. Didirikan dengan semangat untuk membangun
                dan mempererat ikatan antara lulusan, organisasi ini menjadi
                wahana yang memelihara hubungan yang erat di antara mereka.
              </p>
            </div>
            <div className="container max-w-screen-lg mx-auto pt-12">
              <div className="flex gap-4 flex-col lg:flex-row">
                <div className=" w-full h-full px-4 lg:w-2/5 rounded-xl overflow-hidden shadow-xl  pb-8">
                  <div className="px-6 py-4">
                    <div className="font-bold text-4xl pt-4 pb-8 text-center text-primary">
                      VISI
                    </div>
                    <p className="text-primary text-lg text-justify">
                      Menjadi wadah yang kuat dan berpengaruh bagi alumni
                      Departemen Infromatika dalam upaya meningkatkan mutu dan
                      kontribusi bidang teknologi informasi dalam masyarakat.
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2"></div>
                </div>
                <div className="w-full px-4 self-center lg:w-3/5 rounded-xl overflow-hidden shadow-xl bg-white">
                  <div className="px-6 py-4">
                    <div className="font-bold text-4xl mb-8 text-center text-primary">
                      MISI
                    </div>
                    <p className="text-primary text-lg text-justify">
                      <ul>
                        <li className="mb-2">
                          <strong>
                            1. Membangun Jaringan Alumni yang Kuat
                          </strong>
                          <p className="ml-6">
                            Memperkuat hubungan antar alumni Departemen
                            Informatika melalui berbagai kegiatan sosial,
                            seminar, dan workshop untuk memfasilitasi kolaborasi
                            dan pertukaran pengetahuan.
                          </p>
                        </li>
                        <li className="mb-2">
                          <strong>2. Pengembangan Karier</strong>
                          <p className="ml-6">
                            Memberikan dukungan dan bimbingan kepada alumni
                            dalam pengembangan karier mereka di bidang teknologi
                            informasi, termasuk pelatihan, peluang pekerjaan,
                            dan saran karier.
                          </p>
                        </li>
                        <li className="mb-2">
                          <strong>3. Kontribusi ke Masyarakat</strong>
                          <p className="ml-6">
                            Memperkuat hubungan antar alumni Departemen
                            Informatika melalui berbagai kegiatan sosial,
                            seminar, dan workshop untuk memfasilitasi kolaborasi
                            dan pertukaran pengetahuan.
                          </p>
                        </li>
                        <li className="mb-2">
                          <strong>
                            4. Kolaborasi dengan Departemen Informatika
                          </strong>
                          <p className="ml-6">
                            Menjalin kerjasama erat dengan Deoarteneb
                            Informatika untuk mendukung pemngembangan kurikulum,
                            penelitian, dan pengabdian kepada masyarakat.
                          </p>
                        </li>
                        <li className="mb-2">
                          <strong>5. Pendidikan dan Pelatihan</strong>
                          <p className="ml-6">
                            Menyelenggarakan program dan pelatihan yang relevan
                            dan bermanfaat bagi alumni dan masyarakat umum dalam
                            hal teknologi informasi.
                          </p>
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2"></div>
                </div>
              </div>
            </div>
            <div className="pt-32 w-full">
              <h1 className=" text-center text-4xl font-bold text-primary">
                Stuktur Organiasi
              </h1>
              <SliderComponent />
              <div className="container pt-14 text-center ">
                <Link
                  to="/organisasi"
                  className="text-lg text-blue-500 hover:text-blue-700 hover:duration-300"
                >
                  Lihat Semua Struktur Organisasi
                </Link>
              </div>
            </div>
            <div className="pt-20 w-full">
              <h1 className=" text-center text-4xl font-bold text-primary">
                Galeri Foto
              </h1>
              <SliderGallery />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default About;
