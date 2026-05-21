import { getSessionUser } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSessionUser();

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}