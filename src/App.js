import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";
import AdminPage from "./components/Admin/AdminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/Home/ProductDetails";
import Profile from "./components/Home/ProfilePage";
import AuthPage from "./components/Authentication/AuthPage";
import CategoryPage from "./components/Home/CategoryPage";
import SubcategoryPage from "./components/Home/SubcategoryPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin-dashboard" element={<AdminPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/subcategory/:subcategoryId" element={<SubcategoryPage />} />
                    <Route path="/product-details" element={<ProductDetails />} />

                    {/*<Route path="/product/:id" element={<ProductDetails/>} /> /!* Product details route *!/*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
