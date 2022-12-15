import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Steps, Form, Select, Button, Input } from "antd";
import {
  IdcardOutlined,
  DollarCircleOutlined,
  InfoOutlined,
  ContainerOutlined
} from "@ant-design/icons";

const BookingSteps = () => {
  const [current, setCurrent] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [payementDetails, setpayementDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const onFinishBookingDetailsForm = (values) => {
    setBookingDetails(values);
    setCurrent(1);
  };
  const onFinishPayementDetailsForm = (values) => {
    setpayementDetails(values);
    setCurrent(2);
  };
  const onFinishUserDetailsForm = (values) => {
    setUserDetails(values);
    setCurrent(3);
  };
  // const onChange = (value) => {
  //   console.log('onChange:', current);
  //   setCurrent(value);
  // };

  const forms = [
    <BookingDetailsForm
      onFinish={onFinishBookingDetailsForm}
      initialValues={bookingDetails}
    />,
    <BookingPayementForm
      onFinish={onFinishPayementDetailsForm}
      initialValues={payementDetails}
    />,
    <BookingUserForm
      onFinish={onFinishUserDetailsForm}
      initialValues={userDetails}
    />,
    <Finish />
  ];
  const isStepDisabeled = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return bookingDetails === null;
    }
    if (stepNumber === 2) {
      return bookingDetails === null || payementDetails === null;
    }
    if (stepNumber === 3) {
      return (
        bookingDetails === null ||
        payementDetails === null ||
        userDetails === null
      );
    }
  };

  return (
    <>
      <Steps current={current} onChange={setCurrent}>
        <Steps.Step
          disabled={isStepDisabeled(0)}
          title="Hotel Details"
          description={"description"}
        />
        <Steps.Step
          disabled={isStepDisabeled(1)}
          title="Payement"
          description={"description"}
        />
        <Steps.Step
          disabled={isStepDisabeled(2)}
          title="User Details"
          description={"description"}
        />
        <Steps.Step
          disabled={isStepDisabeled(3)}
          title="Booking Info"
          description={"description"}
        />
      </Steps>
      {forms[current]}
    </>
  );
};

function BookingDetailsForm({ onFinish, initialValues }) {
  return (
    <div>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          style={{ paddingLeft: 10, width: 270 }}
          label="Hotel"
          name="room_type_id"
          rules={[
            {
              required: false,
              message: "Invalid Value"
            }
          ]}
        >
          <Select
            showSearch
            placeholder="Select"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
      </Form>
    </div>
  );
}

function BookingPayementForm({ onFinish, initialValues }) {
  return (
    <div>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          style={{ paddingLeft: 10, width: 270 }}
          label="amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Invalid Value"
            }
          ]}
        >
          <Input type="number"></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
      </Form>
    </div>
  );
}

function BookingUserForm({ onFinish, initialValues }) {
  return (
    <div>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          style={{ paddingLeft: 10, width: 270 }}
          label="First name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Invalid Value"
            }
          ]}
        >
          <Input type="text"></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
      </Form>
    </div>
  );
}

function Finish() {
  return (
    <div>
      <h1>Booking Done Successfully..!!</h1>
      <Button type="primary" htmlType="submit">
        Finish
      </Button>
    </div>
  );
}

export default BookingSteps;
