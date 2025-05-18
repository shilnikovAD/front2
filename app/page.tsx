import Gallery from "@/components/gallery"
import FeedbackForm from "@/components/feedback-form"
import CountdownTimer from "@/components/countdown-timer"
import Navigation from "@/components/navigation"
import TimedPopup from "@/components/timed-popup"

export default function Home() {
  // Simple array of images
  const images = [
    { id: 1, src: "/placeholder.svg?height=800&width=600", alt: "Photo 1", width: 800, height: 600 },
    { id: 2, src: "/placeholder.svg?height=800&width=600", alt: "Photo 2", width: 800, height: 600 },
    { id: 3, src: "/placeholder.svg?height=800&width=600", alt: "Photo 3", width: 800, height: 600 },
    { id: 4, src: "/placeholder.svg?height=800&width=600", alt: "Photo 4", width: 800, height: 600 },
    { id: 5, src: "/placeholder.svg?height=800&width=600", alt: "Photo 5", width: 800, height: 600 },
    { id: 6, src: "/placeholder.svg?height=800&width=600", alt: "Photo 6", width: 800, height: 600 },
  ]

  // Graduation date
  const graduationDate = new Date("2025-06-15T12:00:00")

  return (
    <main>
      <Navigation />

      {/* Hero section */}
      <section
        id="hero"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #f1f5f9, #e2e8f0)",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "24px" }}>Welcome to Our Website</h1>
          <p style={{ fontSize: "18px", marginBottom: "32px" }}>
            Explore our interactive features and beautiful gallery
          </p>

          {/* Simple SVG instead of animated one */}
          <svg width="200" height="100" viewBox="0 0 200 100" style={{ margin: "0 auto" }}>
            <circle cx="100" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M10,30 Q60,50 90,30 T170,30" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="80" y="40" width="40" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Gallery section */}
      <section id="gallery" style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "40px", textAlign: "center" }}>
            Photo Gallery
          </h2>
          <Gallery images={images} />
        </div>
      </section>

      {/* Countdown section */}
      <section id="countdown" style={{ padding: "80px 0", background: "#f1f5f9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "40px" }}>Time Until Graduation</h2>
          <CountdownTimer targetDate={graduationDate} />
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "40px", textAlign: "center" }}>
            Contact Us
          </h2>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <FeedbackForm />
          </div>
        </div>
      </section>

      <TimedPopup
        delayMs={30000}
        message="Thank you for visiting our website! Would you like to subscribe to our newsletter?"
      />
    </main>
  )
}
