"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { request } from "../../lib/axiosUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type InputType = {
  username: string;
  password: string;
};

export default function App() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: InputType) => {
    const res = await request({
      url: "/api/auth/login/",
      method: "post",
      data: data,
    });
    login(res.data.user, res.data.refresh_token);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} />
        <p>{errors.username?.message}</p>

        <input {...register("password")} type="password" />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}
