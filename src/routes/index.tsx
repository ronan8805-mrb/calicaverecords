import { createFileRoute } from "@tanstack/react-router";
import { FlipDeck } from "@/components/cave/flip-deck";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FlipDeck />;
}
