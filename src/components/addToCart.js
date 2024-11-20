import apiClient from "./API/apiClient";
import successNotify from "./successNotify";
import errorNotify from "./errorNotify";

export const addToCart = async (userId, productId, quantity, size) => {
    try{
        const response = await apiClient.post(`/cart/add`,null,{
            params: {
                userId,
                productId,
                quantity,
                size
            },
        });
        successNotify("Product added to Cart successfully.");
        return response.data;
    }
    catch(error) {
        errorNotify("Failed to add product to Cart");
        console.error("Error adding product to cart:", error);
        throw error;
    }
}