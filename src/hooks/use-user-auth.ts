import { useSession } from "next-auth/react";

export default function useUserAuth() {
  const session = useSession();

  const userAuthData = session.data?.user;
  const isAuthLoading = session.status === "loading";
  const isLoggedIn = session.status === "authenticated";

  return {
    isLoggedIn,
    userAuthData,
    isAuthLoading,
    session,
  };
}
