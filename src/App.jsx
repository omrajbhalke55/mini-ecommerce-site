import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}