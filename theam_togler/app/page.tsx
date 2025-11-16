import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeToggle />
      <h1>Next.js Theme Toggle</h1>
    </main>
  );
}
