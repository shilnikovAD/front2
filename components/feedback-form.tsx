"use client"

import { useState } from "react"

export default function FeedbackForm() {
  // Form visibility state
  const [isOpen, setIsOpen] = useState(false)

  // Form data
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  // Form errors
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [messageError, setMessageError] = useState("")

  // Form status
  const [status, setStatus] = useState("idle") // idle, submitting, success, error

  // Toggle form visibility
  function toggleForm() {
    setIsOpen(!isOpen)

    // Reset form when closing
    if (isOpen) {
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
      setNameError("")
      setEmailError("")
      setPhoneError("")
      setMessageError("")
      setStatus("idle")
    }
  }

  // Validate form
  function validateForm() {
    let isValid = true

    // Name validation (Russian or English letters only)
    if (!name.trim()) {
      setNameError("Name is required")
      isValid = false
    } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name)) {
      setNameError("Name should contain only Russian or English letters")
      isValid = false
    } else {
      setNameError("")
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    } else {
      setEmailError("")
    }

    // Phone validation
    if (!phone.trim()) {
      setPhoneError("Phone number is required")
      isValid = false
    } else if (!/^\+?[0-9\s\-()]{10,15}$/.test(phone)) {
      setPhoneError("Please enter a valid phone number")
      isValid = false
    } else {
      setPhoneError("")
    }

    // Message validation (Russian or English letters only)
    if (!message.trim()) {
      setMessageError("Message is required")
      isValid = false
    } else if (!/^[A-Za-zА-Яа-яЁё0-9\s.,!?()-:;'"]+$/.test(message)) {
      setMessageError("Message should contain only Russian or English characters")
      isValid = false
    } else {
      setMessageError("")
    }

    return isValid
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus("submitting")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Log form data (in a real app, you would send this to a server)
      console.log("Form submitted:", { name, email, phone, message })

      setStatus("success")

      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus("idle")
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
      }, 3000)
    } catch (error) {
      setStatus("error")
      console.error("Form submission error:", error)
    }
  }

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={toggleForm}
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        {isOpen ? "Close Form" : "Contact Us"}
      </button>

      {/* Form container with animation */}
      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          opacity: isOpen ? "1" : "0",
          overflow: "hidden",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Name field */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: nameError ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
              disabled={status === "submitting" || status === "success"}
            />
            {nameError && <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{nameError}</p>}
          </div>

          {/* Email field */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: emailError ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
              disabled={status === "submitting" || status === "success"}
            />
            {emailError && <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{emailError}</p>}
          </div>

          {/* Phone field */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: phoneError ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
              disabled={status === "submitting" || status === "success"}
            />
            {phoneError && <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{phoneError}</p>}
          </div>

          {/* Message field */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: messageError ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "100px",
              }}
              disabled={status === "submitting" || status === "success"}
            />
            {messageError && <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{messageError}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: status === "submitting" || status === "success" ? "not-allowed" : "pointer",
              backgroundColor: status === "success" ? "#16a34a" : status === "error" ? "#dc2626" : "#3b82f6",
              color: "white",
            }}
            disabled={status === "submitting" || status === "success"}
          >
            {status === "idle" && "Send Message"}
            {status === "submitting" && "Sending..."}
            {status === "success" && "Successfully Sent!"}
            {status === "error" && "Error! Try Again"}
          </button>
        </form>
      </div>
    </div>
  )
}
