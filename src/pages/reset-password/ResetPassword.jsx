import Header from "../../components/header/header";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, NumberOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestVerifyForgotPassword } from "../../config/UserRequest";
import "../login/LoginUser.css";

const { Title, Paragraph, Text } = Typography;

function ResetPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { confirmPassword, ...payload } = values; // eslint-disable-line no-unused-vars
            const res = await requestVerifyForgotPassword(payload);
            message.success(res.message || "Khôi phục mật khẩu thành công");
            setTimeout(() => {
                navigate("/login");
            }, 800);
        } catch (error) {
            message.error(error.response?.data?.message || "Xác thực OTP thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Header />

            <main className="login-main">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <Title level={2}>Đặt lại mật khẩu</Title>
                            <Paragraph>
                                Nhập mã OTP đã được gửi đến email và mật khẩu mới của bạn.
                            </Paragraph>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            size="large"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Mã OTP"
                                name="otp"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mã OTP" },
                                    { len: 6, message: "Mã OTP gồm 6 ký tự" },
                                ]}
                            >
                                <Input
                                    prefix={<NumberOutlined />}
                                    placeholder="Nhập mã OTP"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                name="password"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mật khẩu mới" },
                                    { min: 6, message: "Ít nhất 6 ký tự" },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="••••••••"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu mới"
                                name="confirmPassword"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng xác nhận mật khẩu mới",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "Mật khẩu xác nhận không khớp",
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="••••••••"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="login-btn"
                            >
                                Xác nhận
                            </Button>
                        </Form>

                        <div className="login-footer" style={{ marginTop: 20 }}>
                            <Text>Chưa nhận được mã?</Text>
                            <Link to="/forgot-password"> Gửi lại mã OTP</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ResetPassword;

