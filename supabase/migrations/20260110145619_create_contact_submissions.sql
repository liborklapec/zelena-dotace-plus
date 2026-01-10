/*
  # Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Jméno a příjmení
      - `email` (text) - Email kontakt
      - `phone` (text) - Telefon
      - `project_type` (text) - Typ projektu (fotovoltaika, zateplení, atd.)
      - `address` (text) - Adresa nemovitosti
      - `message` (text) - Zpráva
      - `submitted_at` (timestamptz) - Čas odeslání
      - `email_sent` (boolean) - Byl odeslán email?
      - `ip_address` (text) - IP adresa odesílatele
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - No public read/write access (only via Edge Function with service role)
  
  3. Important Notes
    - Table is locked down - only backend can write
    - Stores all form submissions for audit trail
    - email_sent flag tracks delivery status
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_type text NOT NULL,
  address text DEFAULT '',
  message text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false,
  ip_address text DEFAULT ''
);

-- Enable RLS (locked down by default)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- No policies = no public access
-- Edge Function will use service role key to insert

-- Index for searching by date
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at 
  ON contact_submissions(submitted_at DESC);