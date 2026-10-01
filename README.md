# Truth Table Generator ⚡

A simple, interactive truth table generator that runs entirely in your browser. Type a logical proposition and get its full truth table instantly — no build tools, no dependencies, just open the file.

## Features

- 🧮 Generates a complete truth table for any proposition using variables `p`–`v`
- 📊 Shows step-by-step sub-expressions, so you can see how the result is built up
- 🖱️ Clickable symbol buttons to insert operators quickly (`¬`, `⇒`, `∨`, `∧`, parentheses)
- 🎨 Sleek navy/blue dark theme
- ⚡ Works offline, 100% vanilla HTML/CSS/JS

## Supported Logic

| Symbol | Meaning      | Example        |
| ------ | ------------ | -------------- |
| `¬`    | NOT          | `¬p`           |
| `∧`    | AND          | `p ∧ q`        |
| `∨`    | OR           | `p ∨ q`        |
| `⇒`    | IMPLICATION  | `p ⇒ q`        |
| `(` `)`| Grouping     | `¬(p ∧ q)`     |

**Variables:** `p, q, r, s, t, u, v` (uppercase or lowercase)

**Example:** `(p ⇒ q) ∨ (¬p ⇒ r)`

## Getting Started

1. Download or clone this repository
2. Open [donna.html](donna.html) in any modern web browser
3. Enter a proposition and click **Generate** — or just start typing an example

That's it. No installation required.

## Project Structure

| File         | Purpose                                    |
| ------------ | ------------------------------------------ |
| [donna.html](donna.html) | Page layout: input, symbol buttons, table |
| [donna.css](donna.css)   | Styling — navy/slate dark theme           |
| [donna.js](donna.js)     | Logic: parsing, evaluation, table building |

## How It Works

1. The proposition is scanned for valid variables (`p`–`v`)
2. All sub-expressions are extracted step by step (innermost parentheses first, then binary operations)
3. Every combination of truth values (2ⁿ rows for n variables) is generated
4. Each sub-expression is evaluated for every combination using JavaScript's logical operators
5. Results are rendered as a table: variables on the left, sub-expressions working up to the full proposition on the right

## Author

**MOHAMED EL ISSAOUI**
