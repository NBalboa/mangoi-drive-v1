import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FormLayout from "../components/FormLayout";
import Form from "../components/Form";
import FormLabel from "../components/FormLabel";
import FormInput from "../components/FormInput";
import { useForm } from "@inertiajs/react";
import Error from "../components/Error";
import FormButton from "../components/FormButton";
import Spinner from "../components/Spinner";

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post("/signin", { preserveScroll: true });
    }

    return (
        <div>
            <NavBar />
            <main>
                <FormLayout title="Login">
                    <Form submit={handleSubmit}>
                        {errors.error ? (
                            <Error>Invalid Email/Password</Error>
                        ) : null}
                        <div>
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                type="email"
                                data={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email ? (
                                <Error>{errors.email}</Error>
                            ) : null}
                        </div>

                        <div className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormInput
                                type={showPassword ? "text" : "password"}
                                data={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                mergeStyle="pe-10"
                            />
                            {errors.password ? (
                                <Error>{errors.password}</Error>
                            ) : null}
                            <button
                                type="button"
                                className="absolute right-3 top-[34px] text-lg"
                                tabIndex={-1}
                                onClick={(e) => handleShowPassword()}
                            >
                                {showPassword ? (
                                    <i className="fa-regular fa-eye-slash hover:text-yellow-300"></i>
                                ) : (
                                    <i className="fa-regular fa-eye hover:text-yellow-300"></i>
                                )}
                            </button>
                        </div>
                        <div>
                            {!processing ? (
                                <FormButton>Login</FormButton>
                            ) : (
                                <Spinner />
                            )}
                        </div>
                        <div className="relative">
                            <a
                                href="#"
                                className="absolute -bottom-[9px] sm:-bottom-[8px] md:-bottom-[3px] font-medium hover:text-yellow-500"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </Form>
                    <div>
                        <p className="text-sm mt-[30px]">
                            Don't have an account?{" "}
                            <span className="text-yellow-500 hover:underline">
                                <a href="#">Register here</a>
                            </span>
                        </p>
                    </div>
                </FormLayout>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
