import { round } from "@/lib/svg-utils";
import type { Flower } from "@/lib/types";

/* Field no. 01: four depth rows. */
export const fieldOneFlowers: Flower[] = [
  // back row
  { id: 6, name: "Lavender", botanicalName: "Lavandula", species: "lavender", color: "#A394C9", center: "#77639B", x: 7, y: 37, size: 108, rotation: 3 },
  { id: 15, name: "Sunflower", botanicalName: "Helianthus annuus", species: "sunflower", color: "#F2BE2E", center: "#5A3A1E", x: 22, y: 34, size: 118, rotation: -4 },
  { id: 3, name: "Cornflower", botanicalName: "Centaurea cyanus", species: "cornflower", color: "#7895B8", center: "#E8C56D", x: 38, y: 38, size: 102, rotation: -6 },
  { id: 16, name: "Blush Peony", botanicalName: "Paeonia lactiflora", species: "peony", color: "#F0B5C6", center: "#C9657F", x: 54, y: 35, size: 112, rotation: 5 },
  { id: 19, name: "Blue Hydrangea", botanicalName: "Hydrangea macrophylla", species: "hydrangea", color: "#8FA9D6", center: "#F1EBC4", x: 70, y: 38, size: 112, rotation: -4 },
  { id: 4, name: "Pink Cosmos", botanicalName: "Cosmos bipinnatus", species: "cosmos", color: "#E9A1AD", center: "#B66B69", x: 86, y: 35, size: 106, rotation: 6 },
  // second row
  { id: 1, name: "Blush Rose", botanicalName: "Rosa", species: "rose", color: "#D98791", center: "#A94D60", x: 13, y: 53, size: 112, rotation: 5 },
  { id: 2, name: "Wild Daisy", botanicalName: "Bellis perennis", species: "daisy", color: "#FFF9E8", center: "#D9A842", x: 28, y: 50, size: 104, rotation: 7 },
  { id: 18, name: "White Lily", botanicalName: "Lilium candidum", species: "lily", color: "#FBF4F1", center: "#E3B84F", x: 44, y: 54, size: 118, rotation: 6 },
  { id: 17, name: "Coral Dahlia", botanicalName: "Dahlia pinnata", species: "dahlia", color: "#E8806C", center: "#8E2F3B", x: 60, y: 51, size: 112, rotation: -5 },
  { id: 21, name: "Red Rose", botanicalName: "Rosa gallica", species: "rose", color: "#B83A4B", center: "#6E1B2B", x: 76, y: 55, size: 112, rotation: -5 },
  { id: 12, name: "Sweet Pea", botanicalName: "Lathyrus odoratus", species: "sweetPea", color: "#C4A0B7", center: "#926B91", x: 92, y: 52, size: 112, rotation: 5 },
  // third row
  { id: 8, name: "Peach Tulip", botanicalName: "Tulipa", species: "tulip", color: "#E9A17F", center: "#BF725C", x: 6, y: 71, size: 112, rotation: 6 },
  { id: 5, name: "Buttercup", botanicalName: "Ranunculus", species: "ranunculus", color: "#F2C75C", center: "#A77C37", x: 21, y: 69, size: 112, rotation: -6 },
  { id: 20, name: "Windflower", botanicalName: "Anemone coronaria", species: "anemone", color: "#F3E4EC", center: "#3A2F45", x: 36, y: 72, size: 108, rotation: 6 },
  { id: 10, name: "Garden Rose", botanicalName: "Rosa centifolia", species: "gardenRose", color: "#D98B9F", center: "#A95169", x: 52, y: 70, size: 126, rotation: 5 },
  { id: 11, name: "Golden Daisy", botanicalName: "Leucanthemum", species: "oxeye", color: "#F0CF67", center: "#A87935", x: 68, y: 72, size: 112, rotation: -4 },
  { id: 9, name: "Forget-me-not", botanicalName: "Myosotis", species: "forgetMeNot", color: "#87A9CE", center: "#E6C66C", x: 83, y: 69, size: 108, rotation: -5 },
  // front row
  { id: 13, name: "Blue Iris", botanicalName: "Iris germanica", species: "iris", color: "#8A91BD", center: "#E2C56D", x: 12, y: 88, size: 122, rotation: -5 },
  { id: 22, name: "White Rose", botanicalName: "Rosa alba", species: "rose", color: "#F6F0E4", center: "#CDB48F", x: 30, y: 86, size: 118, rotation: 5 },
  { id: 14, name: "Soft Poppy", botanicalName: "Papaver", species: "poppy", color: "#D98779", center: "#5D4939", x: 50, y: 89, size: 124, rotation: 7 },
  { id: 23, name: "Yellow Tulip", botanicalName: "Tulipa gesneriana", species: "tulip", color: "#F1CB5A", center: "#D18A2F", x: 69, y: 87, size: 120, rotation: -6 },
  { id: 7, name: "White Cosmos", botanicalName: "Cosmos bipinnatus", species: "cosmos", color: "#FFF9EC", center: "#D6AC52", x: 88, y: 88, size: 126, rotation: -7 },
];

/* Field no. 02: twenty more, in four rows of five. */
export const fieldTwoFlowers: Flower[] = [
  // back row
  { id: 37, name: "Lotus", botanicalName: "Nelumbo nucifera", species: "lotus", color: "#F2A0BF", center: "#F2C84B", x: 10, y: 36, size: 122, rotation: -3 },
  { id: 28, name: "Hyacinth", botanicalName: "Hyacinthus orientalis", species: "hyacinth", color: "#9B86DA", center: "#E9DFFA", x: 30, y: 36, size: 116, rotation: 3 },
  { id: 24, name: "Bellflower", botanicalName: "Campanula", species: "bellflower", color: "#8A7FD8", center: "#F3E9A8", x: 50, y: 37, size: 118, rotation: -4 },
  { id: 40, name: "Orchid", botanicalName: "Phalaenopsis", species: "orchid", color: "#F6E8F0", center: "#B5307F", x: 70, y: 36, size: 124, rotation: 4 },
  { id: 31, name: "Moonflower", botanicalName: "Ipomoea alba", species: "moonflower", color: "#FBFBF4", center: "#D9E8B0", x: 90, y: 36, size: 120, rotation: -4 },
  // second row
  { id: 43, name: "Carnation", botanicalName: "Dianthus caryophyllus", species: "carnation", color: "#E85A7E", center: "#A5264D", x: 19, y: 54, size: 118, rotation: 5 },
  { id: 36, name: "Hibiscus", botanicalName: "Hibiscus rosa-sinensis", species: "hibiscus", color: "#E8475F", center: "#7A0E2E", x: 38, y: 54, size: 126, rotation: -5 },
  { id: 25, name: "China Rose", botanicalName: "Rosa chinensis", species: "chinaRose", color: "#EE8CA6", center: "#C65577", x: 57, y: 55, size: 118, rotation: 4 },
  { id: 27, name: "Primrose", botanicalName: "Primula vulgaris", species: "primrose", color: "#F6E27A", center: "#E0902A", x: 76, y: 54, size: 112, rotation: -5 },
  { id: 38, name: "Daffodil", botanicalName: "Narcissus pseudonarcissus", species: "daffodil", color: "#F7DA4C", center: "#F0A21C", x: 93, y: 55, size: 118, rotation: 5 },
  // third row
  { id: 34, name: "Impatiens", botanicalName: "Impatiens walleriana", species: "impatiens", color: "#F0629A", center: "#FFF1F6", x: 10, y: 72, size: 116, rotation: -4 },
  { id: 30, name: "Lantana", botanicalName: "Lantana camara", species: "lantana", color: "#EE8FB0", center: "#F5B63B", x: 30, y: 72, size: 114, rotation: 4 },
  { id: 26, name: "Salvia", botanicalName: "Salvia nemorosa", species: "salvia", color: "#6F6CD0", center: "#4B2E7E", x: 50, y: 72, size: 118, rotation: -3 },
  { id: 32, name: "Morning Glory", botanicalName: "Ipomoea purpurea", species: "morningglory", color: "#5C7BE2", center: "#F6E9A0", x: 70, y: 72, size: 120, rotation: 4 },
  { id: 29, name: "Lily of the Valley", botanicalName: "Convallaria majalis", species: "valley", color: "#FFFEF8", center: "#D8E2B0", x: 90, y: 72, size: 114, rotation: -4 },
  // front row
  { id: 33, name: "Nasturtium", botanicalName: "Tropaeolum majus", species: "nasturtium", color: "#F08A24", center: "#B52A1B", x: 19, y: 89, size: 122, rotation: 5 },
  { id: 35, name: "Loosestrife", botanicalName: "Lythrum salicaria", species: "loosestrife", color: "#D8479A", center: "#F5D36A", x: 38, y: 88, size: 122, rotation: -4 },
  { id: 39, name: "Rosemary", botanicalName: "Salvia rosmarinus", species: "rosemary", color: "#8FB8E0", center: "#5F7F62", x: 57, y: 89, size: 122, rotation: 3 },
  { id: 41, name: "Snowdrop", botanicalName: "Galanthus nivalis", species: "snowdrop", color: "#FBFBF7", center: "#86B066", x: 76, y: 88, size: 118, rotation: -5 },
  { id: 42, name: "Bluebell", botanicalName: "Hyacinthoides non-scripta", species: "bluebell", color: "#6D6BD6", center: "#E8E4FA", x: 93, y: 89, size: 120, rotation: 4 },
];

export const flowers: Flower[] = [...fieldOneFlowers, ...fieldTwoFlowers];
export const flowerById = new Map(flowers.map((flower) => [flower.id, flower] as const));


/*
 * Mobile composition: three columns with a gentle wave (the middle column
 * sits a little lower). Rows are spaced far enough apart that no flower
 * overlaps the one above it. Sizes are in "stage width" units.
 */
const ROW_START = 56; // base of the first row
const ROW_GAP = 46; // distance between rows

function layoutMobile(order: number[], rows: number[], stageH: number) {
  const map = new Map<number, { x: number; y: number }>();
  let cursor = 0;
  rows.forEach((count, row) => {
    const xs = count === 3 ? [17, 50, 83] : [34, 66];
    const wave = count === 3 ? [0, 10, 0] : [5, 5];
    for (let i = 0; i < count; i++) {
      const id = order[cursor++];
      const y = ROW_START + row * ROW_GAP + wave[i];
      map.set(id, { x: xs[i], y: round((y / stageH) * 100) });
    }
  });
  return map;
}

const MOBILE_ORDER_ONE = [15, 6, 1, 16, 3, 4, 19, 2, 18, 21, 8, 17, 5, 10, 20, 12, 9, 11, 13, 22, 14, 7, 23];
const MOBILE_ORDER_TWO = [37, 28, 24, 40, 31, 43, 36, 25, 27, 38, 34, 30, 26, 32, 29, 33, 35, 39, 41, 42];

export const MOBILE_POS = new Map([
  ...layoutMobile(MOBILE_ORDER_ONE, [3, 3, 3, 3, 3, 3, 3, 2], 404).entries(),
  ...layoutMobile(MOBILE_ORDER_TWO, [3, 3, 3, 3, 3, 3, 2], 358).entries(),
]);