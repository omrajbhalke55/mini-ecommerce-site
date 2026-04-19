import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Helper: read/write all users from localStorage
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("medihaa-users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("medihaa-users", JSON.stringify(users));
}

function getStoredCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("medihaa-current-user") || "null");
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getStoredCurrentUser());

  // SIGNUP — creates a new account
  function signup({ name, email, password }) {
    const users = getUsers();

    // Check if email already exists
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // In real apps NEVER store plain password. This is localStorage-only mock.
      joinedAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);

    // Auto-login after signup
    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, joinedAt: newUser.joinedAt };
    localStorage.setItem("medihaa-current-user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);

    return { success: true };
  }

  // LOGIN — checks credentials
  function login({ email, password }) {
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, joinedAt: user.joinedAt };
    localStorage.setItem("medihaa-current-user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);

    return { success: true };
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("medihaa-current-user");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}