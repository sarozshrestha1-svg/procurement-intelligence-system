import { AppHeader } from "@/components/app-header";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="shell portal-shell auth-page">
      <AppHeader />
      <section className="auth-layout">
        <AuthForm mode="login" />
      </section>
    </main>
  );
}
