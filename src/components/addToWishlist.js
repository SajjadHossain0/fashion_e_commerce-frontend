import apiClient from "./API/apiClient";
import successNotify from "./successNotify";
import errorNotify from "./errorNotify";

export const addToWishlist = async (userId, productId) => {
    try{
        await apiClient.post(`/wishlist/${userId}/${productId}`);
        successNotify("Product added to Wishlist successfully.");
    }
    catch(error) {
        errorNotify("Failed to add product to Wishlist");
        console.error("Error adding product:", error);
    }
}