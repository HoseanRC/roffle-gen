`Hello folks`

---

# Roffle Intro Generator

A website to generate roffle intros

- Website UI: [src/App.tsx](src/App.tsx)
- Core logic: [src/lib/generator.ts](src/lib/generator.ts)

## What this project does

it's basic: pressing generate will generate an intro and display it with a ransom font.

## How generation works (high level)

Generation is handled by the [`generateDescription`](src/lib/generator.ts) function in [src/lib/generator.ts](src/lib/generator.ts). Key parts:

- RNG: a small seeded pseudo-random PRNG implemented as the [`RNG` class](src/lib/generator.ts). It supports deterministic output when a seed is provided.
  - Reference: [`RNG`](src/lib/generator.ts)
- Template expansion: many sentence fragments contain token placeholders like `{joker}`, `{spectral}`, `{build}`, etc. These are expanded by `fillTemplate` in [src/lib/generator.ts](src/lib/generator.ts).
  - Reference: [`fillTemplate`](src/lib/generator.ts)
- Article handling: helper `a_an` chooses "a" vs "an" for natural phrasing.
  - Reference: [`a_an`](src/lib/generator.ts)

The generator composes:

1. A starter phrase.
2. two middle sentences assembled from templates and token lists (`jokers`, `spectrals`, `buildTypes`, etc.).
3. An optional modifier and an ending.

See the full generator implementation here: [src/lib/generator.ts](src/lib/generator.ts) and the exported API: [`generateDescription`](src/lib/generator.ts).

## Running locally

clone this repository:

```bash
git clone https://github.com/HoseanRC/roffle-gen
cd roffle-gen
```

install libraries:

```bash
pnpm install
```

run dev server:

```bash
pnpm dev
```

build the page:

```bash
pnpm dev
```

## Contributing / Collaboration

Contributions and collaborations are welcome.

adding and improving the templates makes this project stronger.

Open a PR or create an issue.

Happy to accept any reasonable improvements.

---

`Enjoy the video.`
