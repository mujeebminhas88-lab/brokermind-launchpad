// Shared HTML email layout for transactional emails sent via Resend.
// Built on the light theme (src/styles.css) rather than dark -- email
// clients render dark-background HTML inconsistently (some invert colors
// unpredictably in "dark mode"), so light is the safer default for
// cross-client reliability. Inline styles only -- <style> blocks are
// stripped by some clients (notably Gmail in certain contexts).

const ACCENT = "#147a58";
const FOREGROUND = "#14150f";
const MUTED = "#63665a";
const BORDER = "#e3e1d8";
const SURFACE = "#faf9f5";

// Custom web fonts (Fraunces, IBM Plex Mono) aren't reliably loadable in
// email clients -- these are the closest widely-supported fallbacks that
// preserve the editorial-serif / mono brand feel.
const FONT_DISPLAY = "Georgia, 'Times New Roman', serif";
const FONT_MONO = "'Courier New', Courier, monospace";

// Email clients can't reference bundled/hashed Vite assets (the URL must be
// stable across builds), so this points at public/brokermind-logo.png,
// served unchanged at the domain root rather than through Vite's asset
// pipeline. Assumes the landing page is served from the bare domain (the
// app itself lives on app.brokermindapp.com) -- update this if that's wrong.
const LOGO_URL = "https://brokermindapp.com/brokermind-logo.png";

export function renderEmailLayout(bodyHtml: string): string {
  return `
<div style="background-color:${SURFACE}; padding:40px 16px; font-family:${FONT_MONO};">
  <div style="max-width:480px; margin:0 auto; background-color:#ffffff; border:1px solid ${BORDER}; border-radius:8px; overflow:hidden;">
    <div style="padding:24px 32px; border-bottom:1px solid ${BORDER};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:10px;">
            <img src="${LOGO_URL}" alt="" width="32" height="32" style="display:block; width:32px; height:32px; object-fit:contain;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-family:${FONT_DISPLAY}; font-style:italic; font-size:21px; color:${FOREGROUND};">BrokerMindAI</span>
          </td>
        </tr>
      </table>
    </div>
    <div style="padding:28px 32px; font-family:${FONT_MONO}; font-size:14px; line-height:1.7; color:${FOREGROUND};">
      ${bodyHtml}
    </div>
    <div style="padding:18px 32px; background-color:${SURFACE}; border-top:1px solid ${BORDER}; font-family:${FONT_MONO}; font-size:11px; letter-spacing:0.02em; color:${MUTED};">
      AI decision intelligence for residential mortgage brokers, B lenders, and private lending teams.
    </div>
  </div>
</div>`;
}

export function emailLabel(text: string): string {
  return `<p style="margin:0 0 16px; font-family:${FONT_MONO}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${ACCENT};">${text}</p>`;
}

export function emailQuoteBlock(text: string): string {
  return `<div style="margin-top:8px; padding:14px 16px; background-color:${SURFACE}; border-left:2px solid ${ACCENT}; border-radius:4px; white-space:pre-wrap;">${text}</div>`;
}
