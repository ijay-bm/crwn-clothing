import { type ComponentPropsWithoutRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import InputGroup from "~/components/input-group";
import { errorHandler } from "~/firebase/errorHandler";
import { useAuth } from "~/hooks/useAuth";

import Button from "./button";

interface SignInFormProperties {
  email: string;
  password: string;
}

interface SignUpFormProps extends ComponentPropsWithoutRef<"form"> {
  formAttributes?: SignUpFormProps;
}

export default function SigninForm({ formAttributes }: SignUpFormProps) {
  const {
    register: bind,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormProperties>();

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInFormProperties> = async data => {
    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);
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

      <Button className="mt-7" type="submit" disabled={isLoading}>
        Sign In
      </Button>
    </form>
  );
}
