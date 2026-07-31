-- ============================================================
-- 040_add_audio_transcription_to_ai_configs.sql
--
-- Add audio transcription toggle to ai_configs table to allow
-- users to enable or disable automatic Speech-To-Text transcription
-- for inbound WhatsApp voice messages.
-- ============================================================

ALTER TABLE ai_configs
  ADD COLUMN IF NOT EXISTS audio_transcription_enabled BOOLEAN NOT NULL DEFAULT false;
