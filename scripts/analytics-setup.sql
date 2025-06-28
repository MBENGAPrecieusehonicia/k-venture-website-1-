-- Script pour créer des vues analytiques dans Supabase

-- Vue pour les métriques de conversion
CREATE OR REPLACE VIEW analytics_conversions AS
SELECT 
  DATE(created_at) as date,
  'newsletter' as conversion_type,
  COUNT(*) as count,
  source
FROM newsletters 
WHERE status = 'active'
GROUP BY DATE(created_at), source

UNION ALL

SELECT 
  DATE(created_at) as date,
  'contact' as conversion_type,
  COUNT(*) as count,
  subject as source
FROM contact_requests
GROUP BY DATE(created_at), subject

UNION ALL

SELECT 
  DATE(downloaded_at) as date,
  'ebook' as conversion_type,
  COUNT(*) as count,
  ebook_title as source
FROM ebook_downloads
GROUP BY DATE(downloaded_at), ebook_title;

-- Vue pour les métriques de performance par source
CREATE OR REPLACE VIEW analytics_sources AS
SELECT 
  source,
  COUNT(*) as total_signups,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as signups_7d,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as signups_30d
FROM newsletters 
WHERE status = 'active'
GROUP BY source;

-- Vue pour les métriques de contact par sujet
CREATE OR REPLACE VIEW analytics_contact_subjects AS
SELECT 
  subject,
  COUNT(*) as total_requests,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as requests_7d,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as requests_30d,
  AVG(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completion_rate
FROM contact_requests
GROUP BY subject;

-- Fonction pour obtenir les métriques du dashboard
CREATE OR REPLACE FUNCTION get_dashboard_metrics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_newsletters', (SELECT COUNT(*) FROM newsletters WHERE status = 'active'),
    'total_contacts', (SELECT COUNT(*) FROM contact_requests),
    'total_ebooks', (SELECT COUNT(*) FROM ebook_downloads),
    'conversion_rate', (
      SELECT ROUND(
        (COUNT(DISTINCT email) FROM contact_requests WHERE email IN (SELECT email FROM newsletters)) * 100.0 / 
        NULLIF((SELECT COUNT(*) FROM newsletters WHERE status = 'active'), 0), 2
      )
    ),
    'top_sources', (
      SELECT json_agg(json_build_object('source', source, 'count', total_signups))
      FROM (SELECT source, total_signups FROM analytics_sources ORDER BY total_signups DESC LIMIT 5) t
    ),
    'monthly_growth', (
      SELECT json_agg(json_build_object('month', month, 'newsletters', newsletters, 'contacts', contacts))
      FROM (
        SELECT 
          TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') as month,
          COUNT(CASE WHEN table_name = 'newsletters' THEN 1 END) as newsletters,
          COUNT(CASE WHEN table_name = 'contacts' THEN 1 END) as contacts
        FROM (
          SELECT created_at, 'newsletters' as table_name FROM newsletters WHERE status = 'active'
          UNION ALL
          SELECT created_at, 'contacts' as table_name FROM contact_requests
        ) combined
        WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month DESC
        LIMIT 12
      ) monthly_data
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
