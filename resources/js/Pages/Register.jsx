import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Form from "../components/Form";
import FormLayout from "../components/FormLayout";
import FormInput from "../components/FormInput";
import { useForm } from "@inertiajs/react";
import FormLabel from "../components/FormLabel";
import FormButton from "../components/FormButton";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "09",
        password: "",
        confirm_password: "",
        valid_id: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState("");
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    function handlePhone(e) {
        const phone = e.target.value.replace(/[^0-9]/g, "");
        setData("phone", phone);
    }
    console.log(errors);
    function handleSubmit(e) {
        e.preventDefault();
        post("/register", {
            preserveScroll: true,
        });
    }

    return (
        <div>
            <NavBar />
            <main>
                <FormLayout title="Create an Account" small_form={false}>
                    <Form submit={handleSubmit}>
                        <div>
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                type="text"
                                data={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                            />
                            {errors.first_name ? (
                                <Error>{errors.first_name}</Error>
                            ) : null}
                        </div>
                        <div>
                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                type="text"
                                data={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                            />
                            {errors.last_name ? (
                                <Error>{errors.last_name}</Error>
                            ) : null}
                        </div>
                        <div>
                            <FormLabel>Phone</FormLabel>
                            <FormInput
                                type="text"
                                data={data.phone}
                                onChange={(e) => handlePhone(e)}
                            />
                            {errors.phone ? (
                                <Error>{errors.phone}</Error>
                            ) : null}
                        </div>
                        <div>
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                type="text"
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
                            <FormLabel>Valid ID</FormLabel>

                            <input
                                className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                aria-describedby="user_avatar_help"
                                id="image"
                                accept=".png, .jpg, .jpeg"
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setData("valid_id", file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setPreviewUrl(reader.result);
                                        };

                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {errors.valid_id ? (
                                <Error>{errors.valid_id}</Error>
                            ) : null}
                        </div>

                        {previewUrl ? (
                            <>
                                <div className="mb-5 h-[200px] w-[300px] rounded-xl mx-auto">
                                    <img
                                        src={previewUrl}
                                        className="h-full w-full mt-2 rounded-lg"
                                    ></img>
                                </div>
                            </>
                        ) : null}
                        <div className="relative">
                            <FormLabel>Confirm Password</FormLabel>
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
                        <div className="relative">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormInput
                                type={showPassword ? "text" : "password"}
                                data={data.confirm_password}
                                onChange={(e) =>
                                    setData("confirm_password", e.target.value)
                                }
                                mergeStyle="pe-10"
                            />
                            {errors.confirm_password ? (
                                <Error>{errors.confirm_password}</Error>
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
                                <FormButton>Create an Account</FormButton>
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </Form>
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span className="font-medium text-yellow-500 hover:underline">
                            <a href="#">Login here</a>
                        </span>
                    </p>
                </FormLayout>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
