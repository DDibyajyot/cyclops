import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';
import {Card, Col, ConfigProvider, Form, Input, InputNumber, Row, Select, Switch} from "antd";
import {CheckOutlined, SmileOutlined} from "@ant-design/icons";

const Validations = () => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [changed, setChanged] = useState(false)
    const [changingReplicas, setChangingReplicas] = useState(false)

    const [form] = Form.useForm();

    useEffect(() => {
        const handleScroll = () => {
            if (elementRef.current) {
                const top = elementRef.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                setIsVisible(top < windowHeight);
            }
        };

        // Initial check when component mounts
        handleScroll();

        // Event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isVisible && !changed) {
            setChanged(true)
            setTimeout(() => setChangingReplicas(true), 1900)
            setTimeout(() => form.setFieldValue("Replicas", 2), 2000)
            setTimeout(() => form.setFieldValue("Replicas", 1), 2300)
            setTimeout(() => form.setFieldValue("Replicas", 0), 2600)
            setTimeout(() => setChangingReplicas(false), 2700)
            setTimeout(() => form.validateFields(["Replicas"]), 2700)

            setTimeout(() => setChangingReplicas(true), 3700)
            setTimeout(() => form.setFieldValue("Replicas", 1), 3800)
            setTimeout(() => form.setFieldValue("Replicas", 2), 4100)
            setTimeout(() => form.setFieldValue("Replicas", 3), 4400)
            setTimeout(() => setChangingReplicas(false), 4500)
            setTimeout(() => form.validateFields(["Replicas"]), 4500)
        }
    }, [isVisible])

    return (
        <Row style={{paddingTop: "50px", opacity: "0" }} ref={elementRef} className={isVisible ? styles.wrapper : ''}>
            <Col xs={{ span: 24, order: 2 }} lg={{ span: 11, offset: 2 }}>
                <Card
                    className={styles.animationcard}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#fe8801',
                            },
                        }}
                    >
                        <Form labelCol={{span: '4'}} form={form}>
                            <Form.Item
                                label="Image"
                                style={{display: 'block', opacity: "0.5", marginTop: "10px"}}
                                name="Image"
                            >
                                <Input
                                    readOnly={true}
                                    style={{width: '100%'}}
                                    defaultValue={"nginx"}
                                    controls={false}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Replicas"
                                style={{display: 'block'}}
                                name="Replicas"
                                hasFeedback
                                rules={[
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Number of replicas must not be below 0'
                                    },
                                ]}
                            >
                                <InputNumber
                                    readOnly={true}
                                    className={changingReplicas ? styles.changingReplicas : ''}
                                    style={{width: '100%'}}
                                    defaultValue={3}
                                    controls={false}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Port"
                                style={{display: 'block', opacity: "0.5", marginBottom: "10px"}}
                                name="Port"
                            >
                                <InputNumber
                                    readOnly={true}
                                    style={{width: '100%'}}
                                    defaultValue={80}
                                    controls={false}
                                />
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </Card>
            </Col>
            <Col xs={{ span: 15, offset: 6 }} lg={{ span: 8, offset: 0, order: 2 }} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
                <h2 style={{color: "#FFF", marginBottom: "10px"}}>
                    <span style={{color: "#fe8801"}}>Validate your configuration</span>
                </h2>
                <ul style={{color: "#FFF"}}>
                    <h4>

                    <li>
                        <span style={{color: "#fe8801"}}>catch misconfiguration</span> before it hits production
                    </li>
                    <li>
                        move faster and be more <span style={{color: "#fe8801"}}>confident</span> in your changes
                    </li>
                    </h4>
                </ul>
            </Col>
        </Row>
    );
}

export default Validations;
