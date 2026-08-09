# Supabase — schema & migrations

**Status:** 🟡 DRAFT authored, **not applied to any project.** Applying needs the client's real
Supabase project-ref + tokens (currently placeholders in `.mcp.json`) — see
`docs/CLIENT_CONFIRMATION_REQUIRED.md` (P0).

## Files
| File | Purpose |
|---|---|
| `migrations/0001_init.sql` | Extensions, enums, helper functions, all tables, triggers, indexes |
| `migrations/0002_rls.sql` | Enable RLS + all policies (public read / anon enquiry insert / admin write) |
| `seed.sql` | CONFIRMED-only seed (11 services, 2 offices). No prices/itineraries. |

## Apply order (once a real project exists)
1. Link project: `supabase link --project-ref <ref>`
2. Apply migrations: `supabase db push` (or MCP `apply_migration` per file, in order).
3. Create the first admin: create an `auth.users` account, then insert a matching
   `admin_users` row with `role = 'super_admin'`.
4. Seed: run `seed.sql`.
5. Generate types: `supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts`
   (replaces the placeholder in `src/lib/supabase/types.ts`).
6. Run the RLS test suite (see `docs/TESTING_PLAN.md` §2 "RLS / security") against a **test**
   project before touching production.

## Guardrails baked into the schema
- `tour_packages.publish_requires_verified` — a package cannot be `published` unless
  `review_status = 'verified'`. Prevents unverified/invented data going live.
- No bank-detail columns anywhere (never stored or displayed publicly).
- Storage buckets (logos, packages, gallery, brochures, hero) are created separately with
  public-read / authenticated-write policies — added in the storage migration during Phase 3 apply.
