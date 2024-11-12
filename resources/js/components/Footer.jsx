import React from "react";

function Footer() {
    return (
        <footer className="bg-black mt-5 relative bottom-0">
            <div className="mt-5 p-5 border-b-2 p-3 border-yellow-300">
                <ul className="text-white text-xl text-center mx:auto md:mx-72 flex justify-between ">
                    <li>
                        <a href="#" className="hover:text-yellow-400">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-yellow-400">
                            Menu
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-yellow-400">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-yellow-400">
                            Login
                        </a>
                    </li>
                </ul>
                <div className="mt-2 mx:auto md:mx-72 flex justify-around text-white">
                    <a href="#" className="hover:text-yellow-500">
                        Facebook
                    </a>
                    <a href="#" className="hover:text-yellow-500">
                        Facebook
                    </a>
                    <a href="#" className="hover:text-yellow-500">
                        Facebook
                    </a>
                </div>
            </div>
            <div className="py-3 text-center">
                <p className="text-white text-sm font-bold">
                    Copyright © 2024 Mango Drive
                </p>
            </div>
        </footer>
    );
}

export default Footer;
