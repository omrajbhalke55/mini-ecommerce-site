import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.svg";

export default function Login() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // If already logged in, go home
  if (currentUser) {
    navigate("/");
    return null;
  }

  function validate() {
    const e = {};
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.password) e.password = "Password is required";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const result = login({ email: form.email, password: form.password });
    if (result.success) {
      navigate("/");
    } else {
      setServerError(result.error);
    }
  }

  function field(name, label, type = "text", placeholder = "") {
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
        <input
          type={type}
          value={form[name]}
          onChange={(e) => {
            setForm({ ...form, [name]: e.target.value });
            setErrors({ ...errors, [name]: "" });
            setServerError("");
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-[#F5FAFF] text-gray-800 outline-none transition-colors focus:border-[#2AA7A1] ${errors[name] ? "border-red-400" : "border-[#6B8A9B]/50"}`}
        />
        {errors[name] && <p className="text-[11px] text-red-500 mt-1">{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5FAFF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="MediHAA" className="h-14 w-auto" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-400 mb-6">Log in to your MediHAA account</p>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {field("email", "Email Address", "email", "rahul@example.com")}
            {field("password", "Password", "password", "Your password")}

            <button
              type="submit"
              className="w-full py-3 bg-[#2AA7A1] text-white font-bold rounded-lg hover:bg-[#23918c] transition-colors border-none cursor-pointer mt-2"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2AA7A1] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}