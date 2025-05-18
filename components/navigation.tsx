"use client"

import { useState, useEffect } from "react"

export default function Navigation() {
  // State for fixed menu
  const [isFixed, setIsFixed] = useState(false)
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(false)

  // Navigation items
  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Gallery", href: "#gallery" },
    { name: "Countdown", href: "#countdown" },
    { name: "Contact", href: "#contact" },
  ]

  // Handle scroll to fix menu
  useEffect(() => {
    function handleScroll() {
      // Get viewport height
      const viewportHeight = window.innerHeight

      // Fix menu after scrolling past first screen
      if (window.scrollY > viewportHeight) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    // Check if screen is mobile
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle mobile menu
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      style={{
        width: "100%",
        position: isFixed ? "fixed" : "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: isFixed ? "white" : "transparent",
        boxShadow: isFixed ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        {/* Logo */}
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            My Website
          </a>
        </div>

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "24px" }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f6")}
                onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile menu */}
        {isMobile && isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              right: 0,
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 0",
                  textDecoration: "none",
                  color: "inherit",
                  borderBottom: "1px solid #e5e7eb",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
