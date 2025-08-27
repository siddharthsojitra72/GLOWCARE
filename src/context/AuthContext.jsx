import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({}); // simple local user store keyed by email

  useEffect(() => {
    try {
      const saved = localStorage.getItem("glowcare_auth_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
      const savedUsers = localStorage.getItem("glowcare_users");
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }

      // Seed default user from environment variables or fallback defaults
      const defaultEmail = "you@example.com";
      const defaultPassword = "123456";
      const envEmail = (import.meta?.env?.VITE_AUTH_EMAIL || defaultEmail).trim().toLowerCase();
      const envPassword = (import.meta?.env?.VITE_AUTH_PASSWORD || defaultPassword).trim();
      const current = JSON.parse(localStorage.getItem("glowcare_users") || "{}");
      if (envEmail && envPassword && !current[envEmail]) {
        const next = { ...current, [envEmail]: { email: envEmail, password: envPassword, name: "" } };
        localStorage.setItem("glowcare_users", JSON.stringify(next));
        setUsers(next);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("glowcare_auth_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("glowcare_auth_user");
      }
    } catch {
      /* ignore */
    }
  }, [user]);

  const persistUsers = (next) => {
    setUsers(next);
    try {
      localStorage.setItem("glowcare_users", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const register = (email, password, name = "") => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail || !password) return { ok: false, error: "Email and password required" };
    if (users[normalizedEmail]) return { ok: false, error: "Account already exists" };
    const next = { ...users, [normalizedEmail]: { email: normalizedEmail, password, name } };
    persistUsers(next);
    return { ok: true };
  };

  const authenticate = (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const record = users[normalizedEmail];
    if (!record) return { ok: false, reason: "not_found" };
    if (record.password !== password) return { ok: false, reason: "invalid_password" };
    return { ok: true, user: { email: record.email, name: record.name || "" } };
  };

  const login = (email, name = "") => {
    setUser({ email, name });
  };

  const logout = () => setUser(null);

  const updateProfile = (partial) => {
    setUser((prev) => {
      if (!prev) return prev;
      const nextUser = { ...prev, ...partial };
      try {
        localStorage.setItem("glowcare_auth_user", JSON.stringify(nextUser));
      } catch {
        /* ignore */
      }
      const email = nextUser.email?.toLowerCase?.() || "";
      if (email) {
        const current = JSON.parse(localStorage.getItem("glowcare_users") || "{}");
        const existing = current[email] || { email };
        const nextUsers = { ...current, [email]: { ...existing, ...partial } };
        try {
          localStorage.setItem("glowcare_users", JSON.stringify(nextUsers));
        } catch {
          /* ignore */
        }
        setUsers(nextUsers);
      }
      return nextUser;
    });
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, register, authenticate, updateProfile }),
    [user, loading, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return children?.props?.fallback ?? null;
  return children;
};


