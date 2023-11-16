import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "./Input";
import FormRow from "./FormRow";
import { useUser } from "../userHooks/useUser";
import { useState } from "react";
import { useEditUser } from "../userHooks/usEditUser";

const ProfileForm = () => {
  const { updateMe, isUpdating } = useEditUser();

  const [inputTypeCurrentPassword, setinputTypeCurrentPassword] =
    useState("password");

  const [inputTypeNewPassword, setInputTypeNewPassword] =
    useState("newPassword");

  const [inputTypeNewPasswordConfirm, setInputTypeNewPasswordConfirm] =
    useState("newPasswordConfirm");

  const { isLoading, user, isAdmin, error } = useUser();

  const { ...editValues } = user;

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  const toggleInput = () => {
    setinputTypeCurrentPassword(
      inputTypeCurrentPassword === "password" ? "text" : "password"
    );
  };

  const toggleInputNewPassword = () => {
    setInputTypeNewPassword(
      inputTypeNewPassword === "password" ? "text" : "password"
    );
  };

  const toggleInputNewPasswordConfirm = () => {
    setInputTypeNewPasswordConfirm(
      inputTypeNewPasswordConfirm === "password" ? "text" : "password"
    );
  };

  async function onSubmit(data) {
    console.log(data);
    updateMe(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  const validateNewPasswordConfirm = (value) => {
    // Check if "newPassword" field has a value
    const newPasswordValue = getValues("newPassword");
    if (newPasswordValue !== value) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "You cannot change your email",
          })}
        ></Input>
      </FormRow>

      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Please enter your name",
          })}
        ></Input>
      </FormRow>

      <FormRow label="Current Password" error={errors?.password?.message}>
        <Input
          // disabled={isLoggingIn}
          type={inputTypeCurrentPassword}
          id="password"
          {...register("password", {
            required: "Please enter a password",
          })}
        ></Input>
        <Button
          // disabled={isLoggingIn}
          variant="primary"
          className="my-2"
          onClick={toggleInput}
        >
          Show/hide
        </Button>
      </FormRow>

      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <Input
          // disabled={isLoggingIn}
          type={inputTypeNewPassword}
          id="newPassword"
          {...register("newPassword", {
            minLength: {
              value: 8,
              message: "Passwords must be at least 8 characters long",
            },
          })}
        ></Input>
        <Button
          // disabled={isLoggingIn}
          variant="primary"
          className="my-2"
          onClick={toggleInputNewPassword}
        >
          Show/hide
        </Button>
      </FormRow>

      <FormRow
        label="Confirm New Password"
        error={errors?.newPasswordConfirm?.message}
      >
        <Input
          // disabled={isLoggingIn}
          type={inputTypeNewPasswordConfirm}
          id="newPasswordConfirm"
          {...register("newPasswordConfirm", {
            validate: validateNewPasswordConfirm, // Use the custom validation function
          })}
        ></Input>
        <Button
          // disabled={isLoggingIn}
          variant="primary"
          className="my-2"
          onClick={toggleInputNewPasswordConfirm}
        >
          Show/hide
        </Button>
      </FormRow>
      <Button
        // disabled={isEditing}
        type="submit"
        variant="primary"
        className="my-2"
      >
        Update user
      </Button>
      <Button type="reset" variant="primary" className="my-2">
        Cancel
      </Button>
    </Form>
  );
};

export default ProfileForm;
