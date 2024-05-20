"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { request } from "../lib/axiosUtils";

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
    console.log(res.data);
    localStorage.setItem("token", res.data?.access_token);
    const cus = await request({
      url: "/api/customers/",
      method: "get",
    });
    console.log(cus.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <p>{errors.username?.message}</p>

      <input {...register("password")} />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
}
