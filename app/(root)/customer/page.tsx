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
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
type CustomerQuery = Query<"/api/customers/">;
export default function Page() {
  const { showDialog } = useDialogContext();
  const { showToast } = useToastContext();
  const schema = yup
    .object({
      name: yup.string().label("得意先名").optional(),
      address: yup.string().label("住所").optional(),
      phone: yup.string().label("電話番号").optional().max(11),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    control,
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
      <form onSubmit={handleSubmit(search)} noValidate>
        <div className="flex border border-gray-300 items-center gap-3">
          <TextInput
            control={control}
            name="name"
            label="得意先名"
            errors={errors}
          />
          <TextInput
            control={control}
            name="address"
            label="住所"
            errors={errors}
          />
          <TextInput
            control={control}
            name="phone"
            label="電話番号"
            errors={errors}
          />
          <Button text="検索" />
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
