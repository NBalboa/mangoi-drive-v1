import React from "react";
import Admin from "../../layouts/Admin";
import Title from "../../components/Title";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import Links from "../../components/Links";
import { router } from "@inertiajs/react";

const Users = ({ users }) => {
    console.log(users);
    return (
        <Admin>
            <Title>Users</Title>
            <Table>
                <TableHeads>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Valid Id</TableHead>
                    <TableHead>Is Validated?</TableHead>
                </TableHeads>
                <TableBody>
                    {users.data.map((user) => (
                        <TableBodyRow key={user.id}>
                            <TableData>{`${user.first_name} ${user.last_name}`}</TableData>
                            <TableData>{user.email}</TableData>
                            <TableData>{user.phone}</TableData>
                            <TableData>
                                {user.valid_id ? (
                                    <div className="mb-5 h-[200px] w-[300px] rounded-xl mx-auto">
                                        <img
                                            src={user.valid_id}
                                            className="h-full w-full mt-2 rounded-lg"
                                        ></img>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </TableData>
                            <TableData>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={user.is_validId === 1}
                                        checked={user.is_validId === 1}
                                        className="sr-only peer"
                                        onChange={(e) => {
                                            console.log(e.target.checked);

                                            const data = {
                                                user_id: user.id,
                                                is_validId: e.target.checked
                                                    ? 1
                                                    : 0,
                                            };

                                            router.put(
                                                "/users/validateId",
                                                data,
                                                {
                                                    preserveScroll: true,
                                                }
                                            );
                                        }}
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </TableData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
            <Links
                links={users.links}
                per_page={users.per_page}
                total={users.total}
            />
        </Admin>
    );
};

export default Users;
