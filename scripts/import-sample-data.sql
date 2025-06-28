-- Script d'importation des données d'exemple pour K-Venture
-- À exécuter après la création des tables principales

-- Vider les tables existantes (optionnel, pour les tests)
-- TRUNCATE TABLE ebook_downloads, contact_requests, newsletters CASCADE;

-- Import des newsletters (remplacer par le chemin de votre fichier CSV)
-- COPY newsletters(id, email, first_name, last_name, status, source, created_at, updated_at)
-- FROM '/path/to/newsletters.csv'
-- DELIMITER ','
-- CSV HEADER;

-- Import des demandes de contact
-- COPY contact_requests(id, first_name, last_name, email, phone, company, position, subject, message, status, created_at, updated_at)
-- FROM '/path/to/contact_requests.csv'
-- DELIMITER ','
-- CSV HEADER;

-- Import des téléchargements d'e-books
-- COPY ebook_downloads(id, first_name, email, ebook_title, downloaded_at)
-- FROM '/path/to/ebook_downloads.csv'
-- DELIMITER ','
-- CSV HEADER;

-- Alternative : Insertion manuelle pour les tests
INSERT INTO newsletters (id, email, first_name, last_name, status, source, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'marie.dubois@seeg.ga', 'Marie', 'Dubois', 'active', 'website', '2024-01-15 10:30:00+00', '2024-01-15 10:30:00+00'),
('550e8400-e29b-41d4-a716-446655440002', 'jean.martin@orabank.ga', 'Jean', 'Martin', 'active', 'blog', '2024-01-20 14:20:00+00', '2024-01-20 14:20:00+00'),
('550e8400-e29b-41d4-a716-446655440003', 'fatou.diallo@afg.ga', 'Fatou', 'Diallo', 'active', 'ebook_download', '2024-01-25 16:45:00+00', '2024-01-25 16:45:00+00')
ON CONFLICT (email) DO NOTHING;

INSERT INTO contact_requests (id, first_name, last_name, email, phone, company, position, subject, message, status, created_at, updated_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Marie', 'Dubois', 'marie.dubois@seeg.ga', '+241 01 23 45 67', 'SEEG', 'Directrice RH', 'coaching', 'Nous souhaitons mettre en place un programme de coaching pour nos managers.', 'new', '2024-01-16 09:30:00+00', '2024-01-16 09:30:00+00'),
('650e8400-e29b-41d4-a716-446655440002', 'Jean', 'Martin', 'jean.martin@orabank.ga', '+241 02 34 56 78', 'Orabank', 'Directeur Général', 'transformation', 'Notre banque traverse une période de transformation digitale.', 'in_progress', '2024-01-22 14:15:00+00', '2024-01-25 10:00:00+00'),
('650e8400-e29b-41d4-a716-446655440003', 'Fatou', 'Diallo', 'fatou.diallo@afg.ga', '+241 03 45 67 89', 'AFG Bank', 'Responsable Formation', 'formation', 'Nous recherchons une formation en management d équipe.', 'completed', '2024-01-28 11:20:00+00', '2024-02-05 16:30:00+00');

INSERT INTO ebook_downloads (id, first_name, email, ebook_title, downloaded_at) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Marie', 'marie.dubois@seeg.ga', 'Guide du Leadership Transformationnel', '2024-01-15 09:15:00+00'),
('750e8400-e29b-41d4-a716-446655440002', 'Jean', 'jean.martin@orabank.ga', 'Guide du Leadership Transformationnel', '2024-01-20 13:30:00+00'),
('750e8400-e29b-41d4-a716-446655440003', 'Fatou', 'fatou.diallo@afg.ga', 'Guide du Leadership Transformationnel', '2024-01-25 16:00:00+00');

-- Vérification des données importées
SELECT 'newsletters' as table_name, COUNT(*) as count FROM newsletters
UNION ALL
SELECT 'contact_requests' as table_name, COUNT(*) as count FROM contact_requests
UNION ALL
SELECT 'ebook_downloads' as table_name, COUNT(*) as count FROM ebook_downloads;

-- Statistiques rapides
SELECT 
  'Conversions par source' as metric,
  source,
  COUNT(*) as count
FROM newsletters 
WHERE status = 'active'
GROUP BY source
ORDER BY count DESC;

SELECT 
  'Demandes par sujet' as metric,
  subject,
  COUNT(*) as count
FROM contact_requests
GROUP BY subject
ORDER BY count DESC;
