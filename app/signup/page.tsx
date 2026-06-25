import { AppHeader } from "@/components/app-header";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="shell portal-shell auth-page">
      <AppHeader />
      <section className="auth-layout">
        <AuthForm mode="signup" />
      </section>
    </main>
  );
}
