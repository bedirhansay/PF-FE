"use client";

import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { login } from "@actions";
import { LoginDTO } from "@types";
import { LoginSchema } from "@validations";
import { Input, Button, Heading } from "@components/ui";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: joiResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    const res = await login(data);
    if (res) {
      window.location.href = "/";
    }
  };

  return (
    <div className="absolute -40 border rounded shadow-lg  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-96  flex-col justify-center px-6 py-12 lg:px-8 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Heading link="" title="Login" />
      </div>

      <div className="flex flex-col gap-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <Input {...register("email")} />
              <small className="bg-red-500 text-white">
                {errors.email?.message}
              </small>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                {...register("password")}
                id="password"
                name="password"
                type="password"
              />
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              type="submit"
              className="flex w-full justify-center hover:bg-slate-300 text-white"
            >
              login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
