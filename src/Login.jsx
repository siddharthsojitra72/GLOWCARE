import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }
    const result = authenticate(email, password);
    if (!result.ok) {
      if (result.reason === "not_found") {
        navigate("/register", { state: { email }, replace: true });
        return;
      }
      if (result.reason === "invalid_password") {
        setError("Incorrect password");
        return;
      }
    }
    if (result.user) {
      login(result.user.email, result.user.name);
      navigate("/account", { replace: true });
    }
  };

  if (user) {
    navigate("/account", { replace: true });
    return null;
  }

  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-600 mb-6">Sign in to manage your orders and profile.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-md font-medium hover:bg-primary/90">Sign in</button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/register" className="text-primary">Create one</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;



