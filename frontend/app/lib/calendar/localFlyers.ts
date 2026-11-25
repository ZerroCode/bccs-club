import type { StaticImageData } from "next/image";

interface FlyerDirectory {
  keys(): string[];
  (path: string): { default: StaticImageData };
}

declare const require: {
  context(directory: string, recursive: boolean, pattern: RegExp): FlyerDirectory;
};

// Webpack discovers flyers during the build, including on the edge runtime.
const files = require.context("../../images/event-flyers", false, /\.(png|jpe?g|webp)$/i);

export const localFlyers = new Map(files.keys().map(path => {
  const eventId = path.slice(2, path.lastIndexOf("."));
  return [eventId, files(path).default];
}));
