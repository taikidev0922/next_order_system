"use client";
import { request } from "@/lib/axiosUtils";
import { components } from "@/schema";
import { FlexGrid } from "@mescius/wijmo.react.grid";
import { useState } from "react";
type Customer = components["schemas"]["Customer"];
export default function Page() {
  const [items, setItems] = useState<Customer[]>([]);
  const search = async () => {
    console.log("検索");
    const res = await request({
      url: "/api/customers/",
      method: "get",
    });
    setItems(res.data);
  };
  const update = async () => {
    await request({
      url: "/api/customers/bulk_update/",
      method: "put",
      data: items,
    });
  };
  const columns = [
    {
      binding: "name",
      header: "得意先名",
    },
    {
      binding: "address",
      header: "住所",
    },
    {
      binding: "phone",
      header: "電話番号",
    },
  ];

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
      <div className="flex border border-gray-300">
        <button onClick={search}>検索</button>
      </div>
      <div className="border border-gray-300">
        一覧
        <FlexGrid
          itemsSource={items}
          columns={columns}
          autoGenerateColumns={false}
        />
      </div>
      <button onClick={update}>更新</button>
    </>
  );
}
