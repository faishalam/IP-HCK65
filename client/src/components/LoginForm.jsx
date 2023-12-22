import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


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

      toast.success('Login success!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.error(error);
      toast.error('Invalid email/password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
      const { data } = await Axios.post("http://localhost:3000/google-login", { google_token: google_token });
      localStorage.setItem("access_token", data.access_token);

      navigate('/');

      toast.success('Login success!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1542988538-102c740f293d?q=80&w=3433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex justify-center items-center h-screen overflow-hidden">
        <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-grey-600 text-white">
          <h2 className="text-2xl font-bold pb-5 text-white-950">
            {" "}
            Login{" "}
          </h2>
          <form onSubmit={handleOnSubmit}>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white-950"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleOnChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="input your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white-950"
              >
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleOnChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="input your password"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
              >
                Submit
              </button>
              <div className="flex items-center text-sm text-white-950">
                <p>New here?</p>
                <Link to={"/register"}>
                  <p className="underline cursor-pointer ml-1 text-white-950">
                    Register
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
