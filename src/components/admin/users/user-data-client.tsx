"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/admin/page-title";
import UsersDataTable from "@/components/admin/users/data-table";
import { type UserType } from "./column";

type Props = {
  data: UserType[];
};

export default function UserDataClient({ data }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Users" />

      <UsersDataTable data={data} searchInput="email" />
    </div>
  );
}
