"use client";

import { EASE } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Do you work with early-stage teams?",
    answer:
      "Yes — we regularly partner with founders and early-stage teams who need help shaping an idea, validating direction, or building an MVP — we focus on clarity, speed, and making the right trade-offs early",
  },
  {
    question: "Can you help shape an idea before build?",
    answer:
      "Absolutely — strategy is often the most valuable part of the engagement, defining the problem, user flows, scope, and technical approach before writing code or pushing pixels",
  },
  {
    question: "Do you work on design only, engineering only, or both?",
    answer:
      "All of the above — some clients need end-to-end product delivery, others come to us for design systems, frontend builds, backend engineering, or scaling existing products — we'll recommend what makes sense for your stage",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "We review your submission and reply within 24 hours — if it looks like a good fit, we'll schedule a short discovery call — from there, we'll recommend the smartest next step: a scoped proposal, a focused sprint, or an honest referral elsewhere",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope — focused MVPs often land in the 2–4 month range, larger platforms, migrations, or multi-phase builds take longer — we'll give you a realistic timeline once we understand your goals, constraints, and team setup",
  },
  {
    question: "Do you work with teams outside Nigeria?",
    answer:
      "Yes — we're based in Lagos and work with clients remotely across time zones — discovery calls, reviews, and delivery are structured to stay clear and async-friendly, with overlap for live working sessions when needed",
  },
  {
    question: "What budget should we have in mind?",
    answer:
      "Budget needs to match scope and speed — smaller engagements might start in the low five figures, full product builds, platforms, or cloud work typically run higher — share your range in the form, it helps us respond with something realistic, not generic",
  },
  {
    question: "Can you work alongside our in-house team?",
    answer:
      "Yes — we often embed with existing product, design, or engineering teams, leading a workstream, filling a gap, or helping you ship faster without rebuilding everything from scratch",
  },
  {
    question: "Do you sign NDAs before we share details?",
    answer:
      "Yes — if you need an NDA in place before sharing sensitive product or business information, mention it in your message and we'll arrange that before the discovery conversation",
  },
];

export function ProjectFaqSection() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-sea-salt pb-16 lg:pb-20" id="faq" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-10">
        <h2 id="faq-heading" className="sr-only">
          Frequently asked questions
        </h2>
        <div className="border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-ink"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink sm:text-[16px]">
                    {faq.question}
                  </span>
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[22px] font-light leading-none text-subtle"
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-12 text-[14px] leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
