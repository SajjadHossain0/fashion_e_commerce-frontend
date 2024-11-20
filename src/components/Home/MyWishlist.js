import React, {useEffect, useState} from "react";
import HeaderWithSidebar from "./HeaderWithSidebar";
import Footer from "../Footer/Footer";
import {FaHeart, FaTrashAlt} from "react-icons/fa";
import './MyWishlist.css'
import apiClient from "../API/apiClient";
import {ToastContainer} from "react-toastify";
import successNotify from "../successNotify";
import errorNotify from "../errorNotify";

export default function MyWishlist() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchWishList = async () => {
        try{
            const response = await apiClient.get(`/wishlist/${userId}`);
            setWishlist(response.data);
        }catch(error){
            console.error("Error fetching wishlist:", error);
        }
    }

    const handleDelete = async (productId) => {
        try {
            await apiClient.delete(`/wishlist/${userId}/${productId}`);
            successNotify("Item removed from wishlist!");
            fetchWishList(); // Refresh the wishlist
        } catch (error) {
            console.error("Error deleting wishlist item:", error);
            errorNotify("Failed to remove item!");
        }
    };

    useEffect(() => {
        fetchWishList();
    }, []);

    return (
        <div className="homepage">
            <HeaderWithSidebar/>
            <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>

                <div align="center" className="myWishlist-heading">
                    <span><FaHeart/></span>
                    <h1>My Wishlist</h1>
                </div>

                <div align="center" className="myWishlist-table">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Stock Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {wishlist.map((item,index) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={`data:image/jpeg;base64,${item.product.image}`}
                                         alt={item.title}
                                         height="80" width="80"/>
                                    {item.product.title}
                                </td>
                                <td>৳{item.product.discountedPrice}</td>
                                <td>{item.product.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                                <td>
                                    {/*<span>{item.addedAt}</span>*/}
                                    <button className="add-to-cart-btn">
                                        <a href="/cart">Add to Cart</a>
                                    </button>
                                    <a
                                        style={{color: "#ff6f61", fontSize: 25, marginLeft: 10, cursor: "pointer"}}
                                        onClick={() => handleDelete(item.product.id)} // Trigger delete for specific product
                                    >
                                        <FaTrashAlt/>
                                    </a>
                                </td>
                            </tr>
                        ))}

                        </tbody>

                    </table>
                </div>

                <ToastContainer/>
            </main>
            <Footer/>
        </div>

    )
}