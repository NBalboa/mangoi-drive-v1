export function getStringOrderType(order_type) {
    if (order_type === 0) {
        return "Dine-in";
    } else if (order_type === 1) {
        return "Take Out";
    } else if (order_type === 2) {
        return "Delivery";
    }
}
