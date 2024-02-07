import Hero from "@/components/hero";
import { unstable_noStore as noStore } from "next/cache";
// import Link from "next/link";

// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <main>
      <Hero />
    </main>
  );
}
