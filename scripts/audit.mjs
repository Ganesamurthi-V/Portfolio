import { readFileSync, readdirSync } from "node:fs";

const all = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) all.push([full, readFileSync(full, "utf8")]);
  }
})("src");

const src = all.map((a) => a[1]).join("\n");

const ui = readdirSync("src/components/ui").map((f) => f.replace(".tsx", ""));
console.log("UI USED   :", ui.filter((f) => src.includes(`ui/${f}`)).join(", "));
console.log("UI UNUSED :", ui.filter((f) => !src.includes(`ui/${f}`)).join(", "));
console.log("");

for (const dep of [
  "gsap",
  "@gsap/react",
  "motion/react",
  "ogl",
  "three",
  "lenis",
  "react-icons",
  "next-themes",
  "sonner",
  "radix-ui",
]) {
  const hits = all
    .filter(([, body]) => body.includes(`from "${dep}"`) || body.includes(`from '${dep}'`))
    .map(([file]) => file.replace("src/", ""));
  console.log(dep.padEnd(14) + ": " + (hits.length ? hits.join(", ") : "-"));
}
