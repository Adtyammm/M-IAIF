import React, { useEffect, useState, useCallback } from "react";
import { db, storage } from "../../config/Firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Header from "../components/Header";
import alumni from "../../assets/images/image_1_about.png";
import join from "../../assets/images/join.jpg";
import Footer from "../components/Footer";
import ScrollReveal from "scrollreveal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faMale,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import SliderNews from "../components/SliderNews";

const Home = () => {
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [maleAlumni, setMaleAlumni] = useState(0);
  const [femaleAlumni, setFemaleAlumni] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, "users");

        const totalQuerySnapshot = await getDocs(usersCollection);
        setTotalAlumni(totalQuerySnapshot.size);

        const maleQuery = query(
          usersCollection,
          where("gender", "==", "Laki-Laki")
        );
        const maleQuerySnapshot = await getDocs(maleQuery);
        setMaleAlumni(maleQuerySnapshot.size);

        const femaleQuery = query(
          usersCollection,
          where("gender", "==", "Perempuan")
        );
        const femaleQuerySnapshot = await getDocs(femaleQuery);
        setFemaleAlumni(femaleQuerySnapshot.size);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const newsCollection = collection(db, "news");
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const newsDataWithImages = await Promise.all(
        newsList.map(async (newsItem) => {
          if (newsItem.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `news/${newsItem.image}`)
            );
            return { ...newsItem, imageUrl };
          }
          return newsItem;
        })
      );

      setNewsData(newsDataWithImages);

      const popularNewsQuery = query(
        newsCollection,
        orderBy("views", "desc"),
        limit(5)
      );
      const popularNewsSnapshot = await getDocs(popularNewsQuery);
      const popularNewsList = popularNewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPopularNews(popularNewsList);
      console.log("Data Berita ", popularNewsList);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

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

        <section id="join" className="pt-20 pb-52 bg-primary scroll">
          <section className="section mb-10">
            <div className="container mx-auto">
              <div className="flex flex-col xl:flex-row gap-y-6 justify-between">
                <div className="headline stast__item flex-1 xl:border-r xl:border-l flex flex-col items-center">
                  <div className="flex flex-col items-center text-white">
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className="text-6xl mb-2"
                    />
                    <div className="mt-6 text-4xl xl:text-[64px] font-semibold xl:mb-8">
                      {totalAlumni}
                    </div>
                    <div>Alumni</div>
                  </div>
                </div>
                <div className="stast__item flex-1 xl:border-r flex flex-col items-center">
                  <div className="flex flex-col items-center text-white">
                    <FontAwesomeIcon icon={faMale} className="text-6xl mb-2" />
                    <div className="mt-6 text-4xl xl:text-[64px] font-semibold xl:mb-8">
                      {maleAlumni}
                    </div>
                    <div>Laki-Laki</div>
                  </div>
                </div>
                <div className="stast__item flex-1 xl:border-r flex flex-col items-center">
                  <div className="flex flex-col items-center text-white">
                    <FontAwesomeIcon
                      icon={faFemale}
                      className="text-6xl mb-2"
                    />
                    <div className="mt-6 text-4xl xl:text-[64px] font-semibold xl:mb-8">
                      {femaleAlumni}
                    </div>
                    <div>Perempuan</div>
                  </div>
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
                  Informatika UIN SGD Bandung! Kami membuka pelukan untuk
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

        <section id="berita" className="pt-32 pb-32 bg-slate-100 scroll">
          <div className="container mx-auto">
            <div className="w-full px-4">
              <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="font-bold text-primary text-3xl mb-4 sm:text-4xl lg:text-5xl">
                  Berita Terkini
                </h2>
              </div>
            </div>

            <SliderNews />

            <div className="flex justify-end pt-4">
              <Link
                to="/news"
                className="font-medium text-sm text-blue-500 py-2 px-4 rounded-lg hover:opacity-60 duration-300 flex items-center"
              >
                Baca Selengkapnya
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
