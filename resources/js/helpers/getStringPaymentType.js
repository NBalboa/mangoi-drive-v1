export function getStringPaymentType(payment_type) {
    if (payment_type === 0) {
        return "CASH";
    } else if (payment_type === 1) {
        return "PAYPAL";
    } else {
        return "GCASH";
    }
}
