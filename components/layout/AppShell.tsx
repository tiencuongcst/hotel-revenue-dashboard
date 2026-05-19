import { AppSidebar } from './AppSidebar';

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <main className="app-main">{children}</main>
    </div>
  );
}