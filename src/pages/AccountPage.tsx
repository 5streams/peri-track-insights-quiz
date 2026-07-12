import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AccountPage = () => {
  const [params] = useSearchParams();
  const leadId = params.get("lead");
  const [status, setStatus] = useState("Opening your billing portal…");

  useEffect(() => {
    (async () => {
      if (!leadId) {
        setStatus("Missing account reference. Please use the link from your welcome email.");
        return;
      }
      try {
        const { data, error } = await supabase.functions.invoke("create-portal-session", {
          body: { lead_id: leadId },
        });
        if (error) throw error;
        if (data?.url) window.location.href = data.url;
        else setStatus("No subscription found for this account.");
      } catch (e: any) {
        setStatus(e?.message || "Could not open the billing portal.");
      }
    })();
  }, [leadId]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "system-ui, sans-serif", background: "#F7EDE2" }}>
      <div style={{ background: "#fff", padding: "28px 32px", borderRadius: 12, maxWidth: 480 }}>
        <p style={{ color: "#3B2233", fontSize: 16 }}>{status}</p>
      </div>
    </div>
  );
};

export default AccountPage;