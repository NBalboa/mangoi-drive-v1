import React from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHead from "../../components/TableHead";
import TableHeads from "../../components/TableHeads";
import { Link } from "@inertiajs/react";

function Orders() {
    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Orders
            </h2>
            <Content>
                <Table>
                    <TableHeads>
                        <TableHead>
                            <input type="checkbox" />
                        </TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Amount (P)</TableHead>
                    </TableHeads>
                </Table>
                <div className="mt-5">
                    <Link
                        href="/orders/create"
                        className="text-white float-right text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800"
                    >
                        Create
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default Orders;
