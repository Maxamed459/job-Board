import { Outlet } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import Header from "./components/Header";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

export default App;
