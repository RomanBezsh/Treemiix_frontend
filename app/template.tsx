// Re-mounts on every navigation, so each page gets the same soft fade-in (see .tm-page in globals.css)
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="tm-page">{children}</div>;
}
