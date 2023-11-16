import FormRow from "./FormRow";
import Input from "./Input";

import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLogin } from "../userHooks/useLogin";

const LoginForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const [inputType, setInputType] = useState("password");

  const { login, isLoggingIn } = useLogin();


  

  const toggleInput = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  async function onSubmit({ email, password }) {
    login({ email, password });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="email" error={errors?.email?.message}>
        <Input
          autoComplete="username"
          disabled={isLoggingIn}
          type="email"
          id="email"
          {...register("email", {
            required: "Please enter an email address",
          })}
        ></Input>
      </FormRow>

      <FormRow label="password" error={errors?.password?.message}>
        <Input
          autoComplete="current-password"
          disabled={isLoggingIn}
          type={inputType}
          id="password"
          {...register("password", {
            required: "Please enter a password",
          })}
        ></Input>
        <Button
          disabled={isLoggingIn}
          variant="primary"
          className="my-2"
          onClick={toggleInput}
        >
          Show/hide
        </Button>
      </FormRow>

      <Button
        // disabled={isCreating}
        type="submit"
        variant="primary"
        className="my-2"
      >
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
