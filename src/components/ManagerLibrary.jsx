import { Button, Checkbox, Form, Input, Modal, Space, Table, Tag } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function () {
    const [Libraries, setLibraries] = useState([])
    const columns = [
        {
            title: 'Tên sách ',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Sinh viên mượn',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'Ngày mượn',
            dataIndex: 'starDate',
            key: 'starDate',
        },
        {
            title: 'Ngày trả',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: 1,
            bookName: "Đắc nhân tâm",
            studentName: "Nguyễn Văn A",
            startDate: "10/04/2024",
            endDate: "14/04/2024"
        }
    ];
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // Gọi API lấy danh sách quản lý thư viện
    const getAlllybrary = async () =>{
    const response = await axios.get("http://localhost:3000/libraries");

    if (response){
        setLibraries(response.data);
    }
    };
    getAlllybrary();

    useEffect(()=>{
        getAlllybrary();
    },[]);

    return (
        <>
            {/* Modal thêm mới/ sửa thông tin */}
            <Modal
                open={false}
                title="Thêm mới thông tin"
                footer={null}
            >
                <Form
                    layout='vertical'
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sách"
                        name="Bookname"
                        rules={[{ required: true, message: 'Tên sách không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tên người nhận"
                        name="studentName"
                        rules={[{ required: true, message: 'Tên người mượn không được để trống!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Ngày mượn"
                        name="starDate"
                        rules={[{ required: true, message: 'Ngày mượn không được để trống!' }]}
                    >
                        <Input type='date' />
                    </Form.Item>

                    <Form.Item
                        label="Ngày trả"
                        name="endDate"
                        rules={[{ required: true, message: 'Ngày trả không được để trống!' }]}
                    >
                        <Input type='date' />
                    </Form.Item>



                    <Form.Item label={null} className='flex justify-end gap-2 mb-0'>
                        <Button htmlType='button'>Hủy</Button>
                        <Button className='ml-2' type="primary" htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className='flex flex-col'>
                <header className='flex items-center justify-between mb-3'>
                    <h3>Quản lý mượn trả sách</h3>
                    <Button type='primary'>Thêm thông tin</Button>
                </header>

                <main>
                    <Table columns={columns} dataSource={Libraries} />
                </main>
            </div>
        </>
    )
}
