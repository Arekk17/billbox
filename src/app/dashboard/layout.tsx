import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { getUserById } from "@/lib/services/user.service";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import "../globals.css";
import Header from "@/components/molecules/Nav/Header";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getUserFromCookie();
  const uid = authUser?.uid;
  if (!uid) return redirect("/auth/login");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await getUserById(uid);
      return { uid, ...user };
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <div className="dashboard-layout bg-base-100">
        <Header />
        <main>{children}</main>
      </div>
    </QueryProvider>
  );
}
