# Saint Rose
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Code Style

### Component Boundaries

- Push `"use client"` as far down the tree as possible. Pages, layouts, and data-fetching wrappers stay as server components.
- Fetch data in server components or server actions; pass promises or resolved data down to client children.

### Exports

- Named exports only in component files. Pages use default exports per Next.js convention.
- Alphabetize specifiers in export statements.

### Comments

Default to writing none. Well-named identifiers, types, and tests already document WHAT the code does. Add a comment only when removing it would leave a future reader genuinely confused — and the reason is something they couldn't recover by reading the surrounding code.

A comment earns its place when it captures one of:

- A hidden constraint (e.g. "cookies can't be set during stream").
- A workaround for a specific upstream/library bug.
- A non-obvious algorithmic choice or invariant.
- A cross-system quirk (e.g. "Shopify's `productFilters` only affects facet counts, not results").

**One line max.** If you can't say it in a single line, the code probably needs renaming, splitting, or extracting a constant — not more prose. Long-form context belongs in the PR description, not the source file.

Don't write:

- JSDoc that restates the function name. Either drop it or replace it with the WHY.
- Inline comments that narrate the next line.
- File-top banner comments and `// ── Section ──`-style dividers. If a file is large enough that you reach for one, split the file instead.
- Bare `// TODO` without an owner or actionable reason. Either write `// TODO(handle): explain blocker` or fix the thing now.
- Multi-paragraph docstrings on simple functions. If the JSDoc fits on one line, inline it; if you reach for multiple paragraphs, that's a signal to split or rename, not to write more prose.

Keep `// eslint-disable-*`, `// @ts-expect-error`, `// biome-ignore`, and other tooling directives — those are not prose comments.
