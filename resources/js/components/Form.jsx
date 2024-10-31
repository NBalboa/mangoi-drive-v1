import React from "react";

function Form({ children, submit }) {
    return (
        <form className="space-y-4 md:space-y-6" onSubmit={submit}>
            {children}
        </form>
    );
}

export default Form;
