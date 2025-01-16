const MenuLink = ({ isActive, path, label }) => {
    return (
        <li className="pointer">
            <a
                href={path}
                className={`${
                    isActive
                        ? "text-yellow-200 "
                        : "text-white hover:text-yellow-200"
                } `}
            >
                {label}
            </a>
        </li>
    );
};

export default MenuLink;
