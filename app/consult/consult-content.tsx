"use client";

import { useEffect } from "react";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// GHL "AJ | Discovery Call Booking" form. Submitting it redirects to the calendar
// (configured in GHL), so the call is booked with the answers already on the contact.
const FORM_ID = "rkTBTF1jrx6qCMuKuv9D";
const FORM_EMBED_SCRIPT = "https://connect.ajautomate.co/js/form_embed.js";

const infoCards = [
  {
    emoji: "\uD83D\uDCCA",
    title: "Revenue Audit",
    description:
      "We\u2019ll look at your current systems, traffic, and conversion flow to find exactly where money is slipping through.",
  },
  {
    emoji: "\uD83D\uDDFA\uFE0F",
    title: "Action Plan",
    description:
      "You\u2019ll walk away with a clear, prioritized roadmap \u2014 whether you work with us or not.",
  },
  {
    emoji: "\uD83D\uDD10",
    title: "No Pressure",
    description:
      "No hard sell. No pitch deck. Just an honest conversation about what\u2019s working and what\u2019s not.",
  },
];

const steps = [
  { num: "01", title: "Tell Me About Your Business", desc: "A few quick questions below, so the call starts on your setup instead of small talk." },
  { num: "02", title: "Pick a Time", desc: "The calendar opens as soon as you submit. Choose a slot that works for you." },
  { num: "03", title: "Get Your Roadmap", desc: "15-minute call, and you walk away with a clear action plan \u2014 no strings attached." },
];

export function ConsultContent() {
  useEffect(() => {
    // form_embed.js sizes the iframe to the form and handles the post-submit redirect.
    if (!document.querySelector(`script[src="${FORM_EMBED_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = FORM_EMBED_SCRIPT;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="pointer-events-none absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-persian/20 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-yellow/8 blur-[100px]" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white/70 mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Free &middot; No commitment &middot; No pitch
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-4">
                Ready to Stop
                <br />
                Leaving Money
                <br />
                <span className="text-white/30">on the Table?</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base text-white/45 max-w-lg mx-auto mb-10">
                Book a free 15-minute strategy call. I&apos;ll audit your current setup and show you exactly where revenue is leaking.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a
                  href="#book"
                  className="inline-flex items-center rounded-xl bg-persian px-8 py-3.5 font-bold text-white transition-all border border-persian/60 hover:shadow-[0_0_30px_rgba(94,23,235,0.35)] hover:bg-persian-dark"
                >
                  Book a Free Call &rarr;
                </a>
                <a
                  href="https://wa.me/639100809837?text=Hi%20AJ%2C%20I%27m%20interested%20in%20your%20automation%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold transition-all bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] text-white/80 hover:bg-white/[0.07]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send a Message
                </a>
              </div>
              <p className="text-white/25 text-xs uppercase tracking-widest">
                15-minute call. No credit card. No obligations.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Info cards */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {infoCards.map((card, i) => (
                <ScrollReveal key={card.title} delay={0.1 + i * 0.1}>
                  <div className="p-6 rounded-xl text-left transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
                    <p className="text-3xl mb-3">{card.emoji}</p>
                    <p className="text-white font-bold mb-2">{card.title}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-center text-2xl font-black uppercase text-white mb-12">
                How It <span className="text-yellow">Works</span>
              </h2>
            </ScrollReveal>

            <div className="rounded-2xl p-6 md:p-8 bg-white/[0.03] backdrop-blur-md border border-white/[0.06]">
              <div className="grid sm:grid-cols-3 gap-6">
                {steps.map((step, i) => (
                  <ScrollReveal key={step.num} delay={0.1 + i * 0.1}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-white/[0.04] border border-white/[0.08] text-sm font-extrabold text-yellow">
                        {step.num}
                      </div>
                      <h3 className="text-white font-bold mb-1">{step.title}</h3>
                      <p className="text-white/40 text-sm">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Discovery form: step 01. GHL redirects to the calendar on submit. */}
        <section id="book" className="scroll-mt-24 pb-24 pt-4">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-center text-2xl font-black uppercase text-white mb-3">
                Start Here: <span className="text-yellow">Book Your Call</span>
              </h2>
              <p className="text-center text-sm text-white/45 mb-8">
                Answer a few questions, then pick your time on the next screen.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
                {/* Inline layout of the same GHL form; min-height holds the space until
                    form_embed.js measures the form, so the page doesn't jump. */}
                <iframe
                  src={`https://connect.ajautomate.co/widget/form/${FORM_ID}`}
                  id={`inline-${FORM_ID}`}
                  title="AJ | Discovery Call Booking"
                  className="block w-full border-0 min-h-[1246px]"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="AJ | Discovery Call Booking"
                  data-height="1246"
                  data-layout-iframe-id={`inline-${FORM_ID}`}
                  data-form-id={FORM_ID}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-center text-xs text-white/20 mt-6 uppercase tracking-widest">
                100% Free &middot; No credit card required &middot; No obligations
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
