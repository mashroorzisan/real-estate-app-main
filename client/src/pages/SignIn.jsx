import { set } from "mongoose";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setCreated(null); //usercreation unsuccessful
        setLoading(false);
        return;
      }
      setError(null);
      setCreated(data); //usercreation successful
      setLoading(false);
      navigate("/");
    } catch (error) {
      setCreated(null); //usercreation unsuccessful
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 focus:outline-none"
      >
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-3 focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-3 focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700  uppercase text-white rounded-lg p-3 hover:opacity-88 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 mt-5 uppercase">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-600 font-semibold">Sign Up</span>
        </Link>
      </div>
      {/* after creation */}
      {created && <p className="text-green-500 mt-5">{created}</p>}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
