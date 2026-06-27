"use client";

import {
  CLARITY_PROJECT_ID,
  GA_MEASUREMENT_ID,
  HOME_SECTIONS,
  INQUIRY_SECTIONS,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

function GaPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

function SectionViewTracker() {
  const pathname = usePathname();
  const seenRef = useRef(new Set<string>());

  useEffect(() => {
    seenRef.current.clear();

    const sectionIds =
      pathname === "/start-a-project"
        ? [...INQUIRY_SECTIONS]
        : pathname === "/"
          ? [...HOME_SECTIONS]
          : [];

    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!entry.isIntersecting || !id || seenRef.current.has(id)) return;

          seenRef.current.add(id);
          trackEvent("section_view", {
            section: id,
            page: pathname,
          });
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px" },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function CtaClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const isStartProject =
        href === "/start-a-project" || href.startsWith("/start-a-project");
      const isMailto = href.startsWith("mailto:");

      if (!isStartProject && !isMailto) return;

      trackEvent("cta_click", {
        label: link.textContent?.trim().slice(0, 80) || "link",
        destination: href,
        location: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function AnalyticsBehavior() {
  return (
    <>
      <GaPageView />
      <SectionViewTracker />
      <CtaClickTracker />
    </>
  );
}

export function Analytics() {
  const [gaReady, setGaReady] = useState(false);

  if (!GA_MEASUREMENT_ID && !CLARITY_PROJECT_ID) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            onReady={() => setGaReady(true)}
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `}
          </Script>
          {gaReady && <AnalyticsBehavior />}
        </>
      )}

      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}
