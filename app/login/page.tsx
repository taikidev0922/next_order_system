"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { request } from "../../lib/axiosUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";

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
    control,
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
    login(res.data.user, res.data.access_token);
    router.push("/order_system/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">サンプル受注システム</h1>
        <TextInput
          control={control}
          name="username"
          errors={errors}
          label="ユーザー名"
          className="space-y-2"
        />
        <TextInput
          control={control}
          name="password"
          errors={errors}
          label="パスワード"
          inputType="password"
          className="space-y-2"
        />
        <Button text="ログイン" className="w-full btn-primary mt-4" />
      </form>
    </div>
  );
}
