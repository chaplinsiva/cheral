"use client";

/* agent-notes: { ctx: "English-only Footer with id='contact', English logo, Madurai contact info", deps: [public/logos, src/data/cheralData.ts], state: active, last: "sato@2026-10-06" } */

import Image from "next/image";
import Link from "next/link";
import { cheralBankDetails } from "@/data/cheralData";

interface FooterProps {
  currentLang?: "en" | "ta";
  onOpenDonate: () => void;
}

export default function Footer({ onOpenDonate }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#2D0A0E] text-[#F7F3EF] py-16 border-t border-[#a62a14]/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info with Clean Original Logo Colors */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2 group bg-[#F7F3EF] p-2.5 rounded-2xl border border-white/20">
              {/* Emblem Logo in Clean Original Color */}
              <div className="relative h-10 w-auto md:h-12 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logos/Final Cheral logo copy.png"
                  alt="Cheral Logo Emblem"
                  width={511}
                  height={589}
                  className="object-contain max-h-10 md:max-h-12 w-auto"
                  unoptimized
                />
              </div>

              {/* Main Brand English Logo */}
              <Image
                src="/logos/Cheral eng logo copy.png"
                alt="Cheral English Logo"
                width={857}
                height={397}
                className="object-contain max-h-11 md:max-h-14 w-auto"
                unoptimized
              />
            </Link>

            <p className="text-xs text-[#E8D9CC]/90 max-w-sm leading-relaxed font-sans">
              CHERAL (Centre for Heritage and Ecological Research through Arts and Literature) is a non-profit organization committed to conserving natural ecosystems, biodiversity, and cultural heritage.
            </p>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#a62a14] hover:bg-white hover:text-[#4A0E17] text-white text-xs font-bold shadow-md transition-all"
            >
              <span>♥</span>
              <span>Donate to Cheral Trust</span>
            </button>
          </div>

          {/* Core Initiatives Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a62a14]">
              Cheral
            </h4>
            <ul className="space-y-2 text-xs text-[#E8D9CC]/80">
              <li><Link href="/#what-we-do" className="hover:text-white transition-colors">Public Awareness Campaigns</Link></li>
              <li><Link href="/#what-we-do" className="hover:text-white transition-colors">Student Education Programs</Link></li>
              <li><Link href="/#what-we-do" className="hover:text-white transition-colors">Nature & Heritage Walks</Link></li>
              <li><Link href="/#what-we-do" className="hover:text-white transition-colors">Native Tree Plantation</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link href="/fund-a-project" className="hover:text-white transition-colors">Fund a Project</Link></li>
              <li><a href="https://forms.gle/ktUF1JXeGNbfM2AAA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Become a Volunteer ↗</a></li>
              <li><Link href="/#objectives" className="hover:text-white transition-colors">Objectives & 10 Core Values</Link></li>
            </ul>
          </div>

          {/* Official Contact Info & Address */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a62a14]">
              Official Contact Info
            </h4>
            <div className="text-xs text-[#E8D9CC]/90 leading-relaxed space-y-2 font-sans">
              <p className="font-bold text-white">{cheralBankDetails.organizationName}</p>
              <p>{cheralBankDetails.address}</p>
              <p><span className="text-[#a62a14]">Cell: </span>{cheralBankDetails.cell}</p>
              <p><span className="text-[#a62a14]">Mail: </span>{cheralBankDetails.email}</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#E8D9CC]">
              <span>🛡️ Registered Non-Profit Cultural & Ecological Trust</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D9CC]/60 gap-4">
          <p>© {new Date().getFullYear()} Cheral Trust (Centre for Heritage and Ecological Research). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link href="/fund-a-project" className="hover:text-white transition-colors">Fund a Project</Link>
            <Link href="/#objectives" className="hover:text-white transition-colors">Objectives & Values</Link>
            <button onClick={onOpenDonate} className="text-[#a62a14] hover:underline font-semibold cursor-pointer">
              Donate (Bank / UPI)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
