import { AdminLoginForm } from "@/components/admin/admin-login-form";

export function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-soft p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="font-heading text-2xl font-extrabold text-deep">
            Yana Admin
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in to manage your website
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
