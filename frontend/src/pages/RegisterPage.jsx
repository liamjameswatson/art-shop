import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../ui/FormContainer";
import Spinner from "../ui/Spinner";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
// import { useCreateUser } from "../userHooks/useCreateUser";

import { useCreateUser } from "../userHooks/useCreateUser";

import { useUser } from "../userHooks/useUser";

const RegisterPage = () => {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const { user, isLoading } = useUser();
  console.log(user);

  const { createUser, isCreating } = useCreateUser();

  const navigate = useNavigate();

  // Check if user is defined before using it

  // check to see if 'redirect' has been set in the URL
  const { search } = useLocation(); // get search
  const searchParams = new URLSearchParams(search); // pass search to URLSearchParams
  const redirect = searchParams.get("redirect") || "/"; // pass 'redirect' to searchParams or '/'

  useEffect(() => {
    if (user) {
      // if there is user info in in state
      navigate(redirect);
    }
  }, [user, redirect, navigate]);

  async function onSubmit(data) {
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "A user needs a name",
            })}
          ></Input>
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "A user needs an email address",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          ></Input>
        </FormRow>

        <FormRow label="Password" error={errors?.password?.message}>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "A user needs a password",
              minLength: {
                value: 8,
                message: "Passwords must be at least 8 characters long",
              },
            })}
          ></Input>
        </FormRow>

        <FormRow
          label="Password Confirm"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            id="passwordConifrm"
            type="password"
            placeholder="Confirm password"
            {...register("passwordConfirm", {
              required: "Passwords do not match",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
          ></Input>
        </FormRow>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isCreating}
        >
          Sign Up
        </Button>

        {isCreating && <Spinner />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterPage;
