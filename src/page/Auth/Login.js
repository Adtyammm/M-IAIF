import React, { useState } from "react";
import { auth, db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import if_uin from "../../assets/images/if_uin.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login Berhasil:", user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      try {
        const userCollectionRef = collection(db, "users");
        const userDocRef = query(
          userCollectionRef,
          where("email", "==", email),
          where("password", "==", password)
        );
        const userDocSnapshot = await getDocs(userDocRef);

        if (userDocSnapshot.size > 0) {
          await createUserWithEmailAndPassword(auth, email, password);
          // navigate("/");
        } else {
          alert("Data pengguna tidak ditemukan.");
        }
      } catch (innerError) {
        console.error(
          "Gagal mencocokkan email dan password:",
          innerError.message
        );
      }
    }
  };

  return (
    <section className="bg-slate-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 px-16">
          <h2 className="text-2xl font-bold text_primary mt-16">
            Ikatan Alumni Teknik Informatika
          </h2>
          <hr className="border-black mb-6" />
          <h2 className="font-bold text-2xl text_primary mb-4">Login</h2>

          <div className="flex flex-col gap-4">
            <input
              className="p-2 mt-4 rounded-xl border"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 mt-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-primary rounded-xl mt-4 py-2 text-white"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="mt-3 text-sm flex justify-between items-center">
              <p>Belum punya akun?</p>
              <button className="py-2 px-5 bg-white border rounded-xl">
                <a href="/register">Register</a>
              </button>
            </div>
          </div>
        </div>

        <div className="sm:block hidden w-1/2 ">
          <img className="mt-4 rounded-2xl " src={if_uin} alt="if_uin" />
        </div>
      </div>
    </section>
  );
};

export default Login;
