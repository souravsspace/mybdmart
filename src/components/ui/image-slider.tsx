"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  urls: string[];
  discount?: number;
  isNew?: boolean;
};

export default function ImageSlider({
  urls,
  discount = 0,
  isNew = false,
}: Props) {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-muted-foreground";

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
      <div className="absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />{" "}
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full bg-primary text-primary transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide
            key={i}
            className="relative -z-10 h-full w-full overflow-hidden"
          >
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              src={url}
              alt="Product image"
            />
            <span
              className={cn(
                "absolute left-0 top-0 rounded-sm rounded-e-3xl bg-primary px-2 py-0.5 text-center text-sm font-medium uppercase text-white",
                !isNew && discount == 0 && "hidden",
              )}
            >
              {isNew ? "New" : discount != 0 && <>{discount}% OFF</>}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
