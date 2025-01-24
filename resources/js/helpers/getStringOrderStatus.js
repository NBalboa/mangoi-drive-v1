export function getStringOrderStatus(status) {
    if (status === 0) {
        return "PENDING";
    } else if (status === 1) {
        return "CANCEL";
    } else if (status === 2) {
        return "CONFIRM";
    } else if (status === 3) {
        return "READY";
    } else if (status === 4) {
        return "TO DELIVER";
    } else if (status === 5) {
        return "DELIVERED";
    } else {
        return "OPPPS";
    }
}
