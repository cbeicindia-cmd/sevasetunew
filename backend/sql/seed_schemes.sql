INSERT INTO schemes (scheme_id, scheme_name, description, benefits, eligibility, documents_required, application_process, official_link, state, department, category, last_updated)
SELECT
  'SCH-' || gs,
  'Government Scheme ' || gs,
  'Description for scheme ' || gs,
  'Benefits for scheme ' || gs,
  'Eligibility criteria for scheme ' || gs,
  'Aadhar, PAN, Income Certificate',
  'Apply via official portal',
  'https://www.india.gov.in',
  CASE WHEN gs % 2 = 0 THEN 'National' ELSE 'State' END,
  CASE WHEN gs % 3 = 0 THEN 'Rural Development' ELSE 'Social Justice' END,
  CASE WHEN gs % 4 = 0 THEN 'Women' ELSE 'General' END,
  NOW()
FROM generate_series(1, 1000) gs
ON CONFLICT (scheme_id) DO NOTHING;
