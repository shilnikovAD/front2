"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer({ targetDate }) {
  // Initialize state for countdown
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Function to calculate time left
    function updateCountdown() {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      // If target date is in the past, stop countdown
      if (difference <= 0) {
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        return
      }

      // Calculate time units
      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const m = Math.floor((difference / 1000 / 60) % 60)
      const s = Math.floor((difference / 1000) % 60)

      // Update state
      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }

    // Initial calculation
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [targetDate])

  // Add leading zero if number is less than 10
  function formatNumber(num) {
    return num < 10 ? "0" + num : num
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
      {/* Days */}
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{formatNumber(days)}</div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>Days</div>
      </div>

      {/* Hours */}
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{formatNumber(hours)}</div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>Hours</div>
      </div>

      {/* Minutes */}
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{formatNumber(minutes)}</div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>Minutes</div>
      </div>

      {/* Seconds */}
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{formatNumber(seconds)}</div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>Seconds</div>
      </div>
    </div>
  )
}
