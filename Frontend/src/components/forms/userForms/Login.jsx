import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcPrivacy, FcCurrencyExchange } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";
import { login } from "../../../state/features/User/Auth/authSlice";
import { adminLogin } from "../../../state/features/Admin/Auth/adminAuthSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { Logo } from "../../shared/Logo";

export default function Login() {
  const [role, setRole] = useState("user");
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    msg: "",
  });

  const { email, password, msg } = formInputs;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.userAuth);
  const adminAuth = useSelector((state) => state.adminAuth);

  const authState = role === "admin" ? adminAuth : userAuth;

  useEffect(() => {
    if (authState.isError) {
      setFormInputs({ ...formInputs, msg: authState.message });
    }

    if ((role === "admin" && authState.info) || (role === "user" && authState.user)) {
      setFormInputs({ ...formInputs, msg: "Login Successfully" });
      navigate("/");
    }
  }, [authState, role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormInputs({ ...formInputs, msg: "" });

    const credentials = {
      email: email.trim(),
      password,
    };

    if (role === "admin") {
      dispatch(adminLogin(credentials));
    } else {
      dispatch(login(credentials));
    }
  };

  return (
    <div className="block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 max-w-md w-full mx-auto">
      <Logo />
      <h3 className="text-center text-xl font-bold text-blue-800 mb-4">Choose Account Type</h3>

      <div className="flex justify-center gap-6 mb-6">
        <div
          className={`p-4 border rounded cursor-pointer ${role === "admin" ? "bg-blue-100 border-blue-700" : "border-gray-300"}`}
          onClick={() => setRole("admin")}
        >
          <FcPrivacy size={50} className="mx-auto" />
          <p className="text-center mt-2 font-semibold">Admin</p>
        </div>

        <div
          className={`p-4 border rounded cursor-pointer ${role === "user" ? "bg-blue-100 border-blue-700" : "border-gray-300"}`}
          onClick={() => setRole("user")}
        >
          <FcCurrencyExchange size={50} className="mx-auto" />
          <p className="text-center mt-2 font-semibold">User</p>
        </div>
      </div>

      <p className="text-center font-semibold text-gray-700 mb-4">Hello {role}! Please login below:</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-800">Email address</label>
          <input
            type="email"
            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
            value={email}
            onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-800">Password</label>
          <input
            type="password"
            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
            value={password}
            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
            placeholder="Enter your Password"
            required
          />
        </div>

        <div className="flex justify-end mb-4">
          <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
        </div>

        {(authState.isError || authState.isSuccess) && (
          <MessagesContainer msg={msg} isSuccess={authState.isSuccess} isError={authState.isError} />
        )}

        <FormButton
          text={{ loading: "Processing", default: "Login" }}
          isLoading={authState.isLoading}
          icon={<RiLoginCircleFill className="ml-2" size={24} />}
        />

        <p className="text-center mt-6 text-sm">
          Not registered?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
