"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { NanoBananaService, properties } from "@/lib/nanoBanana";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  // Auth State
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [isAppActive, setIsAppActive] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisioning, setIsVisioning] = useState(false);
  const [visionStatus, setVisionStatus] = useState("ANALYZING ARCHITECTURAL DETAILS...");

  const handleLogin = () => {
    if (!currentUser) {
      // Simulate Google Login
      const email = prompt("Enter your Google email to log in (Developer Mock):", "architect@visionary.com");
      if (email) {
        setCurrentUser({ email: email, name: email.split('@')[0] });
        setIsAppActive(true);
      }
    } else {
      if (confirm("Logout from Visionary?")) {
        setCurrentUser(null);
        setIsAppActive(false);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    if (!currentUser) {
      alert("AUTH REQUIRED: PLEASE LOGIN WITH GOOGLE TO UNLOCK AI VISION ENGINE.");
      return;
    }

    setIsVisioning(true);
    setVisionStatus(`ANALYZING: ${searchQuery}`);

    try {
      await NanoBananaService.generateVision(searchQuery);
      setVisionStatus("GENERATING ARCHITECTURAL VISION...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`VISION UNLOCKED: "${searchQuery}" analyzed. Structural Integrity Verified.`);
    } catch (error) {
      console.error(error);
      alert("Vision Engine Offline. Check Connection.");
    } finally {
      setIsVisioning(false);
      setSearchQuery(""); // Optional clear
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={isAppActive ? "app-active" : ""}>
      {/* Vision Overlay */}
      <div className={`overlay ${isVisioning ? 'active' : ''}`}>
        <div className="spinner"></div>
        <h3>{visionStatus}</h3>
      </div>

      <section className="hero">
        <div className="auth-bar">
          <button className="google-login-btn" onClick={handleLogin}>
            {currentUser ? (
              <span style={{ color: '#4CAF50' }}>HI, {currentUser.name.toUpperCase()}</span>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="G" width="20" />
                LOG IN WITH GOOGLE
              </>
            )}
          </button>
        </div>

        <div className="hero-content">
          <h1 className="logo">VISIONARY</h1>
          <p className="hero-subtitle">DON'T BUY THE HOUSE. BUY THE VISION.</p>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={isAppActive ? "PASTE LISTING URL..." : "ENTER ADDRESS OR URL..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              {isVisioning ? "..." : "GO"}
            </button>
          </div>

          <div className="hero-tags">
            <span>STRUCTURAL INTEGRITY</span>
            <span>•</span>
            <span>ARCHITECTURAL VISION</span>
            <span>•</span>
            <span>INSTANT FEASIBILITY</span>
          </div>
        </div>
      </section>

      {/* Property Feed */}
      <div className="feed-header" style={{ display: isAppActive ? 'block' : 'block' }}>
        {/* Always rendered but visually managed by CSS or conditional */}
      </div>

      <div className="feed" id="property-feed">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

      <footer className="main-footer">
        <div className="footer-content">
          <div>© 2026 VISIONARY</div>
          <div>CONCEPT: ANTI-AGENT</div>
          <div>POWERED BY NANO BANANA</div>
        </div>
      </footer>
    </div>
  );
}
