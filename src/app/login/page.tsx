import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-icon" aria-hidden="true">PE</div>
        <p className="eyebrow">PROJECT EXPLORER</p>
        <h1 id="login-title">เข้าสู่ระบบ</h1>
        <p className="login-description">
          ลงชื่อเข้าใช้ด้วย Google 
        </p>
        <form action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}>
          <button className="google-button" type="submit">
            <span className="google-mark" aria-hidden="true">G</span>
            เข้าสู่ระบบด้วย Google
          </button>
        </form>
      </section>
    </main>
  );
}
