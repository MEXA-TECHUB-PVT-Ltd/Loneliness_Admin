// ** React Imports
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { APP_NAME } from "../../../contants";
import { AppLogo } from "../../components/common/AppLogo";

// ** Third-Party Imports
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../../redux/api";
import LoadingButton from "../../components/buttons/LoadingButton";

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [forgot, { isLoading, error }] = useForgotPasswordMutation();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  if (isUserLoggedIn()) {
    return <Navigate to="/" />;
  }

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
            <CardTitle tag="h2" className="fw-bold mb-1">
              Forgot Password? 🔒
            </CardTitle>
            <CardText className="mb-2">
              Enter your email and we'll send you code to reset your password
            </CardText>
            <Formik
              initialValues={{ email: "", role: "ADMIN" }}
              validationSchema={Yup.object({
                email: Yup.string().required("Email is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await forgot(values).unwrap();
                  setSubmitted(true);
                  sessionStorage.setItem("email", values.email);
                  navigate(`/verify-email-cover`);
                } catch (err) {
                  console.error("Forgot password error:", err);
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <FormikForm className="auth-forgot-password-form mt-2">
                  {error?.data && (
                    <Alert color="danger" style={{ padding: "10px 20px" }}>
                      {error?.data?.errors?.length > 0
                        ? error?.data?.errors?.[0]
                        : error?.data?.message}
                    </Alert>
                  )}
                  <div className="mb-1">
                    <Label className="form-label" htmlFor="login-email">
                      Email
                    </Label>
                    <Field
                      type="email"
                      id="login-email"
                      name="email"
                      placeholder="john@example.com"
                      autoFocus
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    block
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                  >
                    Send
                  </LoadingButton>
                </FormikForm>
              )}
            </Formik>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
