import Image from "next/image";
import { IMG } from "./constants";

export function TakeawaysFlourish() {
  return (
    <Image
      src={`${IMG}/flourish.png`}
      alt=""
      width={160}
      height={31}
      className="mx-auto mb-5 h-auto w-[min(160px,42vw)] object-contain opacity-90"
      aria-hidden
    />
  );
}
