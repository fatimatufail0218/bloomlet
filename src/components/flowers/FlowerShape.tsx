"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { mix } from "@/lib/svg-utils";
import type { Flower } from "@/lib/types";
import { Bellflower, Bluebell, LilyOfTheValley, Snowdrop } from "./bells";
import { ForgetMeNot, Hydrangea, Impatiens, Lantana, Orchid, SweetPea } from "./clusters";
import { Daffodil, Funnel, Hibiscus, Iris, Lily, Lotus, Nasturtium, Poppy, Primrose, Tulip } from "./cups";
import { Anemone, Carnation, Cornflower, Cosmos, Dahlia, Daisy, Sunflower } from "./daisies";
import { ChinaRose, Peony, Ranunculus, Rose } from "./roses";
import { Hyacinth, Lavender, Loosestrife, Rosemary, Salvia } from "./spikes";

/* Picks the right species illustration. Returns raw SVG content. */
export function FlowerShape({ flower }: { flower: Flower }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { species, color, center } = flower;
  const p = { uid, color, center };

  let art: ReactNode = null;

  switch (species) {
    case "rose": art = <Rose {...p} />; break;
    case "gardenRose": art = <Rose {...p} full />; break;
    case "peony": art = <Peony {...p} />; break;
    case "daisy":
      art = <Daisy {...p} tip={mix(color, "#e7a2ac", 0.55)} count={18} length={27} width={3.7} disc={8} />;
      break;
    case "oxeye":
      art = <Daisy {...p} tip={mix(color, "#f08f3a", 0.3)} count={14} length={29} width={5.4} disc={10.5} />;
      break;
    case "sunflower": art = <Sunflower {...p} />; break;
    case "dahlia": art = <Dahlia {...p} />; break;
    case "cornflower": art = <Cornflower {...p} />; break;
    case "cosmos": art = <Cosmos {...p} />; break;
    case "ranunculus": art = <Ranunculus {...p} />; break;
    case "lavender": art = <Lavender color={color} />; break;
    case "tulip": art = <Tulip {...p} />; break;
    case "lily": art = <Lily {...p} />; break;
    case "hydrangea": art = <Hydrangea {...p} />; break;
    case "anemone": art = <Anemone {...p} />; break;
    case "forgetMeNot": art = <ForgetMeNot color={color} center={center} />; break;
    case "sweetPea": art = <SweetPea {...p} />; break;
    case "iris": art = <Iris {...p} />; break;
    case "poppy": art = <Poppy {...p} />; break;
    case "bellflower": art = <Bellflower {...p} />; break;
    case "chinaRose": art = <ChinaRose {...p} />; break;
    case "salvia": art = <Salvia color={color} center={center} />; break;
    case "primrose": art = <Primrose {...p} />; break;
    case "hyacinth": art = <Hyacinth color={color} center={center} />; break;
    case "valley": art = <LilyOfTheValley {...p} />; break;
    case "lantana": art = <Lantana {...p} />; break;
    case "moonflower":
      art = <Funnel {...p} band="#bcd6a8" star="#e6f0d6" r={31} pointed />;
      break;
    case "morningglory":
      art = <Funnel {...p} band="#3a4fb8" star="#ffffff" r={27} pointed={false} />;
      break;
    case "nasturtium": art = <Nasturtium {...p} />; break;
    case "impatiens": art = <Impatiens {...p} />; break;
    case "loosestrife": art = <Loosestrife color={color} center={center} />; break;
    case "hibiscus": art = <Hibiscus {...p} />; break;
    case "lotus": art = <Lotus {...p} />; break;
    case "daffodil": art = <Daffodil {...p} />; break;
    case "rosemary": art = <Rosemary color={color} center={center} />; break;
    case "orchid": art = <Orchid {...p} />; break;
    case "snowdrop": art = <Snowdrop color={color} center={center} />; break;
    case "bluebell": art = <Bluebell {...p} />; break;
    case "carnation": art = <Carnation {...p} />; break;
  }

  return <>{art}</>;
}