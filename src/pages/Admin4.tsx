import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

const SUPABASE_URL = "https://bjwrfmoivnttemjydvyz.supabase.co";

type Lead = {
  id: string;
  session_id: string | null;
  name: string | null;
  email: string | null;
  traffic_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  referrer: string | null;
  landing_page: string | null;
  status: string | null;
  landed_at: string | null;
  email_submitted_at: string | null;
  quiz_completed_at: string | null;
  paywall_reached_at: string | null;
  trial_price_cents: number | null;
  upsell_kit: boolean | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  quiz_results: { questions_answered?: number; total_questions?: number; answers?: number[]; in_progress?: boolean } | null;
  created_at: string;
};

const fmt = (v: string | null) =>
  v ? new Date(v).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const Dot = ({ on }: { on: boolean }) => (
  <span
    className="inline-block rounded-full"
    style={{ width: 10, height: 10, background: on ? "#16a34a" : "#e5e7eb", boxShadow: on ? "0 0 0 2px #dcfce7" : "none" }}
  />
);

const Admin4: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState<"all" | "email" | "quiz" | "paywall" | "paid">("all");

  useEffect(() => {
    if (sessionStorage.getItem("admin4_authenticated") === "true") setAuthed(true);
  }, []);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const pw = sessionStorage.getItem("admin4_password") || "2025";
      const res = await fetch(`${SUPABASE_URL}/functions/v1/admin-google-leads`, {
        method: "GET",
        headers: { "x-admin-password": pw },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setLeads(data.leads || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      email: leads.filter((l) => l.email_submitted_at).length,
      quiz: leads.filter((l) => l.quiz_completed_at).length,
      paywall: leads.filter((l) => l.paywall_reached_at).length,
      paid: leads.filter((l) => !!l.stripe_subscription_id).length,
    };
  }, [leads]);

  const filtered = useMemo(() => {
    switch (filter) {
      case "email": return leads.filter((l) => l.email_submitted_at);
      case "quiz": return leads.filter((l) => l.quiz_completed_at);
      case "paywall": return leads.filter((l) => l.paywall_reached_at);
      case "paid": return leads.filter((l) => !!l.stripe_subscription_id);
      default: return leads;
    }
  }, [leads, filter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2025") {
      sessionStorage.setItem("admin4_authenticated", "true");
      sessionStorage.setItem("admin4_password", password);
      setAuthed(true);
      setLoginErr("");
    } else {
      setLoginErr("Incorrect password.");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow p-8 max-w-sm w-full space-y-4">
          <h1 className="text-xl font-bold text-slate-800">Admin 4 · Google Ads</h1>
          {loginErr && <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded">{loginErr}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            autoFocus
          />
          <button className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700" type="submit">
            Enter
          </button>
          <Link to="/" className="block text-center text-sm text-slate-500 hover:underline">← Home</Link>
        </form>
      </div>
    );
  }

  const tabs: { key: typeof filter; label: string; count: number }[] = [
    { key: "all", label: "All visitors", count: stats.total },
    { key: "email", label: "Filled email", count: stats.email },
    { key: "quiz", label: "Completed quiz", count: stats.quiz },
    { key: "paywall", label: "Reached paywall", count: stats.paywall },
    { key: "paid", label: "Paid", count: stats.paid },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Admin 4 — All Traffic</h1>
            <p className="text-slate-500 text-sm">Every visitor. Quiz progress shows how many questions they answered before exiting.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="px-3 py-2 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center gap-1 text-sm">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <Link to="/" className="px-3 py-2 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center gap-1 text-sm">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>

        {err && <div className="bg-red-50 text-red-700 px-4 py-3 rounded mb-4">{err}</div>}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`text-left bg-white rounded-lg shadow-sm p-4 border-2 transition ${
                filter === t.key ? "border-slate-800" : "border-transparent hover:border-slate-200"
              }`}
            >
              <div className="text-xs uppercase tracking-wide text-slate-500">{t.label}</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{t.count}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 text-left">
              <tr>
                <th className="px-3 py-2">Landed</th>
                <th className="px-3 py-2">Email / Name</th>
                <th className="px-3 py-2">Source / Campaign</th>
                <th className="px-3 py-2">Quiz progress</th>
                <th className="px-3 py-2 text-center">Landed</th>
                <th className="px-3 py-2 text-center">Email</th>
                <th className="px-3 py-2 text-center">Quiz</th>
                <th className="px-3 py-2 text-center">Paywall</th>
                <th className="px-3 py-2 text-center">Paid</th>
                <th className="px-3 py-2">Trial $</th>
                <th className="px-3 py-2">gclid</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={11} className="px-3 py-6 text-center text-slate-400">Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={11} className="px-3 py-6 text-center text-slate-400">No traffic yet.</td></tr>
              )}
              {filtered.map((l) => {
                const qr = l.quiz_results || {};
                const answered = typeof qr.questions_answered === "number"
                  ? qr.questions_answered
                  : Array.isArray(qr.answers) ? qr.answers.filter((v) => v != null).length : null;
                const total = qr.total_questions ?? 20;
                const completed = !!l.quiz_completed_at;
                const progressLabel = completed
                  ? `${total}/${total} ✓`
                  : answered != null
                    ? `${answered}/${total} · exited`
                    : "—";
                return (
                <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{fmt(l.landed_at || l.created_at)}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-slate-800">{l.email || <span className="text-slate-400">no email</span>}</div>
                    {l.name && <div className="text-xs text-slate-500">{l.name}</div>}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    <div>{l.traffic_source || "—"}</div>
                    <div className="text-xs text-slate-400">{l.utm_campaign || ""}{l.utm_medium ? ` · ${l.utm_medium}` : ""}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className={`text-sm font-medium ${completed ? "text-emerald-700" : answered ? "text-amber-700" : "text-slate-400"}`}>
                      {progressLabel}
                    </div>
                    {!completed && answered != null && (
                      <div className="w-24 h-1.5 bg-slate-100 rounded overflow-hidden mt-1">
                        <div className="h-full bg-amber-400" style={{ width: `${Math.min(100, (answered / total) * 100)}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center"><Dot on={!!l.landed_at} /></td>
                  <td className="px-3 py-2 text-center"><Dot on={!!l.email_submitted_at} /></td>
                  <td className="px-3 py-2 text-center"><Dot on={!!l.quiz_completed_at} /></td>
                  <td className="px-3 py-2 text-center"><Dot on={!!l.paywall_reached_at} /></td>
                  <td className="px-3 py-2 text-center"><Dot on={!!l.stripe_subscription_id} /></td>
                  <td className="px-3 py-2 text-slate-600">{l.trial_price_cents ? `$${(l.trial_price_cents / 100).toFixed(2)}` : "—"}</td>
                  <td className="px-3 py-2 text-xs text-slate-400 max-w-[140px] truncate" title={l.gclid || ""}>{l.gclid || "—"}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Quiz progress shows the last question the visitor answered (out of 24). "Exited" means they left before completing the quiz.
        </p>
      </div>
    </div>
  );
};

export default Admin4;