import React, {useEffect, useState} from "react";
import {auth, db} from "../../config/Firebase";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import Header from "../components/Header";
import alumni from "../../assets/images/image_1_about.png";
import join from "../../assets/images/join.jpg";
import Footer from "../components/Footer";
import ScrollReveal from 'scrollreveal';



const Home = () => {

  ScrollReveal().reveal('.scroll', { delay: 500}, {duration: 3000}, {distance: '68px'} , {origin: 'bottom'});
  ScrollReveal({ reset: true });
  return (
    <>
      <div>
        <Header />
        <section id="home" className="pt-64 pb-64 bg-slate-100 scroll">
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full self-center px-4 lg:w-1/2">
                <h1 className="text-4xl font-semibold text-primary md:text-5xl mb-3">
                  Ikatan Alumni Teknik Informatika
                  <span className="block font-bold text-primary text-base lg:text-xl mt-2">
                    Universitas Islam Negeri Sunan Gunung Djati Bandung
                  </span>
                </h1>
                <p className="text-base text-primary lg:text-lg text-justify">
                  Ikatan Alumni Teknik Informatika Universitas Islam Negeri
                  Sunan Gunung Djati Bandung (IAIF UIN SGD Bandung) adalah
                  sebuah organisasi yang membawahi para alumni Program Studi
                  Teknik Informatika di lingkungan Universitas Islam Negeri
                  Sunan Gunung Djati Bandung (UIN SGD Bandung). Organisasi ini
                  didirikan dengan tujuan utama untuk mempertemukan, membangun
                  jaringan, dan mempererat hubungan antara para lulusan Teknik
                  Informatika UIN SGD Bandung.
                </p>
              </div>
              <div className="w-full self-end px-4 lg:w-1/2">
                <div className="mt-14 relative lg:mt-0 lg:left-10">
                  <img
                    src={alumni}
                    alt="adtyamm"
                    className="max-w-full mx-auto scale-75 rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="pt-28 pb-52 bg-primary scroll">
        <section className="section mb-28">
          <div className="container mx-auto">
            <div className="flex flex-col xl:flex-row gap-y-6 justify-between">
              <div className=" headline stast__item flex-1 xl:border-r  flex flex-col items-center">
                <div className="text-4xl xl:text-[64px] font-semibold text-white xl:mb-8">
                  +5128
                </div>
                <div className="text-white">Alumni</div>
              </div>
              <div className="stast__item flex-1 xl:border-r flex flex-col items-center">
                <div className="text-4xl xl:text-[64px] font-semibold text-white xl:mb-8">
                  26
                </div>
                <div  className="text-white">Laki-Laki</div>
              </div>
              <div className="stast__item flex-1 xl:border-r flex flex-col items-center">
                <div className="text-4xl xl:text-[64px] font-semibold text-white xl:mb-8">
                  56
                </div>
                <div  className="text-white">Perempuan</div>
              </div>
             
            </div>
          </div>
        </section>
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full self-end px-4 lg:w-1/2">
                <div className="mt-14 relative lg:mt-0 lg:left-2">
                  <img
                    src={join}
                    alt="adtyamm"
                    className="max-w-full mx-auto scale-90 rounded-2xl"
                  />
                </div>
              </div>
              <div className="w-full self-center px-4 lg:w-1/2">
                <p className="font-medium text-base text-stroke mb-6 kg:text-lg text-justify text-white">
                  "Ayo bergabung bersama kami di Ikatan Alumni Teknik
                  Informatika UIN SGD Bandung ! Kami membuka pelukan untuk
                  menyambut semua alumni dengan hangat. Bersama, kita dapat
                  mempererat jaringan, berbagi pengalaman, dan membangun
                  komunitas yang kuat. Mari berkontribusi pada pengembangan
                  Teknik Informatika UIN SGD Bandung dan menjadikan masa alumni
                  sebagai waktu yang penuh inspirasi. Yuk, jalin kembali
                  kenangan, temukan teman-teman baru, dan teruslah terhubung
                  dengan alma mater kita. Ayo, bergabunglah dalam perjalanan
                  ini, karena bersama-sama, kita bisa mencapai lebih banyak
                  hal!"
                </p>
                <button
                  variant="primary"
                  className="bg-blue-500 text-white py-2 px-4 flex items-center font-bold"
                >
                  <span className="text-2xl">🤝</span>
                  <span>Gabung sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="berita" className="pt-36 pb-32 bg-slate-100 scroll">
          <div className="container mx-auto">
            <div className="w-full px-4">
              <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="font-bold text-primary text-3xl mb-4 sm:text-4xl lg:text-5xl">
                  Berita Terkini
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
                  <img
                    src="https://source.unsplash.com/360x200?programming"
                    alt="alt"
                    className="w-full"
                  />
                  <div className="py-6 px-6">
                    <h3>
                      <a
                        href="#"
                        className="block mb-3 font-semibold text-xl text-primary hover:text-highlight truncate"
                      >
                        Tips Belajar Programming
                      </a>
                    </h3>
                    <p className="font-medium text-base text-stroke mb-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium, numquam!
                    </p>
                    <div className="flex justify-end pt-4">
                      <a
                        href="#"
                        className="font-medium text-sm text-white bg-blue-500 py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                      >
                        Baca Selengkapnya
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
                  <img
                    src="https://source.unsplash.com/360x200?animation+3d"
                    alt="3d"
                    className="w-full"
                  />
                  <div className="py-6 px-6">
                    <h3>
                      <a
                        href="#"
                        className="block mb-3 font-semibold text-xl text-primary hover:text-highlight truncate"
                      >
                        Belajar 3D Design
                      </a>
                    </h3>
                    <p className="font-medium text-base text-stroke mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Beatae, laborum obcaecati! Numquam.
                    </p>
                    <div className="flex justify-end pt-4">
                      <a
                        href="#"
                        className="font-medium text-sm text-white bg-blue-500 py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                      >
                        Baca Selengkapnya
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
                  <img
                    src="https://source.unsplash.com/360x200?mechanical+keyboard"
                    alt="Mechanical Keyboard"
                    className="w-full"
                  />
                  <div className="py-6 px-6">
                    <h3>
                      <a
                        href="#"
                        className="block mb-3 font-semibold text-xl text-primary hover:text-highlight truncate"
                      >
                        Review Keyboard GT-65
                      </a>
                    </h3>
                    <p className="font-medium text-base text-stroke mb-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing
                      elit.asdfasdfasdf
                    </p>
                    <div className="flex justify-end pt-4">
                      <a
                        href="#"
                        className="font-medium text-sm text-white bg-blue-500 py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                      >
                        Baca Selengkapnya
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex">
                <p className="flex pt-6 text-2xl text-blue-400">
                  Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="32"
                    viewBox="0 0 32 32"
                    id="arrow"
                    className="ml-2 mt-1 fill-current"
                  >
                    <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"></path>
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
