# CONSTANTS.md — Hardesty Roofing
_Last updated: 2026-04-23_
_Never store secrets here._

---

## Client

| Constant | Value |
|---|---|
| Company name | Hardesty Roofing |
| Client slug | hardesty |
| Primary ops contact | Brittany |
| Owner | Sam |
| Obsidian Labs contact | Brian |

## GHL

| Constant | Value |
|---|---|
| Location ID | TODO — populate when GHL sub-account confirmed |
| Sub-account | White-label under labsobsidian GHL |

### Custom Menu Link (Atlas Brain embed)

Paste this as the URL on the GHL custom menu link. The app auto-detects the
user's role from `email` and personalizes the greeting from `name`.

```
https://hardesty-atlas.labsobsidian.co/?email={{user.email}}&name={{user.first_name}}
```

**Role routing** (driven by `detectRoleFromUrl()` in `index.html`):

| Email pattern | Role applied |
|---|---|
| `@labsobsidian` / `@obsidianlabs` / contains `garrett` | `admin` — all tabs, role switcher visible |
| contains `brian` | `owner_brian` — marketing-focused view |
| contains `sam` + `hardesty` | `owner` — Sam's view, approvals enabled |
| contains `britt` | `ops` — Brittany's view |
| anything else | `ops` (safe default) |

**Force a role for testing** — append `&role=admin` (or `owner`, `ops`,
`crew`, `brian`):

```
https://hardesty-atlas.labsobsidian.co/?email={{user.email}}&name={{user.first_name}}&role=admin
```

Iframe embedding works out of the box — `vercel.json` already sets
`X-Frame-Options: ALLOWALL` and `frame-ancestors *` so GHL can host it.

## Supabase

| Constant | Value |
|---|---|
| Project ref | TODO |
| URL | TODO |

## Vercel

| Constant | Value |
|---|---|
| Brain app URL | https://hardesty-atlas.labsobsidian.co |
| Vercel project URL | https://hardesty-b120v3g2a-labsobsidians-projects.vercel.app (raw — prefer custom domain) |

## AccuLynx

| Constant | Value |
|---|---|
| API base | https://api.acculynx.com |
| API credentials | TODO — request from Brittany post-demo |

## External

| Constant | Value |
|---|---|
| Google Workspace domain | TODO — to be set up |
| QuickBooks company ID | TODO |

## Flags

| Flag | Value |
|---|---|
| DEMO_MODE | true — seeded data until AccuLynx sync wired |
| ACCULYNX_SYNC | false — pending API credentials |
