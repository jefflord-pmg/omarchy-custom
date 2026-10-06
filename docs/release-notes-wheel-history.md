# Release notes: your wheel remembers

The wheel has a new superpower: **it remembers what you actually use**.

Every time you activate a result, Wheely records it. Search for it again with
`!!`, and the things you used most recently are right there at the top. No more remembering
the exact menu path, repeating a long search, or keeping a scratchpad of useful
calculations.

## Find it again with `!!`

Type `!!` in the wheel's search field, followed by any part of what you
remember:

| Try | Finds |
|---|---|
| `!!min` | A previously used item with “min” in its name or details |
| `!!browser` | Browser apps or actions you have activated before |
| `!!12` | Calculator expressions containing `12`, plus expressions whose answer is `12` |

For example, `!!12` can find both `=112*3` (the expression contains `12`) and
`=156/13` (the answer is `12`). Choose a calculator history result to put its
expression back in the search field, ready to adjust or calculate again.

## Built around what you do

- **Only real activations count.** Moving the highlight over an item does not
  add it to history. Press Enter or click to activate it.
- **History picks count too.** Activating an item from `!!` updates the same
  usage count and last-used time as activating it from regular search or the
  wheel.
- **The latest is always on top.** Matching history is ordered by last-used
  time by default, so the result you just activated comes first. Press `F4` in
  history to toggle between **Recent** and **Popular** ordering. In normal
  search, F4 toggles history promotion on and off while respecting the selected
  history order. A notification names the previous and new mode.
- **History makes ordinary search smarter.** Search as usual—no `!!` prefix
  needed—and previously activated matches move above other matching results.
  When several history items match, they follow the active **Recent** or
  **Popular** order; every non-history result keeps its normal search ranking
  behind them. Press `F4` during ordinary search to toggle this history boost
  without changing the result ranking rules. `!!` history search remains
  available either way.
- **Forty focused results.** Wheely retains the 40 most
  recently activated distinct items. Reusing one refreshes it; a new activation
  pushes the oldest item out once the list is full.
- **Delete what you no longer want.** In `!!` results, select an item and press
  `Del` to remove it immediately, without a confirmation prompt.
- **Only live windows appear.** A window found in history is shown only while
  it is currently open. Once it closes, it disappears from history results,
  because Wheely cannot focus a window that is no longer alive.
- **Your history survives restarts.** Records are stored locally in
  `~/.local/state/omarchy/wheel-history.json`.

## A guide, one keystroke away

The search field now stays uncluttered: **`Search · ?? help`**. Type `??` and
press Enter, or choose **Help** on the wheel's root ring, to open a guide to
searching. It explains regular search, files, calculations, history, and the
shortcuts for working with results.

## A few satisfying ways to use it

1. **Bring back a utility:** open the wheel, type `!!network`, and relaunch a
   network app or action you have used before.
2. **Reuse yesterday's math:** type `!!12`, find the earlier calculation by
   its answer, and press Enter. The expression returns to the field so you can
   change it.
3. **Choose your view:** in `!!` history, press `F4` to switch between **Recent**
   and **Popular**. In regular search, try a query you use often: familiar
   results rise to the top. Press `F4` to toggle that boost on or off;
   notifications confirm each change.
4. **Keep the list yours:** remove an obsolete favorite with `Del` right in
   history search.

## Where it could go next

History lays the groundwork for more ways to get back to useful things. These
are ideas for future development, not features in this release:

- **Dedicated recent and frequent views**, so you can browse recent activity or
  popularity without toggling the order.
- **Pins or favorites** for actions that should stay easy to find regardless
  of recent usage.
- **History controls** to clear all records, remove a category, or adjust the
  retention limit.
- **Richer calculator recall**, such as showing the answer more prominently or
  offering one-key copy alongside restoring the expression.
- **More useful file recall**, including finding a moved or renamed file by
  its earlier name and locating its current path.
- **Optional time ranges and context**, such as “used today” or grouping
  actions by project or workspace.
- **More searchable action types**, as the wheel grows new launchers,
  commands, and search sources.

For the complete interaction reference, see [the wheel guide](wheel.md).
