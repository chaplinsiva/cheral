"use client";

/* agent-notes: { ctx: "Donate modal featuring authentic South Indian Bank credentials and cheral_pdf_image_1.jpg QR code from brochure", deps: [src/data/cheralData.ts, public/images/pdf], state: active, last: "sato@2026-08-13" } */

import { useState } from "react";
import Image from "next/image";
import { cheralBankDetails } from "@/data/cheralData";

interface DonateModalProps {
  isOpen: boolean;
  currentLang: "en" | "ta";
  onClose: () => void;
}

export default function DonateModal({ isOpen, currentLang, onClose }: DonateModalProps) {
  const [activeTab, setActiveTab] = useState<"bank" | "upi">("bank");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#D9D9D9] flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="bg-[#4A0E17] text-[#FFFFFF] p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            aria-label="Close donation modal"
          >
            ✕
          </button>
          <span className="inline-block px-3 py-1 rounded-full bg-[#a62a14] text-[10px] font-bold uppercase tracking-wider text-white mb-2">
            {currentLang === "ta" ? "மதசார்பற்ற தொண்டு நிறுவனம்" : "Registered Non-Profit Trust"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {currentLang === "ta" ? "சேரல் அறக்கட்டளை - நன்கொடை" : "Support Cheral Trust"}
          </h2>
          <p className="text-xs text-[#E8D9CC] mt-2 max-w-lg leading-relaxed font-sans">
            {currentLang === "ta"
              ? "இயற்கை வளம், பல்லுயிர்ப் பெருக்கம் மற்றும் பண்பாட்டு பாரம்பரியத்தைப் பாதுகாக்கும் எங்களது பணிகளுக்கு நேரடியாக நன்கொடை அளியுங்கள்."
              : "Your contributions directly support natural ecosystem conservation, biodiversity research, student workshops, and heritage walks."}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex bg-[#F7F3EF] p-1.5 rounded-2xl border border-[#D9D9D9]">
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "bank"
                  ? "bg-[#4A0E17] text-white shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              {currentLang === "ta" ? "வங்கி கணக்கு விபரம்" : "Bank Transfer Details"}
            </button>
            <button
              onClick={() => setActiveTab("upi")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "upi"
                  ? "bg-[#4A0E17] text-white shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              {currentLang === "ta" ? "UPI & QR வழி செலுத்துதல்" : "UPI & Quick Pay QR"}
            </button>
          </div>

          {activeTab === "bank" ? (
            <div className="space-y-4 bg-[#F7F3EF]/50 p-6 rounded-2xl border border-[#D9D9D9]/60">
              <h3 className="text-sm font-serif font-bold text-[#4A0E17] uppercase tracking-wider">
                {currentLang === "ta" ? "தென் இந்தியன் வங்கி விபரம்" : "South Indian Bank Credentials"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80">
                  <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">Organization Name</span>
                  <span className="font-bold text-[#222222]">{cheralBankDetails.organizationName}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80 flex justify-between items-center">
                  <div>
                    <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">Account Number</span>
                    <span className="font-bold text-[#4A0E17] font-mono">{cheralBankDetails.accountNumber}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cheralBankDetails.accountNumber, "acc")}
                    className="text-[10px] bg-[#E8D9CC] px-2.5 py-1 rounded-md text-[#4A0E17] font-semibold hover:bg-[#a62a14] hover:text-white transition-colors"
                  >
                    {copiedField === "acc" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80 flex justify-between items-center">
                  <div>
                    <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">IFSC Code</span>
                    <span className="font-bold text-[#222222] font-mono">{cheralBankDetails.ifsc}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cheralBankDetails.ifsc, "ifsc")}
                    className="text-[10px] bg-[#E8D9CC] px-2.5 py-1 rounded-md text-[#4A0E17] font-semibold hover:bg-[#a62a14] hover:text-white transition-colors"
                  >
                    {copiedField === "ifsc" ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80">
                  <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">Bank Name</span>
                  <span className="font-bold text-[#222222]">{cheralBankDetails.bankName}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80">
                  <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">Customer ID</span>
                  <span className="font-bold text-[#222222] font-mono">{cheralBankDetails.customerId}</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9]/80">
                  <span className="text-[#6F6F6F] text-[10px] block uppercase font-mono">MICR Code</span>
                  <span className="font-bold text-[#222222] font-mono">{cheralBankDetails.micr}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4 bg-[#F7F3EF]/50 p-6 rounded-2xl border border-[#D9D9D9]/60">
              {/* Authentic QR Image Display (cheral_pdf_image_1.jpg) */}
              <div className="max-w-xs mx-auto bg-white p-4 rounded-2xl border border-[#D9D9D9] shadow-sm flex flex-col items-center">
                <div className="w-48 h-48 relative overflow-hidden rounded-xl border border-[#D9D9D9] mb-4 bg-white">
                  <Image
                    src={cheralBankDetails.qrImage}
                    alt="Cheral Trust Donation QR Code"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="bg-[#4A0E17] text-white py-2 px-4 rounded-xl text-xs font-bold font-mono mb-3 w-full text-center">
                  UPI ID: {cheralBankDetails.upiId}
                </div>
                <button
                  onClick={() => copyToClipboard(cheralBankDetails.upiId, "upi")}
                  className="w-full py-2 bg-[#a62a14] hover:bg-[#4A0E17] text-white text-xs font-bold rounded-xl transition-colors mb-2"
                >
                  {copiedField === "upi" ? "UPI ID Copied!" : "Copy UPI ID"}
                </button>
                <p className="text-[10px] text-[#6F6F6F]">
                  Scan with GPay, PhonePe, Paytm, BHIM & all UPI Banking Apps
                </p>
              </div>
            </div>
          )}

          {/* Contact Details Footer */}
          <div className="pt-4 border-t border-[#D9D9D9] text-xs text-[#6F6F6F] flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <span className="font-bold text-[#222222]">Contact: </span>
              <span>{cheralBankDetails.cell} | {cheralBankDetails.email}</span>
            </div>
            <div className="text-[11px] text-[#4A0E17] font-semibold">
              Madurai, Tamil Nadu - 625207
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#4A0E17] hover:bg-[#2D0A0E] text-white text-xs font-bold transition-all shadow-md"
          >
            {currentLang === "ta" ? "மூடுக" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
}
