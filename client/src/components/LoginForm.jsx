import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await Axios.post("http://localhost:3000/login", form);
      console.log(data, '<<<');
      localStorage.setItem("access_token", data.access_token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleCredentialResponse = async (response) => {
    try {
      const google_token = response.credential;
      const { data } = await Axios.post("http://localhost:3000/google-login", { google_token : google_token });
      localStorage.setItem("access_token", data.access_token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "256687572511-dvba08opo0f52fb4im5ho9cce4v4gmub.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="h-screen flex justify-center mx-10 my-10">
      <div className="relative overflow-hidden md:flex w-1/2 justify-around items-center">
        <div className=''>
          <figure>
            <img src="https://res.cloudinary.com/de2dlumua/image/upload/v1702139297/mqwxprs8lczvsdayi2lh.png" alt="" />
          </figure>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleOnSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-96">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleOnChange}
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleOnChange}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
          <div id="buttonDiv" type="button">
            <p>jhahahaha</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
