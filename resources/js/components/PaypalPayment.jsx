import { router, usePage } from "@inertiajs/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

function PaypalPayment({ disabled = true, onCreateOrder, onApprove, onError }) {
    const { auth } = usePage().props;
    const initialOptions = {
        currency: "PHP",
        clientId:
            "AdRKyqWyNs1X4S2gKH8soI6PcFQPwZymqHCZZMSOPmbiadVkMDN8hmw_kgR40K31DHDA0ASBEpHwSft0",
        intent: "capture",
    };
    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                disabled={disabled}
                style={styles}
                createOrder={onCreateOrder}
                onApprove={onApprove}
                onError={onError}
                fundingSource="paypal"
            />
        </PayPalScriptProvider>
    );
}

export default PaypalPayment;
