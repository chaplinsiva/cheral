"use client";

/* agent-notes: { ctx: "Interactive heritage itinerary modal with guide details and inquiry form", deps: [src/data/destinations.ts], state: active, last: "sato@2026-07-26" } */
import { useState } from "react";
import Image from "next/image";
import { Destination } from "@/data/destinations";

interface ItineraryModalProps {
  destination: Destination | null;
  currentLang: "en" | "ta";
  onClose: () => void;
}

export default function ItineraryModal({
  destination,
  currentLang,
  onClose,
}: ItineraryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [inquirerName, setInquirerName] = useState("");
  const [inquirerEmail, setInquirerEmail] = useState("");

  if (!destination) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquirerName && inquirerEmail) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#D9D9D9] max-h-[90vh] flex flex-col my-8">
        
        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/90 via-[#222222]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#222222] flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Header Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 bg-[#F68B5F] text-[10px] font-bold tracking-wider uppercase rounded-full mb-2">
              {destination.eraName} • {destination.age}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
              {currentLang === "ta" ? destination.tamilTitle : destination.title}
            </h2>
            <p className="text-xs text-[#E8D9CC] mt-1">
              📍 {destination.location} • Heritage Trust Score: {destination.trustScore}% Verified
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* History & Overview */}
          <div>
            <h3 className="text-lg font-bold font-outfit text-[#222222]">
              {currentLang === "ta" ? "வரலாற்று சுருக்கம்" : "Historical Overview & Heritage Record"}
            </h3>
            <p className="text-xs sm:text-sm text-[#6F6F6F] mt-2 leading-relaxed">
              {destination.fullHistory}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-sm font-bold font-outfit text-[#222222] mb-3">
              {currentLang === "ta" ? "முக்கிய அம்சங்கள்" : "Key Architectural & Cultural Highlights"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((hl, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs font-medium text-[#222222] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F68B5F]" />
                  {hl}
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h3 className="text-lg font-bold font-outfit text-[#222222] mb-4">
              {currentLang === "ta" ? "வழிகாட்டப்பட்ட பயணத் திட்டம்" : "Curated Day-by-Day Itinerary"}
            </h3>
            <div className="space-y-4">
              {destination.itinerary.map((dayItem, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#D9D9D9] flex flex-col sm:flex-row gap-4 sm:items-center">
                  <span className="px-3 py-1 bg-[#F8D7C6] text-[#222222] text-xs font-bold rounded-lg self-start sm:self-center">
                    {dayItem.day}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-[#222222]">{dayItem.title}</h5>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">{dayItem.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Local Specialist */}
          <div className="p-5 rounded-2xl bg-[#E8D9CC]/50 border border-[#D9D9D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F68B5F] text-white font-bold flex items-center justify-center text-sm shadow">
                {destination.verifiedGuide.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-[#222222]">{destination.verifiedGuide.name}</p>
                <p className="text-[11px] text-[#6F6F6F]">{destination.verifiedGuide.title}</p>
                <p className="text-[11px] text-[#F68B5F] font-semibold mt-0.5">
                  ★ {destination.verifiedGuide.rating} / 5.0 Trust Specialist
                </p>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D9D9D9] text-[11px] font-bold text-[#222222]">
              {currentLang === "ta" ? "சான்றளிக்கப்பட்ட வழிகாட்டி" : "Certified Epigrapher"}
            </span>
          </div>

          {/* Inquiry / Trust Reservation Form */}
          <div className="border-t border-[#D9D9D9] pt-6">
            <h3 className="text-lg font-bold font-outfit text-[#222222]">
              {currentLang === "ta" ? "அறக்கட்டளை பயண பதிவு" : "Request Certified Heritage Tour"}
            </h3>
            {submitted ? (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                ✓ {currentLang === "ta" ? "உங்கள் கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!" : "Your heritage tour inquiry has been submitted! A trust guide will contact you shortly."}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={currentLang === "ta" ? "உங்கள் பெயர்" : "Your Name"}
                  required
                  value={inquirerName}
                  onChange={(e) => setInquirerName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs text-[#222222] focus:outline-none focus:border-[#F68B5F]"
                />
                <input
                  type="email"
                  placeholder={currentLang === "ta" ? "மின்னஞ்சல் முகவரி" : "Email Address"}
                  required
                  value={inquirerEmail}
                  onChange={(e) => setInquirerEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs text-[#222222] focus:outline-none focus:border-[#F68B5F]"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 py-3 rounded-full bg-[#F68B5F] hover:bg-[#E26E4D] text-white text-xs font-bold shadow-md transition-all"
                >
                  {currentLang === "ta" ? "அறக்கட்டளை சான்று பதிவு" : "Confirm Heritage Tour Reservation"}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F7F3EF] border-t border-[#D9D9D9] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#FFFFFF] border border-[#D9D9D9] text-xs font-semibold text-[#222222] hover:bg-[#E8D9CC]"
          >
            {currentLang === "ta" ? "மூடுக" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
}
