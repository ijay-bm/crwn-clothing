import { FirebaseError } from "firebase/app";
import { type ComponentPropsWithoutRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import InputGroup from "~/components/input-group";
import { errorHandler } from "~/firebase/errorHandler";
import { errorMap } from "~/firebase/errorMap";
import { useAuth } from "~/hooks/useAuth";

import Button from "./button";

interface SignUpFormProperties {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  formAttributes?: ComponentPropsWithoutRef<"form">;
}

export default function SignUpForm({ formAttributes }: SignUpFormProps) {
  const {
    register: bind,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<SignUpFormProperties>();

  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");

  const onSubmit: SubmitHandler<SignUpFormProperties> = async data => {
    try {
      setIsLoading(true);
      await register(data.email, data.password, data.displayName);
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      {...formAttributes}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <InputGroup
        inputAttributes={{
          ...bind("displayName", { required: "This field is required" }),
          disabled: isLoading,
        }}
        label="Display Name"
        error={errors.displayName}
      />

      <InputGroup
        inputAttributes={{
          ...bind("email", { required: "This field is required" }),
          disabled: isLoading,
          type: "email",
        }}
        label="Email"
        error={errors.email}
      />

      <InputGroup
        inputAttributes={{
          ...bind("password", { required: "This field is required" }),
          disabled: isLoading,
          type: "password",
        }}
        label="Password"
        error={errors.password}
      />

      <InputGroup
        inputAttributes={{
          ...bind("confirmPassword", {
            required: "This field is required",
            validate: value => value === password || "Passwords do not match",
          }),
          disabled: isLoading,
          type: "password",
        }}
        label="Confirm Password"
        error={errors.confirmPassword}
      />

      <Button className="mt-7" type="submit" disabled={isLoading}>
        Register
      </Button>
    </form>
  );
}
