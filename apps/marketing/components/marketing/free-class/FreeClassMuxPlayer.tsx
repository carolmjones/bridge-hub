"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import Image from "next/image";
import { IMG } from "./constants";

const POSTER = `${IMG}/video-poster.jpg`;

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[18px] border border-line-stone bg-ink shadow-[0_24px_60px_-40px_rgba(35,40,36,0.35)]">
      <Image
        src={POSTER}
        alt=""
        fill
        className="object-cover object-center opacity-90"
        sizes="(max-width: 880px) 100vw, 880px"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/25">
        <p className="max-w-[320px] px-6 text-center font-sans text-sm leading-[1.65] text-cream/90">
          Add your Mux playback ID to{" "}
          <code className="text-glow-sage">NEXT_PUBLIC_MUX_PLAYBACK_ID</code> to
          enable playback.
        </p>
      </div>
    </div>
  );
}

export function FreeClassMuxPlayer() {
  const playbackId = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID;

  if (!playbackId) {
    return <VideoPlaceholder />;
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-line-stone shadow-[0_24px_60px_-40px_rgba(35,40,36,0.35)]">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        poster={POSTER}
        loading="viewport"
        metadata={{ video_title: "Life Beyond Survival Mode" }}
        accentColor="#354238"
        className="aspect-video w-full"
      />
    </div>
  );
}
