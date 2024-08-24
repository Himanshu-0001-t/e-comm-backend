import CartModal from "../models/cart.modal.js"
import productModal from "../models/product.model.js"
import Response from "../helper/response.js"

export const createOrUpdateCart = async (req, res) => {
    const { userId, product } = req.body;

    if (!userId || !product) {
        return Response.error(res, "All field are required")
    }

    try {
        let cart = await CartModal.findOne({ userId });

        if (cart) {
            const existingProduct = cart.products.find((p) => product.productId == p.productId)

            if (existingProduct) {
                existingProduct.quantity += product.quantity;

            } else {
                cart.products.push(product);
            }

        } else {

            cart = new CartModal({ userId: userId, products: product });
        }

        await cart.save();

        return Response.success(res, "Cart added successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const getCartByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await CartModal.findOne({ userId: id }).populate('userId', '-password -email -address').populate('products.productId', '-stock')

        if (!cart) {
            return Response.notFound(res, "cart not found")
        }
        let totalPrice = 0
        for (let i = 0; i < cart.products.length; i++) {
            totalPrice += (cart.products[i].productId.price * cart.products[i].quantity)
        }
        return Response.success(res, { cart, totalPrice }, "cart feached successfully")

    } catch (error) {
        return Response.error(res, "server error", 500, error)
    }
};

export const updateProductQuantity = async (req, res) => {

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return Response.error(res, "All field are required")
    }

    try {
        const cart = await CartModal.findOne({ userId });

        if (!cart) {
            return Response.notFound(res, "cart not found")
        }

        const cartProduct = cart.products.find((product) => product.productId.toString() == productId)

        if (!cartProduct || cartProduct.length == 0) {
            return Response.notFound(res, "product not found")
        }

        const product = await productModal.findById(cartProduct.productId)

        if (!product) {
            return Response.notFound(res, "product not found")
        }

        cartProduct.quantity = quantity;

        const saved = await cart.save();

        if (!saved) {
            return Response.error(res, "error while saving cart")
        }

        return Response.success(res, cart, "cart product updated successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const removeProductFromCart = async (req, res) => {

    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return Response.error(res, "All field are required")
    }
    try {
        let cart = await CartModal.findOne({ userId });
        if (cart) {
            const productToRemove = cart.products.find(p => p.productId.toString() === productId);

            if (productToRemove) {
                cart.products = cart.products.filter(p => p.productId.toString() !== productId);
                await cart.save();

            } else {
                return Response.notFound(res, "Product not found in cart")
            }
        } else {
            return Response.notFound(res, "cart not found")
        }

        return Response.success(res, "Product remove from cart")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const clearCart = async (req, res) => {

    const { userId } = req.body;

    if (!userId) {
        return Response.error(res, "All field are required")
    }

    try {
        const cart = await CartModal.findOne({ userId });

        if (!cart) {
            return Response.notFound(res, "cart not found")
        }

        cart.products = [];

        await cart.save();
        return Response.success(res, "cart clear successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

