"use client";

import { useSearchParams } from "next/navigation";
import DashboardOverview from "@/app/components/DashboardOverview";
import AddRecipeForm from "@/app/components/AddRecipeForm";

export default function Page() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <div className="p-8">
      {view === "new" ? <AddRecipeForm /> : <DashboardOverview />}
    </div>
  );
}