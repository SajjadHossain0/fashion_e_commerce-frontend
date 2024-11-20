import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";
import AdminPage from "./components/Admin/AdminPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProductDetails from "./components/Home/ProductDetails";
import Profile from "./components/Home/ProfilePage";
import AuthPage from "./components/Authentication/AuthPage";
import CategoryPage from "./components/Home/CategoryPage";
import SubcategoryPage from "./components/Home/SubcategoryPage";
import CartPage from "./components/Home/CartPage";
import SearchResults from "./components/Home/SearchResults";
import MyWishlist from "./components/Home/MyWishlist";
import CheckoutPage from "./components/Home/CheckoutPage";

function App() {

    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        console.log("Checking authentication. Token exists:", !!token);
        return !!token;
    };

    const isAdmin = () => {
        const role = localStorage.getItem("role");
        console.log("Checking admin role. Role:", role);
        return role === "ROLE_ADMIN";
    };

    const isUser = () => {
        const role = localStorage.getItem("role");
        console.log("Checking user role. Role:", role);
        return role === "ROLE_USER";
    };


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<SearchResults/>}/>

                    <Route path="/admin-dashboard"
                           element={isAdmin() ? <AdminPage/> : <Navigate to="/auth"/>}/>
                    <Route path="/admin-dashboard"
                           element={isUser() ? <HomePage/> : <Navigate to="/auth"/>}/>

                    <Route path="/profile"
                           element={isAuthenticated() ? <Profile/> : <Navigate to="/auth"/>}/>

                    <Route path="/cart"
                           element={isAuthenticated() ? <CartPage/> : <Navigate to="/auth"/>}/>
                    <Route path="/my-wishlist"
                           element={isAuthenticated() ? <MyWishlist/> : <Navigate to="/auth"/>}/>
                    <Route path="/checkout"
                           element={isAuthenticated() ? <CheckoutPage/> : <Navigate to="/auth"/>}/>

                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/category/:categoryId" element={<CategoryPage/>}/>
                    <Route path="/subcategory/:subcategoryId" element={<SubcategoryPage/>}/>
                    <Route path="/product-details" element={<ProductDetails/>}/>

                    {/*<Route path="/product/:id" element={<ProductDetails/>} /> /!* Product details route *!/*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
