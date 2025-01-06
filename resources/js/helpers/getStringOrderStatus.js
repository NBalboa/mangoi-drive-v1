export function getStringOrderStatus(status) {
    if (status === 0) {
        return "PENDING";
    } else if (status === 1) {
        return "CONFIRMED";
    } else if (status === 2) {
        return "READY";
    } else if (status === 3) {
        return "TO DELIVER";
    } else if (status === 4) {
        return "DELIVERED";
    } else if (status === 5) {
        return "CANCELLED";
    } else {
        return "OPPPS";
    }
}
