import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Table,
  Badge,
  Button,
} from "reactstrap";
import moment from "moment";
import defaultImage from "@src/assets/images/avatars/avatar-blank.png"; // Add the correct path to the default image
import BlockUserModal from "../../users/components/BlockUserModal";

const UserDetails = ({ data, token, refetch }) => {
  const user = data?.result;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="4">
          <Card>
            <CardHeader className="text-center">
              <h4>User Profile</h4>
            </CardHeader>
            <CardBody className="text-center">
              <img
                src={user?.image_urls[0] || defaultImage}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
              <h5 className="mt-1">{user?.full_name || "N/A"}</h5>
              <p>{user?.email}</p>
              <Badge
                color={user?.role === "BUDDY" ? "success" : "primary"}
                className="mb-1"
              >
                {user?.role}
              </Badge>
              <div className="d-flex justify-content-center">
                <Button
                  color={user?.is_block ? "primary" : "danger"}
                  className="mt-1"
                  onClick={toggleModal}
                  style={{ minWidth: "120px" }}
                >
                  {user?.is_block ? "Unblock" : "Block"} User
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardHeader>
              <h4>User Details</h4>
            </CardHeader>
            <CardBody>
              <Table responsive bordered>
                <tbody>
                  <tr>
                    <th scope="row">ID</th>
                    <td>{user?.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">About</th>
                    <td>{user?.about || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">DOB</th>
                    <td>
                      {user?.dob
                        ? moment(user.dob).format("MMMM Do YYYY")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{user?.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Looking For Gender</th>
                    <td>{user?.looking_for_gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>
                      {user?.phone_number
                        ? `+${user?.phone_country_code} ${user?.phone_number}`
                        : "NULL"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Block Status</th>
                    <td>
                      {
                        <Badge
                          color={!user?.is_block ? "primary" : "danger"}
                          className="me-1"
                        >
                          {!user?.is_block ? "Unblock" : "Block"}
                        </Badge>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Subscription Status</th>
                    <td>
                      {
                        <Badge color="info" className="me-1">
                          {user?.is_subscribed ? "ACTIVE" : "INACTIVE"}
                        </Badge>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Subscription Name</th>
                    <td>
                      {user?.subscription_name ? (
                        <Badge color="info" className="me-1">
                          {user?.subscription_name}
                        </Badge>
                      ) : (
                        "NULL"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Height</th>
                    <td>{`${user?.height_ft || 0} ft ${
                      user?.height_in || 0
                    } in`}</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>{`${user?.weight} ${user?.weight_unit}`}</td>
                  </tr>
                  <tr>
                    <th scope="row">Hourly Rate</th>
                    <td>{`$${user?.hourly_rate}/hr`}</td>
                  </tr>
                  <tr>
                    <th scope="row">Wallet Amount</th>
                    <td>
                      {user?.wallet?.amount ? user.wallet.amount : "00.00"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Languages</th>
                    <td>
                      {user?.languages?.map((language, index) => (
                        <Badge key={index} color="info" className="me-1">
                          {language}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Location</th>
                    <td>
                      {user?.location
                        ? `${user.location.address}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postal_code}`
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Categories</th>
                    <td>
                      {user?.categories?.map((category, index) => (
                        <Badge key={index} color="info" className="me-1">
                          {category.name}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <BlockUserModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        token={token}
        refetch={refetch}
        selectedUser={user}
      />
    </Container>
  );
};

export default UserDetails;
