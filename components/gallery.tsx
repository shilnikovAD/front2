"use client"

import { useState } from "react"
import Image from "next/image"

// Simple gallery component
export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Open image in popup
  function openImage(image, index) {
    setSelectedImage(image)
    setCurrentIndex(index)

    // Hide scrollbar when popup is open
    document.body.style.overflow = "hidden"
  }

  // Close popup
  function closeImage() {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  // Navigate between images
  function navigateImage(direction) {
    const newIndex = currentIndex + direction

    // Check if index is valid
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  // Handle keyboard navigation
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeImage()
    } else if (e.key === "ArrowLeft") {
      navigateImage(-1)
    } else if (e.key === "ArrowRight") {
      navigateImage(1)
    }
  }

  return (
    <div>
      {/* Gallery grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              position: "relative",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => openImage(image, index)}
          >
            <Image
              src={image.src || `/placeholder.svg?height=800&width=600`}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Image popup */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={closeImage}
          >
            X
          </button>

          {/* Image container */}
          <div style={{ position: "relative", width: "80%", height: "80%" }}>
            <Image
              src={selectedImage.src || `/placeholder.svg?height=800&width=600`}
              alt={selectedImage.alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Navigation buttons */}
          {currentIndex > 0 && (
            <button
              style={{
                position: "absolute",
                left: "20px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation()
                navigateImage(-1)
              }}
            >
              &lt;
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              style={{
                position: "absolute",
                right: "20px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation()
                navigateImage(1)
              }}
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  )
}
