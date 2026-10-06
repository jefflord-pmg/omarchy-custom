-- The compositor exports this before its startup callbacks launch Quickshell.
hl.env("QSG_RENDER_LOOP", "threaded")
hl.config({ decoration = { blur = { enabled = true, size = 4, passes = 2 } } })

-- Blur only the shared backdrop; blurring the overlays doubles the work.
hl.layer_rule({
  match = { namespace = "omarchy-panel-scrim" },
  blur = true,
  ignore_alpha = 0.05,
  no_anim = true,
  animation = "none",
})
hl.layer_rule({
  match = { namespace = "^(omarchy-wheel|omarchy-files)$" },
  blur = false,
  no_anim = true,
  animation = "none",
})

-- install.sh space switches the wheel and Omarchy menu keys; the installer
-- replaces this value in the managed block and persists the choice in its hook.
local space_layout = false
local wheel_key = "SUPER + A"
local menu_key = "SUPER + SPACE"
if space_layout then wheel_key, menu_key = menu_key, wheel_key end

hl.unbind("SUPER + A")
if space_layout then hl.unbind("SUPER + SPACE") end
o.bind(wheel_key, "Wheel", "omarchy-shell -q shell summon xpo.wheel")
o.bind(wheel_key, nil, "omarchy-shell -q shell call xpo.wheel commit ''", { release = true })
if space_layout then o.bind(menu_key, "Omarchy menu", "omarchy-menu toggle") end

-- SUPER+W normally closes a window; the helper retains that fallback.
hl.unbind("SUPER + W")
o.bind("SUPER + W", "Close wheel or window", "omarchy-wheel-close")
