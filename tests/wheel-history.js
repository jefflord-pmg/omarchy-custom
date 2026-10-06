// Activation history keeps the most recent 40 actions and searches expressions and answers.
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const source = fs.readFileSync(path.join(__dirname, "../plugins/xpo.wheel/MenuIndex.js"), "utf8")
const names = [...source.matchAll(/^(?:function (\w+)|var (\w+) =)/gm)].map(m => m[1] || m[2])
const M = new Function(source.replace(/^\.pragma library/m, "") + "\nreturn {" + names.join(",") + "}")()

assert.equal(M.modeOf("!!min"), "history")
assert.equal(M.termOf("!!min"), "min")
assert.equal(M.modeOf("!min"), "")
assert.equal(M.modeOf("??"), "help")
assert.equal(M.termOf("??"), "")

let history = []
history = M.recordHistory(history, { calculation: "112*3", label: "336", icon: "calc" }, 1, 40)
history = M.recordHistory(history, { calculation: "156/13", label: "12", icon: "calc" }, 2, 40)
const matches = term => M.historyRows(history, term, [], 40)
assert.deepEqual(matches("12").map(row => row.calculation), ["156/13", "112*3"])
assert.deepEqual(matches("156").map(row => row.calculation), ["156/13"])
assert.deepEqual(matches("336").map(row => row.calculation), ["112*3"])
assert.equal(matches("")[0].calculation, "156/13", "most recently used appears first")

history = M.recordHistory(history, { calculation: "112*3", label: "336" }, 3, 40)
assert.equal(history[0].query, "112*3")
assert.equal(history[0].uses, 2)
assert.equal(history[0].lastUsed, 3)
assert.equal(matches("12")[0].calculation, "112*3", "most recently activated matching expression appears first")
assert.equal(M.historyRows(history, "", [], 40)[0].historyType, "calc")
assert.equal(M.historyRows(history, "12", [], 40, "recent")[0].calculation, "112*3")
assert.equal(M.historyRows(history, "12", [], 40, "popular")[0].calculation, "112*3")

const historyPick = M.historyRows(history, "112", [], 40)[0]
assert.equal(M.keyOf(historyPick), "calc:112*3", "history row retains the action usage key")
history = M.recordHistory(history, historyPick, 4, 40)
assert.equal(history[0].uses, 3, "activating a history result increments the existing use count")
assert.equal(history[0].lastUsed, 4, "activating a history result refreshes last-used")
history = M.recordHistory(history, { calculation: "112*3", label: "336" }, 5, 40)
assert.equal(history[0].uses, 4, "activating the original result increments the same history count")
assert.equal(history[0].lastUsed, 5, "activating the original result refreshes last-used")
assert.equal(M.historyRows(history, "12", [], 40)[0].calculation, "112*3",
  "latest activation sorts first even when another result has more uses")
assert.equal(M.historyRows(history, "12", [], 40, "popular")[0].calculation, "112*3",
  "popular ordering uses count, then recency")

const removedKey = history[0].key
history = M.removeHistory(history, removedKey)
assert.ok(!history.some(item => item.key === removedKey), "selected history can be deleted")

const app = { appId: "org.example.editor", label: "Editor", trail: "App" }
history = M.recordHistory(history, app, 4, 40)
assert.equal(M.historyRows(history, "editor", [], 40)[0].appId, app.appId)
const windowRow = { address: "0xabc", label: "Notes", trail: "Window" }
history = M.recordHistory(history, windowRow, 5, 40)
assert.equal(M.historyRows(history, "notes", [], 40).length, 0, "closed windows are omitted")
assert.equal(M.historyRows(history, "notes", [windowRow], 40)[0].address, windowRow.address)

let capped = []
for (let i = 0; i < 41; i++)
  capped = M.recordHistory(capped, { appId: "app." + i, label: "App " + i }, i + 1, 40)
assert.equal(capped.length, 40)
assert.ok(!capped.some(item => item.appId === "app.0"), "least recently used distinct entry is evicted")
assert.ok(capped.some(item => item.appId === "app.40"))

let ordering = []
const regular = { appId: "app.regular", label: "Regular" }
ordering = M.recordHistory(ordering, regular, 1, 40)
ordering = M.recordHistory(ordering, regular, 2, 40)
ordering = M.recordHistory(ordering, regular, 3, 40)
ordering = M.recordHistory(ordering, { appId: "app.new", label: "New" }, 4, 40)
assert.equal(M.historyRows(ordering, "", [], 40, "recent")[0].label, "New")
assert.equal(M.historyRows(ordering, "", [], 40, "popular")[0].label, "Regular")
console.log("ok: history tracks shared use/recency, deletes items, filters expressions and answers, omits closed windows, and caps at 40")
