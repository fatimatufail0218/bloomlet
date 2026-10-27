export type Species =
  | "rose" | "gardenRose" | "daisy" | "oxeye" | "cornflower" | "cosmos"
  | "ranunculus" | "lavender" | "tulip" | "forgetMeNot" | "sweetPea" | "iris"
  | "poppy" | "sunflower" | "peony" | "dahlia" | "lily" | "hydrangea"
  | "anemone" | "bellflower" | "chinaRose" | "salvia" | "primrose" | "hyacinth"
  | "valley" | "lantana" | "moonflower" | "morningglory" | "nasturtium"
  | "impatiens" | "loosestrife" | "hibiscus" | "lotus" | "daffodil" | "rosemary"
  | "orchid" | "snowdrop" | "bluebell" | "carnation";

export type Flower = {
  id: number;
  name: string;
  botanicalName: string;
  species: Species;
  color: string;
  center: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
};

export type Field = {
  id: string;
  no: string;
  title: string;
  lines: [string, string];
  fig: string;
  name: string;
  flowers: Flower[];
  mobileH: number;
  next: { href: string; label: string };
};

export type WrapStyle = "cone" | "pouch" | "scallop" | "fold" | "bow";
export type FillerId = "eucalyptus" | "babysBreath" | "fern" | "wheat" | "olive" | "butterflies";
export type View = "garden" | "bouquet" | "note";

export type ColorOption = { id: string; label: string; color: string };
export type ButterflyColors = { c1: string; c2: string };

/* Everything that changes how the bouquet looks. Colours are plain hex strings. */
export type Design = {
  style: WrapStyle;
  paper: string;
  ribbon: string;
  fillers: FillerId[];
  butterflyColors: ButterflyColors;
};

export type Note = { to: string; from: string; message: string; color: string };

/* One entry per stem: the same flower can appear many times. */
export type StemEntry = { key: number; flowerId: number };
export type BouquetItem = { key: number; flower: Flower };

export type GiftData = { stems: number[]; design: Design; note: Note };