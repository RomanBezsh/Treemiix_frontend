// Re-mounts when switching between account sections, so the content area slides in the same way every time
export default function AccountTemplate({ children }: { children: React.ReactNode }) {
  return <div className="tm-fade-up">{children}</div>;
}
