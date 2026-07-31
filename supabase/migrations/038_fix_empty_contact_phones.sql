-- Remove contacts created with empty phone strings so newly incoming
-- messages from those senders create fresh valid contacts with phone numbers.

DELETE FROM contacts
WHERE (phone IS NULL OR phone = '')
  AND NOT EXISTS (
    SELECT 1 FROM conversations conv WHERE conv.contact_id = contacts.id
  );

