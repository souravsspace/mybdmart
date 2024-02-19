import PageTitle from "@/components/admin/page-title";
import { type Role } from "@/components/admin/users/column";
import UsersDataTable from "@/components/admin/users/data-table";
import { api } from "@/trpc/server";

export const revalidate = 0;

export default async function UsersPage() {
  const data = await api.usersData.getUser.query();

  const filteredData = data.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    verified: user.emailVerified,
    role: user.role as Role,
  }));

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Users" />

      <UsersDataTable data={filteredData} searchInput="email" />
    </div>
  );
}
