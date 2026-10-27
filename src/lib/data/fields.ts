import type { Field } from "@/lib/types";
import { fieldOneFlowers, fieldTwoFlowers } from "./flowers";

export const FIELDS: Field[] = [
  {
    id: "meadow",
    no: "01",
    title: "Pick your flowers.",
    // field 01
lines: ["Tap a flower to add it to your bouquet.", "Tap again to add more of the same."],
next: { href: "#meadow-2", label: "On to field no. 02" },

    fig: "Fig. 01",
    name: "The wild meadow",
    flowers: fieldOneFlowers,
    mobileH: 404,
   
  },
  {
    id: "meadow-2",
    no: "02",
    title: "A few more to choose from.",
    // field 02
lines: ["Twenty more varieties to wander through.", "Tap any flower to add it."],
next: { href: "#your-picks", label: "See your bouquet so far" },
    fig: "Fig. 02",
    name: "The cottage border",
    flowers: fieldTwoFlowers,
    mobileH: 358,
    
  },
];