import React from "react";
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import Footer from "../components/Footer";

const Discover = () => {
  function truncateText(text, maxLength) {
    let words = text.split(" ");
    if (words.length > maxLength) {
      words = words.slice(0, maxLength);
      return words.join(" ") + "...";
    }
    return text;
  }
  return (
    <>
      <Header />
      <div className="bg-slate-50">
        <div className="pt-24">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Portal Alumni</p>
            <a className="text-white text-xl mt-16 font-medium" href="/">
              Beranda{" "}
              <span className="ml-3 font-medium">
                {" "}
                <span className="mr-3 font-medium">></span> Discover
              </span>
            </a>
          </div>
        </div>
        <div className="container bg-red max-w-screen-lg flex justify-end mx-auto">
          <div className="mt-20">
            <a
              href="/newpost"
              className=" text-lg text-[#a1a4aa] hover:text-primary "
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{color: "#a1a4aa"}}
                className="mr-1.5 pb-0.5 text-2xl "
                size="lg"
              />
              Buat Postingan
            </a>
          </div>
        </div>

        <section id="blog" className="pb-16 pt-8 w-full sm:w-max-screen-md">
          <div className="container mx-auto max-w-screen-lg flex">
            <div className="flex flex-wrap px-4 mx-auto">
              <div className="w-full flex p-4">
                <div className="flex">
                  <p className="text-base text-primary font-medium mr-2 ">
                    Aditya Muhamad Maulana{" "}
                  </p>
                  <p className="font-bold mr-2">.</p>
                  <p>14 Februari 2024</p>
                </div>
              </div>
              <div className="flex-wrap pl-4 text-pretty">
                <h1 className="font-bold text-2xl text-balance max-w-lg">
                  IAIF Task : Fundamental Membangun Startup
                </h1>
                <p className="text-justify text-lg text-primary max-w-xl ">
                  {truncateText(
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aperiam eaque, maxime facilis deserunt rem voluptas harum quia, eius, repellat error est? Dolore ut dolorum autem voluptatum neque nobis iste rerum magnam, quo nisi quos sapiente aliquam sunt tempora! Sed.",
                    25
                  )}
                </p>
                <div className="flex pt-6">
                  <a
                    href="#"
                    className="font-medium text-sm text-white bg-primary py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                  >
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            </div>
            <img
              className="object-cover w-54 rounded-xl mt-6 hidden sm:block"
              src="https://source.unsplash.com/350x200?mechanical+keyboard"
              alt=""
            />
          </div>
          <hr className="max-w-screen-lg mx-auto mt-16 border-t-1 border-gray-700" />
        </section>
        <section id="blog" class=" pb-32">
          <div className="container mx-auto max-w-screen-md flex md:max-w-screen-lg">
            <div className="flex flex-wrap px-4 mx-auto">
              <div className="w-full  flex p-4">
                <div className="flex">
                  <p className="text-base text-primary font-medium mr-2 ">
                    Muhamad Irfan Maulana{" "}
                  </p>
                  <p className="font-bold mr-2">.</p>
                  <p>16 Juli 2024</p>
                </div>
              </div>
              <div className="flex-wrap pl-4 text-pretty">
                <h1 className="font-bold text-2xl text-balance max-w-lg">
                  IAIF : Research and Development Program
                </h1>
                <p className="text-justify text-lg text-primary max-w-xl ">
                  {truncateText(
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aperiam eaque, maxime facilis deserunt rem voluptas harum quia, eius, repellat error est? Dolore ut dolorum autem voluptatum neque nobis iste rerum magnam, quo nisi quos sapiente aliquam sunt tempora! Sed.",
                    25
                  )}
                </p>
                <div className="flex  pt-6">
                  <a
                    href="#"
                    className="font-medium text-sm text-white bg-primary py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                  >
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            </div>
            <img
              className="object-cover w-54 rounded-xl mt-6 hidden sm:block "
              src="https://source.unsplash.com/350x200?informatics"
              alt=""
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Discover;
