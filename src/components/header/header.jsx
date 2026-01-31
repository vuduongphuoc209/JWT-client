import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { requestLogout } from "../../config/UserRequest";

const Header = () => {
    const { dataUser, isAdmin } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await requestLogout();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate("/");
        } catch (error) {
            message.error(
                error.response?.data?.message || "Đăng xuất thất bại",
            );
        }
    };

    const items = [
        {
            key: "1",
            label: dataUser?.email || "My Account",
            disabled: true,
        },
        {
            type: "divider",
        },
        {
            key: "2",
            label: "Profile",
            onClick: () => navigate("/profile"),
            className: "header-dropdown-profile",
        },
        ...(isAdmin
            ? [
                  {
                      key: "admin",
                      label: "Quản lý Users",
                      onClick: () => navigate("/users"),
                      className: "header-dropdown-admin",
                  },
              ]
            : []),
        {
            key: "3",
            label: "Settings",
            icon: <SettingOutlined />,
            onClick: () => navigate("/settings"),
        },
        {
            key: "4",
            label: "Logout",
            onClick: handleLogout,
            className: "header-dropdown-logout",
        },
    ];
    return (
        <div>
            <header className="app-header">
                <div className="header-left">
                    <Link to="/" className="logo-text">
                        logo
                    </Link>
                </div>
                <div className="header-right">
                    {dataUser && dataUser._id ? (
                        <>
                            {isAdmin && (
                                <Link to="/users" className="admin-link">
                                    Quản lý Users
                                </Link>
                            )}
                            <div style={{ cursor: "pointer" }}>
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {dataUser?.fullName ||
                                                dataUser?.email ||
                                                "Tài khoản"}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="login-button">
                            Login
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
