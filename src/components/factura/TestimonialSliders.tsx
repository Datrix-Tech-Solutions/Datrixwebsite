"use client";

import React from "react";
import SlickSlider, { SlickResponsive } from "./SlickSlider";
import { TESTIMONIALS, Testimonial } from "./data";

export const TESTIMONIAL_SLICK_RESPONSIVE: SlickResponsive[] = [
  {
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: 40,
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: 40,
      slidesToShow: 1,
    },
  },
];

const TESTIMONIAL_SETTINGS = {
  centerMode: true,
  centerPadding: 60,
  slidesToShow: 1,
  dots: true,
  infinite: true,
};

function SlideInner({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <div className="single-client-testimonial">
      <p className={dark ? "text-center mb-5" : undefined}>{t.quote}</p>
      <div className="media">
        <div className="media-img">
          <img src="/assets/img/testimonial-avatar.png" alt={t.name} />
        </div>
        <div className={`media-body${dark ? " text-left" : ""}`}>
          <h3 className={dark ? "colorWhite mt-2" : undefined}>{t.name}</h3>
          <p>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/** Home page client-quotes slider (white cards) */
export function HomeTestimonialSlider() {
  return (
    <SlickSlider
      className="clients-slider testimonial-slider"
      settings={TESTIMONIAL_SETTINGS}
      responsive={TESTIMONIAL_SLICK_RESPONSIVE}
    >
      {TESTIMONIALS.map((t) => (
        <div key={t.name}>
          <SlideInner t={t} />
        </div>
      ))}
    </SlickSlider>
  );
}

/** Product page dark testimonial slider + case-study button */
export function ProductTestimonialSlider() {
  return (
    <>
      <SlickSlider
        className="clients-slider testimonial-slider"
        settings={TESTIMONIAL_SETTINGS}
        responsive={TESTIMONIAL_SLICK_RESPONSIVE}
      >
        {TESTIMONIALS.map((t) => (
          <div key={t.name}>
            <SlideInner t={t} dark />
          </div>
        ))}
      </SlickSlider>
      <div className="case-study">
        <a href="#" className="request-btn color big" onClick={(e) => e.preventDefault()}>
          View Case Study
          <span className="fa-angle-right"></span>
        </a>
      </div>
    </>
  );
}

/** Clients logo strip */
export function ClientsSlider({ logos }: { logos: string[] }) {
  return (
    <SlickSlider
      className="clients-list"
      settings={{
        centerMode: true,
        slidesToShow: 7,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
      }}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 6 } },
        { breakpoint: 768, settings: { slidesToShow: 4 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } },
      ]}
    >
      {logos.map((src, i) => (
        <div key={i}>
          <a href="">
            <img src={src} alt="client" />
          </a>
        </div>
      ))}
    </SlickSlider>
  );
}
