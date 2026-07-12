import React, { useState } from "react";

const FN_URL = "https://bjwrfmoivnttemjydvyz.supabase.co/functions/v1/create-portal-session";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd3JmbW9pdm50dGVtanlkdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTg5MDgsImV4cCI6MjA5OTQzNDkwOH0.qy-dVr9MHDcBXAeUSpG-6emyvFPfZGsl4eixvyvvtOs";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function openPortal(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErr(data.error || "We couldn't find your account. Check the email you used at checkout.");
      }
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      maxWidth: 460,
      margin: "0 auto",
      padding: "40px 22px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#3a2434",
      lineHeight: 1.55,
    }}>
      <h1 style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 32, marginBottom: 6 }}>
        Manage your subscription
      </h1>
      <p style={{ fontSize: 16, color: "#6E5665" }}>
        Enter the email you used at checkout. We'll open your Stripe billing portal — cancel, update card, or view invoices in one tap.
      </p>
      <form onSubmit={openPortal}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: 16,
            border: "2px solid #E3CFD7",
            borderRadius: 10,
            margin: "18px 0",
          }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            background: "#A4688F",
            color: "#fff",
            border: 0,
            borderRadius: 12,
            padding: "16px 20px",
            fontSize: 16,
            fontWeight: 700,
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "Opening portal…" : "Open billing portal"}
        </button>
      </form>
      {err && <p style={{ color: "#a11", marginTop: 12 }}>{err}</p>}
    </div>
  );
}
