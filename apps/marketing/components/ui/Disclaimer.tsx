import { DISCLAIMER } from "@/lib/copy/disclaimer";

export function Disclaimer({ className = "" }: { className?: string }) {
  return <p className={`disclaimer ${className}`}>{DISCLAIMER}</p>;
}
