"use client";

/* agent-notes: { ctx: "Dedicated page for funding CHERAL projects, conservation support, official contacts, and bank info", deps: [src/components/Header.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx, src/data/cheralData.ts], state: active, last: "sato@2026-10-06" } */

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";
import { cheralBankDetails } from "@/data/cheralData";

export default function FundProjectPage() {
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      {/* Header */}
      <Header onOpenDonate={() => setDonateModalOpen(true)} />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#4A0E17] via-[#2D0A0E] to-[#1A0507] text-[#F7F3EF] py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#a62a14]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E8D9CC]/10 blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#E8D9CC]/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#a62a14] bg-[#a62a14]/25 px-2.5 py-0.5 rounded-full text-white font-medium">
                Fund a Project
              </span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#a62a14]/30 text-white font-semibold text-xs tracking-wider uppercase mb-4 border border-[#a62a14]/50">
              JOIN OUR MISSION
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              CHERAL needs your support
            </h1>
            <p className="text-base sm:text-xl text-[#E8D9CC] max-w-3xl leading-relaxed font-sans">
              Your support helps CHERAL carry out its work in heritage conservation, ecological research, documentation, education, and community-based initiatives.
            </p>
          </div>
        </section>

        {/* Content & Impact Section */}
        <section className="py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            {/* Impact Narrative Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#D9D9D9]/80 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#a62a14]/10 text-[#a62a14] flex items-center justify-center font-bold text-lg">
                  🌱
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D0A0E]">
                  How Your Contributions Drive Meaningful Change
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                Contributions to CHERAL help us organise heritage and nature walks, conduct field research and documentation, support student education programmes, restore and conserve natural and cultural heritage, and create public awareness about heritage, biodiversity, climate change, and environmental protection.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-start gap-3">
                  <span className="text-[#a62a14] font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2D0A0E]">Heritage & Nature Walks</h3>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">Community exploration of wetlands, hillocks, and ancient monuments.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-start gap-3">
                  <span className="text-[#a62a14] font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2D0A0E]">Field Research & Documentation</h3>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">Scientific recording of flora, fauna, epigraphy, and historical sites.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-start gap-3">
                  <span className="text-[#a62a14] font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2D0A0E]">Student Education Programmes</h3>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">Ecological literacy and heritage workshops in schools and colleges.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-start gap-3">
                  <span className="text-[#a62a14] font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2D0A0E]">Ecological Restoration & Trees</h3>
                    <p className="text-xs text-[#6F6F6F] mt-0.5">Native tree planting and conservation of traditional local habitats.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact & Collaboration Coordinates */}
            <div className="bg-[#2D0A0E] text-[#F7F3EF] rounded-3xl p-6 sm:p-10 shadow-lg border border-[#a62a14]/30 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a62a14]">
                  Partner With Us
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Contribute to a Specific Project or Collaborate
                </h2>
                <p className="text-sm text-[#E8D9CC]/90 leading-relaxed max-w-2xl">
                  If you would like to support CHERAL, contribute to a specific project, or collaborate with us, please contact us:
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  CHERAL – Centre for Heritage & Ecological Research Through Arts and Literature
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                  {/* Email */}
                  <a
                    href={`mailto:${cheralBankDetails.email}`}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-xl">📧</span>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-[#E8D9CC]/70 font-semibold uppercase">Email</div>
                      <div className="text-white font-medium group-hover:text-[#E8D9CC] truncate">
                        {cheralBankDetails.email}
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:+91${cheralBankDetails.cell.replace(/\s+/g, "")}`}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-xl">📞</span>
                    <div>
                      <div className="text-[11px] text-[#E8D9CC]/70 font-semibold uppercase">Phone</div>
                      <div className="text-white font-medium group-hover:text-[#E8D9CC]">
                        +91 {cheralBankDetails.cell}
                      </div>
                    </div>
                  </a>

                  {/* Website */}
                  <a
                    href="https://cheraltrust.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-xl">🌐</span>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-[#E8D9CC]/70 font-semibold uppercase">Website / Blog</div>
                      <div className="text-white font-medium group-hover:text-[#E8D9CC] truncate">
                        cheraltrust.blogspot.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setDonateModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#a62a14] hover:bg-white hover:text-[#4A0E17] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <span>♥</span>
                  <span>Donate to Trust / View Bank Details</span>
                </button>
              </div>
            </div>

            {/* Official Bank Account Details Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#D9D9D9]/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D9D9]/60">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D0A0E]">
                    Official Cheral Trust Bank Transfer Credentials
                  </h3>
                  <p className="text-xs text-[#6F6F6F] mt-1">
                    South Indian Bank · Registered Public Charitable Trust Account
                  </p>
                </div>
                <button
                  onClick={() => setDonateModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#a62a14] hover:bg-[#4A0E17] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  Show QR Code
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60">
                  <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">Account Name</div>
                  <div className="text-sm font-bold text-[#2D0A0E] mt-1">{cheralBankDetails.accountName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">Account Number</div>
                    <div className="text-sm font-bold font-mono text-[#4A0E17] mt-1">{cheralBankDetails.accountNumber}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cheralBankDetails.accountNumber, "acc")}
                    className="text-xs font-bold text-[#a62a14] hover:underline cursor-pointer"
                  >
                    {copiedField === "acc" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">IFSC Code</div>
                    <div className="text-sm font-bold font-mono text-[#2D0A0E] mt-1">{cheralBankDetails.ifsc}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cheralBankDetails.ifsc, "ifsc")}
                    className="text-xs font-bold text-[#a62a14] hover:underline cursor-pointer"
                  >
                    {copiedField === "ifsc" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60">
                  <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">Bank Name</div>
                  <div className="text-sm font-bold text-[#2D0A0E] mt-1">{cheralBankDetails.bankName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">UPI ID</div>
                    <div className="text-sm font-bold font-mono text-[#4A0E17] mt-1">{cheralBankDetails.upiId}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cheralBankDetails.upiId, "upi")}
                    className="text-xs font-bold text-[#a62a14] hover:underline cursor-pointer"
                  >
                    {copiedField === "upi" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8D9CC]/60">
                  <div className="text-[11px] font-bold text-[#6F6F6F] uppercase">Address</div>
                  <div className="text-xs font-medium text-[#2D0A0E] mt-1 truncate" title={cheralBankDetails.address}>
                    Madurai, Tamil Nadu
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenDonate={() => setDonateModalOpen(true)} />

      {/* Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang="en"
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
