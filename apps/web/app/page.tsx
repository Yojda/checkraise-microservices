// app/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("...");

  useEffect(() => {
    fetch(`${process.env.API_URL || "http://localhost:4000"}/hello`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return (
    <main>
      <h1>Next.js + OpenTelemetry Demo</h1>
      <p>API response: {msg}</p>
    </main>
  );
}
