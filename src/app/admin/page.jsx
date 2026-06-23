
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Ensure this matches your export
import AdminDashboard from "../components/AdminDashboard";

export default async function AdminPage() {
  const nextHeaders = await headers();
  const headersObject = {};

  if (typeof nextHeaders.entries === "function") {
    for (const [key, value] of nextHeaders.entries()) {
      headersObject[key] = value;
    }
  } else if (typeof nextHeaders.forEach === "function") {
    nextHeaders.forEach((value, key) => {
      headersObject[key] = value;
    });
  }

  const session = await auth.api.getSession({
    headers: headersObject,
  });
  
  // Debug to see what 'auth' actually is
  console.log("Auth object:", auth);

  return <AdminDashboard />;
}