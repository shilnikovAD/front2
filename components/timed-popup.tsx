"use client"

import { useState, useEffect } from "react"

export default function TimedPopup({ delayMs, message }) {
  // State for popup visibility
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if popup was previously closed
    const wasClosed = localStorage.getItem("popupClosed")

    // Show popup after delay if not previously closed
    if (wasClosed !== "true") {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delayMs)

      // Clean up timer
      return () => clearTimeout(timer)
    }
  }, [delayMs])

  // Close popup and save to localStorage
  function closePopup() {
    setIsVisible(false)
    localStorage.setItem("popupClosed", "true")
  }

  // If popup is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 1000,
        maxWidth: "400px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "24px" }}>
        {/* Close button */}
        <button
          onClick={closePopup}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          X
        </button>

        {/* Message */}
        <div style={{ marginBottom: "16px" }}>
          <p>{message}</p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={closePopup}
            style={{
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            No, thanks
          </button>
          <button
            onClick={closePopup}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#3b82f6",
              color: "white",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
