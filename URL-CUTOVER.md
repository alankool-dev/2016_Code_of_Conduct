# Website URL cutover log

Purpose: keep preview, application, and production URLs easy to find when the replacement club website is promoted. Confirm the final production hostname before cutover; do not guess between the bare and `www` domain.

## Changes made

| Location | Current URL | Launch action |
| --- | --- | --- |
| Player's Charter — top-right “Club website” link (`public/index.html`) | `https://demo.stpaulsartanefc.com/` | Replace with the confirmed canonical production club website URL. This was updated from the internal Site preview URL. |

## Other URL references to review at launch

| Location | Current URL / path | Launch action |
| --- | --- | --- |
| Player's Charter — “Find a club contact” | `https://st-pauls-artane-club-demo.localdate.chatgpt.site/club.html#contacts` | Change the host to the production club website; keep `/club.html#contacts`. |
| Player's Charter — policy links and no-JavaScript code-of-conduct link | `https://st-pauls-artane-club-demo.localdate.chatgpt.site/downloads/code-of-conduct.pdf`, `/downloads/child-safeguarding-statement.pdf`, `/downloads/fai-social-media-policy.pdf` | Change the host to the production club website; preserve each PDF path. |
| Club website — Player's Charter link | `https://conduct.stpaulsartanefc.com` | Keep if this remains the chosen public Charter address; update only if the Charter gets a different production hostname. |

## Cutover checklist

- Confirm the canonical public hostname for the replacement club website.
- Update the top-right Club website link and the contact and policy links above.
- Confirm the club website's Player's Charter link still targets the chosen Charter hostname.
- Search the club website and this repository for `localdate.chatgpt.site`, `demo.stpaulsartanefc.com`, and `conduct.stpaulsartanefc.com` before promotion.
