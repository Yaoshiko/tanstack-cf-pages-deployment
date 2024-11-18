import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <p>{import.meta.env.VITE_APP_NAME}</p>;
}
