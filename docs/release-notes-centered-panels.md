# Release notes: panels that open where you expect

Your bar has two natural ways to open a panel, and now each one feels right.

Choose a panel in Wheely and it opens in the middle of the screen, over the
soft blurred backdrop. Click the panel's icon on the bar and it opens beside
that icon, just as a bar popup should. No surprise trip to the center; no
desktop-wide scrim when all you wanted was a quick glance at audio or network.

## One panel, two deliberate experiences

- **From Wheely:** the panel becomes the focus. It opens centered, with the
  shared blurred backdrop and the existing smooth entrance animation.
- **From the bar:** the panel stays connected to its control. It opens in its
  usual bar-relative position, with the desktop left clear.
- **Across built-in and added panels:** stock Omarchy panels and later plugin
  bar widgets follow the same launch-aware placement and backdrop behavior.
- **On dismissal:** a centered card stays centered as it fades away. It never
  snaps back to the bar for a final distracting frame.
- **When switching panels:** the centered experience and backdrop carry across
  the handoff, so the interaction feels like one continuous session.

Before this update, a panel's position did not reliably reflect how it had
been opened. A control launched from Wheely could appear tucked beside the bar,
while opening a panel directly from the bar could bring the entire Wheely
backdrop along. Panels added as plugins could behave differently again. This
update makes the launch source explicit and carries that intent through the
bar, plugin facade, panel placement, and backdrop lifecycle.

## Update

From the Wheely checkout, run:

```bash
./install.sh space
```

Use `./install.sh` instead if you use the default `SUPER+A` layout. The shell
restarts as part of installation. Keep the checkout in place so the post-update
hook can reapply the patch after Omarchy updates.

For implementation details and troubleshooting, see
[`centered-panels.md`](centered-panels.md).
