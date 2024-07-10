import React, { useState } from "react";
import {
  Badge,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import moment from "moment";
import ReleasePaymentModal from "../../reject_payments/components/ReleasePaymentModal";
import { useReleasePaymentMutation } from "../../../../../../redux/api";
import defaultImage from "@src/assets/images/avatars/avatar-blank.png";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";

const RequestDetails = ({ data, userDetails, refetch, token, isFetching }) => {
  const {
    id,
    booking_date,
    booking_time,
    booking_price,
    hours,
    location,
    status,
    is_released,
    canceled_status,
    canceled_reason,
    rejected_reason_buddy,
    release_payment_requests,
    created_at,
    updated_at,
    paid_at,
    user,
    category,
    buddy,
  } = data;
  const [modalOpen, setModalOpen] = useState(false);

  const [releasePayment, { isLoading: releasingPayment }] =
    useReleasePaymentMutation();

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleReleaseClick = () => {
    toggleModal();
  };

  const handleConfirmRelease = async (release_to) => {
    try {
      const result = await releasePayment({
        request_id: id,
        user_id: userDetails.userId,
        buddy_id: user.id,
        release_to,
        token,
      });
      if (result) {
        refetch();
        toggleModal();
      }
    } catch (error) {
      console.error("Failed to release payment:", error);
    }
  };

  if (isFetching) {
    return <ComponentSpinner />;
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="my-4">Request Details</h2>
        <Button
          color="primary fw-bold"
          size="sm"
          onClick={() => handleReleaseClick()}
          disabled={is_released}
          style={{ color: "#0000", fontWeight: "bold" }}
        >
          Release Payment
        </Button>
      </div>

      <Card className="mb-4">
        <CardBody>
          <Row>
            <Col md="6">
              <CardTitle tag="h5">User Information</CardTitle>
              <CardText>
                {/* <strong>Full Name:</strong> */}
                {
                  <img
                    src={userDetails?.userImageUrl || defaultImage}
                    alt="User profile"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "10px",
                      borderRadius: "50%",
                    }}
                  />
                }
                {userDetails?.userFullName}
              </CardText>
              <CardText>
                <strong>Rejected Reason:</strong> {canceled_reason}
              </CardText>
            </Col>
            <Col md="6">
              <CardTitle tag="h5">Buddy Information</CardTitle>
              <CardText>
                {/* <strong>Full Name:</strong> */}
                {user.images &&
                  user.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.image_url || defaultImage}
                      alt="User profile"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  ))}
                {user?.full_name}
              </CardText>
              <CardText>
                <strong>Rejected Reason:</strong> {rejected_reason_buddy}
              </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <Row>
            <Col md="6">
              <CardTitle tag="h5">Service Details</CardTitle>
              <CardText>
                <strong>Booking Date:</strong>{" "}
                {moment(booking_date).format("MMMM Do YYYY")}
              </CardText>
              <CardText>
                <strong>Booking Time:</strong> {booking_time}
              </CardText>
              <CardText>
                <strong>Booking Price:</strong> ${booking_price}
              </CardText>
              <CardText>
                <strong>Hours:</strong> {hours}
              </CardText>
              <CardText>
                <strong>Location:</strong> {location}
              </CardText>
            </Col>
            <Col md="6">
              {/* <CardText>
                <strong>Status:</strong>{" "}
                <Badge
                  color={
                    status === "PAID"
                      ? "success"
                      : status === "COMPLETED"
                      ? "success"
                      : "warning"
                  }
                >
                  {status}
                </Badge>
              </CardText> */}
              {/* <CardText>
                <strong>Status:</strong>{" "}
                <Badge
                  color={canceled_status === "REJECTED" ? "danger" : "info"}
                >
                  {canceled_status}
                </Badge>
              </CardText> */}
              <CardText>
                <strong>Paid At:</strong>{" "}
                {paid_at
                  ? moment(paid_at).format("MMMM Do YYYY, h:mm:ss a")
                  : "N/A"}
              </CardText>
              <CardText>
                <strong>Category:</strong>{" "}
                {/* <img
                src={category.image_url}
                alt="Category"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              /> {' '} */}
                {category.name}
              </CardText>
              <CardText>
                <strong>Release Status:</strong>{" "}
                <Badge color={is_released === false ? "primary" : "success"}>
                  {is_released ? "Released" : "Pending"}
                </Badge>
              </CardText>
              <CardText>
                <strong>Release To:</strong>{" "}
                <Badge color="info">{data?.release_to || "Nill"}</Badge>
              </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* <h3 className="my-4">User Details</h3> */}

      {/* <h3 className="my-4">Category Details</h3> */}
      <ReleasePaymentModal
        isOpen={modalOpen}
        toggle={toggleModal}
        onConfirm={handleConfirmRelease}
        isLoading={releasingPayment}
      />
    </Container>
  );
};

export default RequestDetails;
