import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLeads, getStoredToken, clearToken } from "../api.js";

function formatDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadLeads(isRefresh = false, activeCheck = () => true) {
    const token = getStoredToken();
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const data = await fetchLeads(token);
      if (activeCheck()) setLeads(data);
    } catch (err) {
      if (err.status === 401) {
        clearToken();
        navigate("/admin", { replace: true });
      } else if (activeCheck()) {
        setError(err.message || "Failed to load leads.");
      }
    } finally {
      if (activeCheck()) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }

  useEffect(() => {
    let active = true;
    loadLeads(false, () => active);
    return () => {
      active = false;
    };
  }, [navigate]);

  function handleLogout() {
    clearToken();
    navigate("/admin", { replace: true });
  }

  return (
    <div className="page page-wide">
      <div className="admin-header">
        <div>
          <h1>Admin <span className="brand-gradient">Panel</span></h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>
            Submitted leads (newest first)
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            className="btn-refresh" 
            onClick={() => loadLeads(true)} 
            disabled={refreshing || loading}
            title="Refresh Leads"
          >
            <svg 
              className={refreshing ? "spinning" : ""} 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
          </button>
          <button className="btn-danger" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading && <p>Loading leads...</p>}

      {!loading && !error && (
        <div className="card">
          {leads.length === 0 ? (
            <div className="empty">No leads submitted yet.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>S.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Club Name</th>
                    <th>Message</th>
                    <th>Submission Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={lead.id}>
                      <td>{index + 1}</td>
                      <td>{lead.firstName}</td>
                      <td>{lead.lastName}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.clubName}</td>
                      <td>{lead.message || "—"}</td>
                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
