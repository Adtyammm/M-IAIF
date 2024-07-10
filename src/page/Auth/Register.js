import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../../config/Firebase";
import {useNavigate} from "react-router-dom";
import if_uin from "../../assets/images/if_uin.png";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState();
  const [gender, setGender] = useState("");
  const [yearClass, setYearClass] = useState();
  const [graduated, setGraduated] = useState();
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const registerUser = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userDocRef = collection(db, "users");
        await addDoc(userDocRef, {
          uid: user.uid,
          email,
          password,
          name,
          nim,
          gender,
          yearClass,
          graduated,
          phone,
          avatar: null,
        });
      }

      return user;
    } catch (error) {
      console.error("Gagal mendaftar:", error.message);
      throw error;
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Kata sandi tidak sesuai");
        return;
      }

      const user = await registerUser(name, email, password);

      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Gagal mendaftar:", error.message);
    }
  };

  return (
    <section className="bg-gray-100 min-h-svh flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5">
        <div className="w-2/3 px-8">
          <h2 className="text-2xl font-bold text_primary mt-16">
            Ikatan Alumni Teknik Informatika
          </h2>
          <hr className="border-black mb-6" />
          <h2 className="font-bold text-2xl text_primary">Register</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-2 mt-4 rounded-xl border "
              type="text"
              name="nama"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-2 mt-4 rounded-xl border"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 mt-1 rounded-xl border"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="p-2 mt-1 rounded-xl border"
              type="password"
              name="password"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className="p-2 mt-1 rounded-xl border"
              type="text"
              name="nim"
              placeholder="NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
           
            <input
              className="p-2 mt-1 rounded-xl border "
              type="text"
              name="angkatan"
              placeholder="Angkatan"
              value={yearClass}
              onChange={(e) => setYearClass(e.target.value)}
            />
            <input
              className="p-2 mt-1 rounded-xl border"
              type="text"
              name="angkatan"
              placeholder="Tahun Lulus (Contoh : 2024)"
              value={graduated}
              onChange={(e) => setGraduated(e.target.value)}
            />
            <input
              className="p-2 mt-1 rounded-xl border"
              type="text"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
             <div className="box flex">
              <label className="">
                <input
                className="peer"
                  type="radio"
                  value="Perempuan"
                  checked={gender === "Perempuan"}
                  onChange={() => setGender("Perempuan")}
                />
               {" "} Perempuan
              </label>

              <label className="ml-4">
                <input 
                  className=""
                  type="radio"
                  value="Laki-Laki"
                  checked={gender === "Laki-Laki"}
                  onChange={() => setGender("Laki-Laki")}
                />
                {" "}Laki-laki
              </label>
            </div>
          </div>
          <button
            onClick={handleRegister}
            className="bg-primary rounded-xl mt-4 py-2 text-white font-bold px-[265px]"
          >
            Register
          </button>
          <div className="mt-3 text-sm flex justify-between items-center">
            <p>Sudah punya akun?</p>
            <button className="py-2 px-5 bg-white border rounded-xl">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
        <div className="sm:block hidden w-1/3 ">
          <img className="mt-4 rounded-2xl mt-[67px]" src={if_uin} alt="if_uin" />
        </div>
      </div>
      
    </section>
  );
};

export default Register;
