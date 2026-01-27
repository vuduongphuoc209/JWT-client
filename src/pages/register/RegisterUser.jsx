import Header from "../../components/header/header";
import { Form, Input, Button, message } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterUser.css";
import { requestRegister } from "../../config/UserRequest";

function RegisterUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { confirmPassword, ...registerData } = values; // eslint-disable-line no-unused-vars
            await requestRegister(registerData);
            message.success("Đăng ký thành công");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            navigate("/");
        } catch (error) {
            message.error(error.response?.data?.message || "Đăng ký thất bại!");
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Vui lòng kiểm tra lại thông tin!");
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="register-page">
            <Header />

            <main className="register-main">
                <div className="register-wrapper">
                    <div className="register-card">
                        <div className="register-header">
                            <h1>Đăng ký tài khoản</h1>
                            <p>Tạo tài khoản mới để bắt đầu mua sắm!</p>
                        </div>

                        <Form
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            size="large"
                        >
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder="Nguyen Van A"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true }, { type: "email" }]}
                            >
                                <Input
                                    placeholder="email@gmail.com"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone">
                                <Input
                                    placeholder="0987654321"
                                    prefix={<PhoneOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, min: 6 }]}
                                hasFeedback
                            >
                                <Input.Password
                                    placeholder="......"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="confirmPassword"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng xác nhận mật khẩu!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "Mật khẩu xác nhận không khớp!",
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="......"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="register-btn"
                            >
                                Đăng ký
                            </Button>
                        </Form>

                        <div className="register-login">
                            <span>Đã có tài khoản? </span>
                            <Link to="/login">Đăng nhập ngay</Link>
                        </div>
                    </div>
                </div>

                <p className="register-footer">
                    Bằng việc đăng ký, bạn đồng ý với{" "}
                    <Link to="/terms">Điều khoản dịch vụ</Link> và{" "}
                    <Link to="/privacy">Chính sách bảo mật</Link>
                </p>
            </main>
        </div>
    );
}

export default RegisterUser;
