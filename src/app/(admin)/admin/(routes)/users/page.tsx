import UserDataClient from "@/components/admin/users/user-data-client";
import { api } from "@/trpc/server";
import { type ROLE } from "@prisma/client";

export const revalidate = 0;

export default async function UsersPage() {
  const data = await api.usersData.getUser.query();

  const filteredData = data.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    verified: user.emailVerified,
    role: user.role as ROLE,
  }));

  return <UserDataClient data={filteredData} />;
}
