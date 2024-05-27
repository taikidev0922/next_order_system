"use client";
import GridForm from "@/components/GridForm/GridForm";
import { request } from "@/lib/axiosUtils";
import { GridColumn } from "@/types/GridColumn";
import { Query } from "@/lib/schemaHelper";
import yup from "@/lib/yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGridForm } from "@/hook/useGridForm";
import { useDialogContext } from "@/context/dialogContext";
import { useToastContext } from "@/context/ToastContext";
type CustomerQuery = Query<"/api/customers/">;
export default function Page() {
  const { showDialog } = useDialogContext();
  const { showToast } = useToastContext();
  const schema = yup
    .object({
      name: yup.string().optional(),
      address: yup.string().optional(),
      phone: yup.string().optional(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerQuery>({
    resolver: yupResolver(schema),
  });

  const search = async (data: CustomerQuery) => {
    const res = await request({
      url: "/api/customers/",
      method: "get",
      params: data,
    });
    setItemsSource(res.data);
  };
  const update = async () => {
    showDialog({
      text: "更新しますか？",
      type: "confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const results = await request({
            url: "/api/customers/bulk_update/",
            method: "put",
            data: getSelectedItems(),
          });
          showToast({
            text: "更新しました",
            type: "success",
          });
          setResults(results.data);
        } catch (error) {
          setResults(error?.response.data);
        }
      }
    });
  };
  const columns: GridColumn[] = [
    {
      binding: "name",
      header: "得意先名",
      dataType: "string",
    },
    {
      binding: "address",
      header: "住所",
      dataType: "string",
    },
    {
      binding: "phone",
      header: "電話番号",
      dataType: "string",
    },
  ];
  const { gridRegister, setItemsSource, getSelectedItems, setResults } =
    useGridForm({
      columns,
    });

  return (
    <>
      <div className="border border-gray-300 flex">
        <input type="radio" />
        <label>編集</label>
        <input type="radio" />
        <label>削除</label>
        <input type="radio" />
        <label>参照</label>
      </div>
      <form onSubmit={handleSubmit(search)}>
        <div className="flex border border-gray-300">
          <label>得意先名</label>
          <input {...register("name")} />
          <label>住所</label>
          <input {...register("address")} />
          <label>電話番号</label>
          <input {...register("phone")} />
          <button type="submit">検索</button>
        </div>
      </form>
      <div className="border border-gray-300">
        一覧
        <GridForm {...gridRegister()} />
      </div>
      <button onClick={update}>更新</button>
    </>
  );
}
