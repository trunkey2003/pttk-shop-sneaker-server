const product = require("../../integration/product");
const Order = require("../../integration/order");

class OrderController {
    createOrder(req, res) {
        const newOrder = new Order(req.body);
        newOrder.save();
        res.status(201).json({
            success: true,
            newOrder,
        });
    }

    async getOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return next(new Error());
            }

            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) return next(new Error());
            else await order.deleteOne();
            res.status(200).json({
                message: "order deleted successfully",
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new OrderController();
