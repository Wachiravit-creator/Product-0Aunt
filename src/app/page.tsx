import { auth, signOut } from "@/auth";
import ProductExplorer from "@/componets/ProductExplorer";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <header className="app-header">
        <div>
          <p className="app-brand">PROJECT EXPLORER</p>
          <span className="app-user">{session?.user?.name ?? session?.user?.email ?? "ผู้ใช้งาน"}</span>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="logout-button" type="submit">ออกจากระบบ</button>
        </form>
      </header>
      <ProductExplorer />
    </>
  );
}
