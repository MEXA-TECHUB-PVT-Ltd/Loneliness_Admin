// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { useState } from "react";

// ** Custom Components
import InputPassword from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
  Alert,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/reset-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/reset-password-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { AppLogo } from "../../components/common/AppLogo";
import { APP_NAME } from "../../../contants";

// ** Third-Party Imports
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../../../redux/api";
import LoadingButton from "../../components/buttons/LoadingButton";

const ResetPasswordCover = () => {
  // ** Hooks
  const { skin } = useSkin();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const [successMessage, setSuccessMessage] = useState(null);

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const initialValues = {
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const email = sessionStorage.getItem("email");
    const code = sessionStorage.getItem("code");
    if (!email || !code) {
      return;
    }
    try {
      const response = await resetPassword({
        email,
        code,
        role: "ADMIN",
        new_password: values.new_password,
        confirm_password: values.confirm_password
      });

      if (response.data.status === "success") {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("code");
        navigate("/login");
      }

      navigate("/login");
    } catch (err) {
      // Handle error
      console.error("Reset password error:", err);
    } finally {
      setSubmitting(false);
    }
  };

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
              Reset Password 🔒
            </CardTitle>
            <CardText className="mb-2">
              Your new password must be different from previously used passwords
            </CardText>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <FormikForm className="auth-reset-password-form mt-2">
                  <div className="mb-1">
                    <Label className="form-label" htmlFor="new-password">
                      New Password
                    </Label>
                    <Field
                      name="new_password"
                      type="password"
                      className={`form-control ${
                        errors.new_password && touched.new_password
                          ? "is-invalid"
                          : ""
                      }`}
                      id="new-password"
                      autoFocus
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" htmlFor="confirm-password">
                      Confirm Password
                    </Label>
                    <Field
                      name="confirm_password"
                      type="password"
                      className={`form-control ${
                        errors.confirm_password && touched.confirm_password
                          ? "is-invalid"
                          : ""
                      }`}
                      id="confirm-password"
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {successMessage && (
                    <Alert color="success" className="mt-2">
                      {successMessage}
                    </Alert>
                  )}
                  {isError && (
                    <Alert color="danger" className="mt-2">
                      {Array.isArray(error.data.errors)
                        ? error?.data?.errors[0]
                        : error.data?.errors
                        ? error.data.errors
                        : error?.data?.message}
                    </Alert>
                  )}
                  <LoadingButton
                    color="primary"
                    block
                    type="submit"
                    isLoading={isLoading}
                    loadingText="resetting..."
                  >
                    Set New Password
                  </LoadingButton>
                </FormikForm>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPasswordCover;
