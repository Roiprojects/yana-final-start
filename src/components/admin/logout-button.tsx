
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api/client";

export function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.logout();
    } finally {
      navigate("/admin/login");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-sm text-text-main hover:bg-bg-soft"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
