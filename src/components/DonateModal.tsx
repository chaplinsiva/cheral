"use client";

/* agent-notes: { ctx: "Donate modal for cultural heritage preservation grants and monument restoration", deps: [], state: active, last: "sato@2026-07-26" } */
import { useState } from "react";

interface DonateModalProps {
  isOpen: boolean;
  currentLang: "en" | "ta";
  onClose: () => void;
}

export default function DonateModal({ isOpen, currentLang, onClose }: DonateModalProps) {
  const [selectedTier, setSelectedTier] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  if (!isOpen) return null;

  const tiers = [
    {
      amountUSD: 25,
      amountINR: 1000,
      title: currentLang === "ta" ? "கல்வெட்டு பாதுகாப்பு" : "Inscription Preserver",
      description: currentLang === "ta" ? "ஒரு பண்டைக்கால கல்வெட்டை எண்ணிம முறையில் ஆவணப்படுத்த உதவுகிறது." : "Digitally document & restore 1 ancient Tamil-Brahmi stone inscription.",
    },
    {
      amountUSD: 50,
      amountINR: 2500,
      title: currentLang === "ta" ? "பாரம்பரிய வழிகாட்டி ஆதரவு" : "Heritage Guide Supporter",
      description: currentLang === "ta" ? "சான்றளிக்கப்பட்ட உள்ளூர் வரலாற்று வழிகாட்டிகளுக்கு பயிற்சியளிக்கிறது." : "Fund certified training for 2 local epigraphers & heritage storytellers.",
    },
    {
      amountUSD: 100,
      amountINR: 5000,
      title: currentLang === "ta" ? "கோட்டை மீட்டெடுப்பு நிதியம்" : "Fortress Restoration Fund",
      description: currentLang === "ta" ? "சேர மற்றும் சோழ கோட்டை சுவர்கள் சீரமைப்பு நிதியுதவி." : "Direct grant toward ancient stone fortress wall structural conservation.",
    },
    {
      amountUSD: 250,
      amountINR: 15000,
      title: currentLang === "ta" ? "அறக்கட்டளை பாதுகாவலர்" : "Imperial Trust Patron",
      description: currentLang === "ta" ? "முழு வரலாற்று தளத்திற்கான தொல்லியல்கள ஆய்வு நிதி." : "Sponsor full archaeological fieldwork expedition for unmapped sites.",
    },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorEmail && donorName) {
      setIsSuccess(true);
    }
  };

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#D9D9D9] flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="bg-[#222222] text-[#FFFFFF] p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/40 text-white flex items-center justify-center transition-colors"
            aria-label="Close donation modal"
          >
            ✕
          </button>
          <span className="inline-block px-3 py-1 rounded-full bg-[#F68B5F] text-[10px] font-bold uppercase tracking-wider text-white mb-2">
            {currentLang === "ta" ? "பாரம்பரிய பாதுகாப்பு நிதியம்" : "100% Non-Profit Heritage Trust"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white">
            {currentLang === "ta" ? "வரலாற்றை காப்போம் — நன்கொடை" : "Support Ancient Heritage Conservation"}
          </h2>
          <p className="text-xs text-[#D9D9D9] mt-2 max-w-lg leading-relaxed">
            {currentLang === "ta"
              ? "உங்கள் பங்களிப்பு சேர, சோழ, பாண்டிய வரலாற்று நினைவுச் சின்னங்கள் மற்றும் கல்வெட்டுகளை பாதுகாப்பிற்கு நேரடி நிதியுதவி அளிக்கிறது."
              : "Your donation directly funds epigraphy documentation, stone inscription preservation, and local heritage guide grants across historical sites."}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-xl font-bold font-outfit text-[#222222]">
                {currentLang === "ta" ? "உங்கள் அன்பு நன்கொடைக்கு நன்றி!" : "Thank You for Preserving Living History!"}
              </h3>
              <p className="text-xs text-[#6F6F6F] max-w-md mx-auto">
                {currentLang === "ta"
                  ? `நன்றி ${donorName}! உங்களின் நன்கொடை ரசீது (${currency === "USD" ? "$" : "₹"}${currentAmount}) ${donorEmail} முகவரிக்கு அனுப்பப்பட்டுள்ளது.`
                  : `Dear ${donorName}, your contribution of ${currency === "USD" ? "$" : "₹"}${currentAmount} has been registered. An official non-profit trust receipt was sent to ${donorEmail}.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 rounded-full bg-[#F68B5F] hover:bg-[#E26E4D] text-white text-xs font-bold transition-all shadow-md"
              >
                {currentLang === "ta" ? "முடிந்தது" : "Done"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="space-y-6">
              
              {/* Currency Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#222222] uppercase tracking-wider">
                  {currentLang === "ta" ? "நன்கொடை தொகையை தேர்வு செய்க" : "Select Contribution Level"}
                </span>
                <div className="bg-[#F7F3EF] p-1 rounded-full border border-[#D9D9D9] flex text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-0.5 rounded-full transition-all ${
                      currency === "USD" ? "bg-[#222222] text-white" : "text-[#6F6F6F]"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-3 py-0.5 rounded-full transition-all ${
                      currency === "INR" ? "bg-[#222222] text-white" : "text-[#6F6F6F]"
                    }`}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tiers.map((t, idx) => {
                  const amt = currency === "USD" ? t.amountUSD : t.amountINR;
                  const isSelected = !customAmount && selectedTier === amt;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedTier(amt);
                        setCustomAmount("");
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-[#F68B5F] bg-[#F8D7C6]/30 ring-2 ring-[#F68B5F]"
                          : "border-[#D9D9D9] bg-[#FFFFFF] hover:border-[#F68B5F]/50"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full mb-1">
                        <span className="text-lg font-bold font-outfit text-[#222222]">
                          {currency === "USD" ? `$${amt}` : `₹${amt.toLocaleString()}`}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8D9CC] text-[#222222]">
                          {t.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6F6F6F] mt-1 leading-normal">{t.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Option */}
              <div>
                <label className="block text-xs font-semibold text-[#222222] mb-1.5">
                  {currentLang === "ta" ? "வேறு தொகை" : "Or Enter Custom Amount"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xs font-bold text-[#6F6F6F]">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder={currentLang === "ta" ? "உங்கள் விருப்பமான தொகை..." : "Custom amount..."}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs font-semibold text-[#222222] focus:outline-none focus:border-[#F68B5F]"
                  />
                </div>
              </div>

              {/* Donor Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#D9D9D9] pt-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#222222] mb-1">
                    {currentLang === "ta" ? "உங்கள் பெயர்" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anbarasan"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs text-[#222222] focus:outline-none focus:border-[#F68B5F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#222222] mb-1">
                    {currentLang === "ta" ? "மின்னஞ்சல் முகவரி" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F7F3EF] border border-[#D9D9D9] text-xs text-[#222222] focus:outline-none focus:border-[#F68B5F]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#F68B5F] hover:bg-[#E26E4D] text-white text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>
                  {currentLang === "ta"
                    ? `நன்கொடை செலுத்துக (${currency === "USD" ? "$" : "₹"}${currentAmount})`
                    : `Complete ${currency === "USD" ? "$" : "₹"}${currentAmount} Heritage Grant`}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-[10px] text-center text-[#6F6F6F]">
                🔒 100% Tax-Deductible Registered Cultural Trust. Instant receipt issued upon confirmation.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
