import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palawan — SANVIC" },
      { name: "description", content: "Interactive Palawan tourist map by SANVIC." },
      { property: "og:title", content: "Palawan — SANVIC" },
      { property: "og:description", content: "Interactive Palawan tourist map by SANVIC." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#060a10" }}>
      <iframe
        src="/site/index.html"
        title="Palawan SANVIC"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
