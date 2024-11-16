import React, { useEffect, useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";

function Orders({ initialOrders }) {
    console.log(initialOrders);
    const [orders, setOrders] = useState(initialOrders);
    useEffect(() => {
        const channel = window.Echo.channel("orders");

        channel.listen("OrderCreated", function (event) {
            setOrders((prev) => [
                ...prev,
                {
                    ...event.order,
                    user: event.user,
                    items: event.items,
                    address: event.address,
                },
            ]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);
    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Orders
            </h2>

            <Content>
                <Table>
                    <TableHeads>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Amount (P)</TableHead>
                    </TableHeads>
                    <TableBody>
                        {orders.map((order) => (
                            <TableBodyRow key={order.id}>
                                <TableData>{order.id}</TableData>
                                <TableData>
                                    {order.user.first_name}{" "}
                                    {order.user.last_name}
                                </TableData>
                                <TableData>{order.status}</TableData>
                                <TableData>{order.payment_type}</TableData>
                                <TableData>{order.total}</TableData>
                            </TableBodyRow>
                        ))}
                    </TableBody>
                </Table>
            </Content>
        </Admin>
    );
}

export default Orders;
