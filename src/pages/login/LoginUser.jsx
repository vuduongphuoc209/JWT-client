import Header from "../../components/header/header";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { requestLogin, requestLoginGoogle } from "../../config/UserRequest";
import "./LoginUser.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function LoginUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await requestLogin(values);
            console.log(res);

            message.success("Đăng nhập thành công!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate("/");
        } catch (error) {
            message.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = async (response) => {
        try {
            const { credential } = response;

            const res = await requestLoginGoogle(credential);

            message.success(res.message);

            navigate("/");
            window.location.reload();
        } catch (error) {
            message.error("Dang nhap Google that bai");
            console.log(error);
        }
    };

    return (
        <div className="login-page">
            <Header />

            <main className="login-main">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h1>Đăng nhập</h1>
                            <p>Chào mừng bạn quay trở lại!</p>
                        </div>
                        <Form
                            layout="vertical"
                            size="large"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Nhập email" },
                                    {
                                        type: "email",
                                        message: "Email không hợp lệ",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="example@email.com"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhập mật khẩu",
                                    },
                                    { min: 6, message: "Ít nhất 6 ký tự" },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="••••••••"
                                />
                            </Form.Item>

                            <div className="login-options">
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                </Form.Item>
                                <Link to="/forgot-password">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="login-btn"
                            >
                                Đăng nhập
                            </Button>
                        </Form>
                        <Divider>Hoặc</Divider>
                        <GoogleOAuthProvider clientId="263079252814-4gol1r1db6mt7rcs21jhvdjd6n163gas.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </GoogleOAuthProvider>

                        <div className="login-footer">
                            <span>Chưa có tài khoản?</span>
                            <Link to="/register">Đăng ký ngay</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginUser;
