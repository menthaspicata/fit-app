"use client";

import { authClient } from "@/lib/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <button
      onClick={() => handleLogout()}
      className="w-full flex items-center gap-3 text-left group cursor-pointer"
    >
      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="w-3.5 h-3.5 text-red-500"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-500 group-hover:text-red-600 transition-colors">
          Sign Out
        </p>
        <p className="text-xs text-gray-400">End your current session</p>
      </div>
    </button>
  );
}
