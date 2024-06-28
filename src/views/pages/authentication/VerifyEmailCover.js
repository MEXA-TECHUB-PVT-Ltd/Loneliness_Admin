// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { useState } from "react";

// ** Reactstrap Imports
import { Row, Col, CardTitle, Button, Alert } from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/verify-email-illustration.svg";
import illustrationsDark from "@src/assets/images/pages/verify-email-illustration-dark.svg";

// ** Styles
import "@styles/base/pages/authentication.scss";
import { AppLogo } from "../../components/common/AppLogo";
import { APP_NAME } from "../../../contants";

// ** Third-Party Imports
import AuthCode from "react-auth-code-input";
import "./input-code.css";
import { useVerifyCodeMutation } from "../../../redux/api";
import LoadingButton from "../../components/buttons/LoadingButton";

// ** Redux API Hook

const VerifyEmailCover = () => {
  // ** Hooks
  const { skin } = useSkin();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [verifyCode, { isLoading, isError, error }] = useVerifyCodeMutation();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  // Handle code input change
  const handleCodeChange = (value) => {
    setCode(value);
  };

  const email = sessionStorage.getItem("email");

  // Handle verify code button click
  const handleVerifyCode = async () => {
    if (!email) {
      return;
    }
    try {
      // Call verifyCode mutation with the code
      const response = await verifyCode({ email, code, role: "ADMIN" }); // Assuming verifyCode expects an object with 'code' key
      console.log(response);
      if (response.data.status === "success") {
        // Handle success
        sessionStorage.setItem("code", code);
        console.log("Verification successful:", response); // Log response for debugging
        navigate("/reset-password-cover"); // Redirect to the reset password page or handle success scenario
      }
    } catch (err) {
      // Handle error
      console.error("Verification error:", err);
    }
  };

  console.log(error);

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <AppLogo />
          <h2 className="brand-text text-primary ms-1">{APP_NAME}</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bolder mb-1">
              Verify your code
            </CardTitle>
            {error?.data && (
              <Alert color="danger" style={{ padding: "10px 20px" }}>
                {error?.data?.errors?.length > 0
                  ? error?.data?.errors?.[0]
                  : error?.data?.message}
              </Alert>
            )}
            <div className="mb-3">
              <AuthCode
                onChange={handleCodeChange}
                containerClassName="auth-code-container"
                inputClassName="auth-code-input"
                allowedCharacters="numeric"
                length={4}
              />
            </div>
            <LoadingButton
              type="submit"
              color="primary"
              block
              isLoading={isLoading}
              loadingText="verifying..."
              onClick={handleVerifyCode}
            >
              Verify Code
            </LoadingButton>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyEmailCover;
