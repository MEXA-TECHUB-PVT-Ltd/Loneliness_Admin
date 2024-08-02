import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
  X,
} from "react-feather";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  CardText,
  CardTitle,
  FormFeedback,
} from "reactstrap";
import { AbilityContext } from "@src/utility/context/Can";
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser } from "@utils";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";
import { APP_NAME } from "../../../contants";
import { AppLogo } from "../../components/common/AppLogo";
import { useLoginMutation } from "../../../redux/api";
import LoadingButton from "../../components/buttons/LoadingButton";
import { handleLogin } from "../../../redux/authentication";
import jwt from "../../../auth/jwt/useJwt";

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>
          You have successfully logged in as an {role} user to Vuexy. Now you
          can start to explore. Enjoy!
        </span>
      </div>
    </div>
  );
};

const defaultValues = {
  email: "admin@gmail.com",
  password: "Mtechub1@",
};

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const [login, { isLoading, error }] = useLoginMutation();
  const [apiError, setApiError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const onSubmit = async (data) => {
    data["device_token"] = "N/A";
    data["role"] = "ADMIN";
    data["signup_type"] = "EMAIL";
    setApiError(null);
    try {
      const user = await login(data).unwrap();
      window.localStorage.setItem("userData", JSON.stringify(user.result));
      jwt.setToken(user.result.token);
      dispatch(handleLogin(user.result));
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to login:", err);
      setApiError(err.data?.message || "An unexpected error occurred.");
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
              Welcome to {APP_NAME}!
            </CardTitle>
            <CardText className="mb-2">Please sign-in to your account</CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {apiError && <Alert color="danger" style={{padding: "10px 20px"}}>{apiError}</Alert>}

              <div className="mb-1">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <LoadingButton
                type="submit"
                color="primary"
                block
                isLoading={isLoading}
              >
                Sign in
              </LoadingButton>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
