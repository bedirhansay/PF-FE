"use client";

import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./login.module.scss";
import { LoginDTO } from "@/lib/Types";
import { LoginSchema } from "@/lib/validation";
import { login } from "@/lib/Actions";
import { Button, Heading, Input } from "@/components/ui";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: joiResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true);

    const res = await login(data);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Başarıyla Giriş yapıldı");
      setLoading(false);

      setTimeout(() => {
        window.location.href = "/admin/blog";
      }, 1000);
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.headingSection}>
        <Heading link="" title="Login" />
      </div>

      <div className={styles.formSection}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.usernameLabel}>
              Username
            </label>
            <div className={styles.inputSection}>
              <Input {...register("email")} />
              <small className="bg-red-500 text-white">
                {errors.email?.message}
              </small>
            </div>
          </div>

          <div>
            <div className={styles.passwordSection}>
              <label htmlFor="password" className={styles.usernameLabel}>
                Password
              </label>
              <div className="text-sm">
                <a href="#" className={styles.forgotPasswordLink}>
                  Forgot password?
                </a>
              </div>
            </div>
            <div className={styles.inputSection}>
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
              status={loading}
              variant="outline"
              type="submit"
              className={styles.loginButton}
            >
              login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
