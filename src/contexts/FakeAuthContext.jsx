import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthincated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthincated: true };
    case "logout":
      return { ...state, user: null, isAuthincated: false };
    default:
      throw new Error("Unknown Action !");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthincated }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    console.log(email === FAKE_USER.email && password === FAKE_USER.password);
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      throw new Error("email or password not found");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthincated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider ");
  return context;
}

export { AuthProvider, useAuth };
