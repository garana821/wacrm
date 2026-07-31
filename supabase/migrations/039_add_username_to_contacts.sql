-- ============================================================
-- 039_add_username_to_contacts.sql
--
-- Add `username` column to `contacts` table to support Meta's
-- new WhatsApp username / BSUID identification scheme.
-- ============================================================

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS username TEXT;

CREATE INDEX IF NOT EXISTS idx_contacts_username ON contacts(username) WHERE username IS NOT NULL;
