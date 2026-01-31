import Header from "../../components/header/header";
import {
    Table,
    Button,
    Space,
    Modal,
    Form,
    Input,
    message,
    Tag,
    Popconfirm,
    Checkbox,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import {
    requestGetAllUsers,
    requestCreateUser,
    requestUpdateUser,
    requestDeleteUser,
} from "../../config/UserRequest";
import "./AdminUsers.css";

function AdminUsers() {
    const { dataUser, loading: contextLoading, isAdmin } = useStore();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!contextLoading && !dataUser?._id) {
            navigate("/login");
            return;
        }
        if (!contextLoading && dataUser?._id && !isAdmin) {
            message.error("Bạn không có quyền truy cập trang này");
            navigate("/");
            return;
        }
    }, [dataUser, contextLoading, isAdmin, navigate]);

    useEffect(() => {
        if (isAdmin && dataUser?._id) {
            fetchUsers();
        }
    }, [isAdmin, dataUser?._id]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await requestGetAllUsers();
            setUsers(res.metadata || []);
        } catch (error) {
            message.error(
                error.response?.data?.message || "Lấy danh sách user thất bại",
            );
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditingId(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEdit = (record) => {
        setEditingId(record._id);
        form.setFieldsValue({
            fullName: record.fullName,
            email: record.email,
            phone: record.phone || "",
            password: "",
            isAdmin: record.isAdmin,
        });
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (editingId) {
                const payload = {
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    isAdmin: !!values.isAdmin,
                };
                if (values.password?.trim()) payload.password = values.password;
                await requestUpdateUser(editingId, payload);
                message.success("Cập nhật user thành công");
            } else {
                if (!values.password?.trim()) {
                    message.error("Nhập mật khẩu khi tạo user mới");
                    return;
                }
                await requestCreateUser({
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    password: values.password,
                    isAdmin: !!values.isAdmin,
                });
                message.success("Tạo user thành công");
            }
            setModalOpen(false);
            fetchUsers();
        } catch (error) {
            if (error.errorFields) return;
            message.error(
                error.response?.data?.message || "Thao tác thất bại",
            );
        }
    };

    const handleDelete = async (id) => {
        try {
            await requestDeleteUser(id);
            message.success("Xóa user thành công");
            fetchUsers();
        } catch (error) {
            message.error(
                error.response?.data?.message || "Xóa user thất bại",
            );
        }
    };

    if (!contextLoading && (!dataUser?._id || !isAdmin)) {
        return null;
    }

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "fullName",
            key: "fullName",
            render: (text) => text || "-",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) => text || "-",
        },
        {
            title: "Quyền",
            dataIndex: "isAdmin",
            key: "isAdmin",
            render: (isAdmin) =>
                isAdmin ? (
                    <Tag color="blue">Admin</Tag>
                ) : (
                    <Tag color="default">User</Tag>
                ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa user này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="admin-users-page">
            <Header />
            <main className="admin-users-main">
                <div className="admin-users-wrapper">
                    <div className="admin-users-header">
                        <h1>Quản lý Users</h1>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={openCreate}
                        >
                            Thêm user
                        </Button>
                    </div>
                    <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={users}
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </div>
            </main>

            <Modal
                title={editingId ? "Sửa user" : "Thêm user"}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText={editingId ? "Cập nhật" : "Tạo"}
                cancelText="Hủy"
                width={420}
                destroyOnClose
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nguyen Van A"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="email@gmail.com"
                            disabled={!!editingId}
                        />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại">
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="0987654321"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={editingId ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"}
                        rules={
                            editingId
                                ? []
                                : [{ required: true, message: "Nhập mật khẩu" }]
                        }
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={editingId ? "••••••••" : "Ít nhất 6 ký tự"}
                        />
                    </Form.Item>
                    <Form.Item
                        name="isAdmin"
                        valuePropName="checked"
                    >
                        <Checkbox>Admin</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminUsers;
