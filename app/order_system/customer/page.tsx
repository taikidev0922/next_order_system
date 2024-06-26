"use client";
import GridForm from "@/components/GridForm/GridForm";
import { request } from "@/lib/axiosUtils";
import { GridColumn } from "@/types/GridColumn";
import { Query } from "@/lib/schemaHelper";
import yup from "@/lib/yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGridForm } from "@/hook/useGridForm";
import { useToastContext } from "@/context/ToastContext";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { useKeyboardShortcuts } from "@/hook/useKeyboardShortcuts";
import ActionHeader from "@/components/ActionHeader/ActionHeader";
import Card from "@/components/Card/Card";
type CustomerQuery = Query<"/api/customers/">;
export default function Page() {
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
    mode: "onChange",
  });

  const search = async (data: CustomerQuery) => {
    const res = await request({
      url: "/api/customers/",
      method: "get",
      params: data,
    });
    setItemsSource(res.data ?? []);
  };

  const update = async () => {
    if (getSelectedItems()?.length === 0) {
      showToast({
        text: "更新対象の行が選択されていません",
        type: "error",
      });
      return;
    }
    try {
      const results = await request({
        url: "/api/customers/bulk-update/",
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
  };

  useKeyboardShortcuts([
    {
      keys: "F1",
      action: handleSubmit(search),
    },
    {
      keys: "F4",
      action: update,
    },
  ]);
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
      name: "得意先マスタ",
    });

  return (
    <>
      <ActionHeader
        actions={["createAndUpdate", "delete", "view"]}
        onUpdate={update}
        onDelete={update}
      />
      <form onSubmit={handleSubmit(search)} noValidate>
        <Card title="検索項目">
          <div className="flex items-center gap-3">
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
            <Button text="検索 F1" />
          </div>
        </Card>
      </form>
      <Card title="一覧">
        <div>
          <GridForm {...gridRegister()} />
        </div>
      </Card>
    </>
  );
}
