import Header from "../../components/header/header";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestForgotPassword } from "../../config/UserRequest";
import "./ForgotPassword.css";

const { Title, Paragraph, Text } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await requestForgotPassword(values);
            message.success(
                res.message || "Mã OTP đã được gửi đến email của bạn",
            );
            // Sau khi gửi OTP thành công, chuyển sang bước nhập OTP + mật khẩu mới
            setTimeout(() => {
                navigate("/reset-password");
            }, 800);
        } catch (error) {
            message.error(error.response?.data?.message || "Gửi OTP thất bại");
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
                            <Title level={2}>Quên mật khẩu</Title>
                            <Paragraph>
                                Nhập email đã đăng ký, chúng tôi sẽ gửi mã OTP
                                để đặt lại mật khẩu.
                            </Paragraph>
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
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email",
                                    },
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

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="login-btn"
                            >
                                Gửi mã OTP
                            </Button>
                        </Form>

                        <div className="login-footer" style={{ marginTop: 20 }}>
                            <Text>Đã nhớ mật khẩu?</Text>
                            <Link to="/login"> Quay lại đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ForgotPassword;
