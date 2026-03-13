import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No token provided.");
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (!res.ok) {
          const data = await res.json();
          setStatus("error");
          setMessage(data?.message || "Verification failed.");
        } else {
          setStatus("success");
          setMessage("Email verified! You can now log in.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    };

    verify();
  }, []);

  return (
    <div>
      {status === "loading" && <p>{message}</p>}
      {status === "success" && <p style={{ color: "green" }}>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}