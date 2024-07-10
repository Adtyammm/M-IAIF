import uin from "../../assets/images/logo_uin.png";
import logo from "../../assets/images/if-logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary pt-8">
        <div className="container">
          <div className="flex">
            <div className="flex px-10">
              <div className="flex items-center mb-4">
                <img src={uin} alt="" className="w-20 h-20 mr-2 hidden sm:block" />
                <img src={logo} alt="" className="w-20 h-20 hidden sm:block" />
              </div>
            </div>
            <div className="w-full px-2 mb-8 text-slate-300 font-medium">
              <h2 className="font-bold text-2xl text-white ">Teknik Informatika</h2>
              <h3 className="font-medium text-xl mb-5">Universitas Islam Negeri Sunan Gunung Djati</h3>
              <p>Jl.A.H. Nasution No. 105A, Cipadung, Cibiru </p>
              <p>Kota Bandung, Jawa Barat</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
