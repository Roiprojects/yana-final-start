export function AdminPasswordPage() {
  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Change Password</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Update your admin account password.
        </p>
      </div>
      <div className="rounded-xl border border-dashed border-border-soft bg-white p-6 text-sm text-text-secondary">
        Password change is not wired up yet. Set admin credentials via the
        server environment variables.
      </div>
    </div>
  );
}
