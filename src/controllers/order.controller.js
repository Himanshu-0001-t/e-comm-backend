import orderModal from "../models/order.modal.js"
import productModal from "../models/product.model.js"
import Response from "../helper/response.js"
import CartModal from "../models/cart.modal.js"


export const createOrder = async (req, res) => {

    try {
        const { userId, products, paymentInfo, shippingAddress } = req.body;

        if (!userId || !products || !paymentInfo || !shippingAddress) {
            return Response.error(res, 'All fields are required');
        }

        let totalPrice = 0;
        let productInDb

        for (const item of products) {
            let id = item.productId ? item.productId : item._id
            productInDb = await productModal.findById(id);

            if (!productInDb) {
                return Response.notFound(res, `Product with ID ${item.productId} not found`)
            }
            let quantity = 1
            if (item.quantity) {
                productInDb.stock = productInDb.stock - item.quantity;
                totalPrice += productInDb.price * item.quantity;
            } else {
                productInDb.stock = productInDb.stock - quantity;
                totalPrice = productInDb.price
            }
        }

        const order = new orderModal({
            userId,
            products,
            totalPrice,
            paymentInfo,
            shippingAddress,
        });


        if (products.length > 1 || products[0].quantity > 1) {
            const cart = await CartModal.findOne({ userId });

            if (!cart) {
                return Response.notFound(res, "cart not found")
            }

            cart.products = [];
            await cart.save();
        }

        const savedOrder = await order.save();

        if (!savedOrder) {
            return Response.error(res, "error while saving order")
        }

        await productInDb.save()

        return Response.success(res, savedOrder, "order created successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const getOrders = async (req, res) => {
    try {
        let id = req.params.id

        const orders = await orderModal.find({ userId: id }).populate('userId').populate('products.productId');

        if (!orders || orders.length == 0) {
            return Response.notFound(res, "order not found")
        }

        return Response.success(res, orders, "order feached successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const getOrderById = async (req, res) => {
    const _id = req.params.id;

    try {
        const order = await orderModal.findById(_id).populate('userId').populate('products.productId');

        if (!order) {
            return Response.notFound(res, "order not found")
        }

        return Response.success(res, order, "order feached successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
};

export const updateOrder = async (req, res) => {
    const _id = req.params.id;

    try {
        const order = await orderModal.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!order) {
            return Response.notFound(res, "order not found")
        }

        return Response.success(res, order, "order updated successfully")

    } catch (error) {
        return Response.error(res, "server error", 500, error)
    }
};

export const deleteOrder = async (req, res) => {
    const _id = req.params.id;
    try {
        const order = await orderModal.findByIdAndDelete(_id);

        if (!order) {
            return Response.notFound(res, "order not found")
        }

        return Response.success(res, "order deleted successfully")

    } catch (error) {
        return Response.error(res, "server error", 500, error)
    }
};

