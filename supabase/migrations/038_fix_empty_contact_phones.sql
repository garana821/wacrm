-- Fix contacts created with empty phone strings by pulling from conversation / message history if available
-- or removing orphan empty contacts so newly incoming messages create fresh valid contacts.

UPDATE contacts
SET phone = subquery.sender_phone
FROM (
  SELECT DISTINCT ON (c.id) c.id AS contact_id, m.sender_phone
  FROM contacts c
  JOIN conversations conv ON conv.contact_id = c.id
  JOIN messages m ON m.conversation_id = conv.id
  WHERE (c.phone IS NULL OR c.phone = '')
    AND m.sender_phone IS NOT NULL AND m.sender_phone <> ''
  ORDER BY c.id, m.created_at DESC
) AS subquery
WHERE contacts.id = subquery.contact_id;
