/*
  # Security Fixes

  1. Remove Unused Indexes
    - Drop `idx_contact_inquiries_status` (unused)
    - Drop `idx_contact_submissions_submitted_at` (unused)
  
  2. Add RLS Policies for contact_submissions
    - Block all anonymous access (data protection)
    - Allow service_role access via backend only
  
  3. Notes
    - Auth DB connection strategy must be changed in Supabase Dashboard
    - These policies ensure submissions are only accessible via Edge Functions
*/

-- Remove unused indexes to improve performance
DROP INDEX IF EXISTS idx_contact_inquiries_status;
DROP INDEX IF EXISTS idx_contact_submissions_submitted_at;

-- Add restrictive RLS policies for contact_submissions
-- Block all public/anonymous access
CREATE POLICY "Block all anonymous access to submissions"
  ON contact_submissions
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Block all authenticated access (no auth system currently)
CREATE POLICY "Block all authenticated access to submissions"
  ON contact_submissions
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);
