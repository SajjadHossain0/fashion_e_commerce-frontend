import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";
import AdminPage from "./components/Admin/AdminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/Home/ProductDetails";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin-dashboard" element={<AdminPage />} />
                    <Route path="/product/:id" element={<ProductDetails/>} /> {/* Product details route */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
