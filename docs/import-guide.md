# Guide d'Importation des Données K-Venture

## 📊 Fichiers CSV Disponibles

### 1. `newsletters.csv` - 15 abonnés
- **Colonnes** : id, email, first_name, last_name, status, source, created_at, updated_at
- **Sources** : website, blog, ebook_download, social_media, referral
- **Statuts** : active (14), unsubscribed (1)

### 2. `contact_requests.csv` - 12 demandes
- **Colonnes** : id, first_name, last_name, email, phone, company, position, subject, message, status, created_at, updated_at
- **Sujets** : coaching, transformation, formation, team-coaching, conference, autre
- **Statuts** : new (7), in_progress (3), completed (2)

### 3. `ebook_downloads.csv` - 18 téléchargements
- **Colonnes** : id, first_name, email, ebook_title, downloaded_at
- **E-book** : "Guide du Leadership Transformationnel"

## 🚀 Méthodes d'Importation

### Option 1 : Interface Supabase
1. Connectez-vous à votre dashboard Supabase
2. Allez dans "Table Editor"
3. Sélectionnez la table cible
4. Cliquez sur "Insert" → "Import data from CSV"
5. Uploadez le fichier CSV correspondant

### Option 2 : Commande SQL COPY
\`\`\`sql
-- Newsletters
COPY newsletters(id, email, first_name, last_name, status, source, created_at, updated_at)
FROM '/path/to/newsletters.csv'
DELIMITER ','
CSV HEADER;

-- Contact Requests
COPY contact_requests(id, first_name, last_name, email, phone, company, position, subject, message, status, created_at, updated_at)
FROM '/path/to/contact_requests.csv'
DELIMITER ','
CSV HEADER;

-- Ebook Downloads
COPY ebook_downloads(id, first_name, email, ebook_title, downloaded_at)
FROM '/path/to/ebook_downloads.csv'
DELIMITER ','
CSV HEADER;
\`\`\`

### Option 3 : Script d'insertion SQL
Utilisez le fichier `scripts/import-sample-data.sql` qui contient des INSERT statements prêts à l'emploi.

## 📈 Données Réalistes Incluses

### Entreprises Gabonaises Représentées
- **SEEG** (Société d'Énergie et d'Eau du Gabon)
- **Orabank** (Banque)
- **AFG Bank** (Banque)
- **Hôtel Trianon** (Hôtellerie)
- **TotalEnergies** (Énergie)
- **Orange Gabon** (Télécoms)
- **Airtel Gabon** (Télécoms)
- **Comilog** (Mines)

### Organisations Internationales
- **UNESCO** (Nations Unies)
- **Banque Mondiale**
- **Union Européenne**

### Secteur Public
- **Mairie de Libreville**
- **Ministères et Agences**

## 🎯 Scénarios de Test Couverts

### Parcours Client Complet
1. **Marie Dubois (SEEG)** :
   - Newsletter → E-book → Contact → Coaching

2. **Jean Martin (Orabank)** :
   - Blog → Newsletter → E-book → Transformation

3. **Fatou Diallo (AFG Bank)** :
   - E-book → Newsletter → Formation (Complétée)

### Types de Demandes
- **Coaching individuel** : Dirigeants et managers
- **Coaching d'équipe** : Équipes dirigeantes
- **Formation** : Programmes sur-mesure
- **Transformation** : Changements organisationnels
- **Conférences** : Événements et séminaires

## 📊 Métriques Attendues Après Import

### Conversions
- **15 abonnés newsletter** (93% actifs)
- **12 demandes de contact** (58% nouvelles)
- **18 téléchargements e-book**

### Performance par Source
- **Website** : 40% des inscriptions
- **Blog** : 20% des inscriptions
- **E-book** : 27% des inscriptions
- **Social Media** : 13% des inscriptions

### Taux de Conversion
- **E-book → Newsletter** : 83%
- **Newsletter → Contact** : 80%
- **Contact → Suivi** : 42%

## ⚠️ Points d'Attention

### Contraintes Respectées
- **Emails uniques** dans newsletters
- **UUIDs valides** pour tous les IDs
- **Statuts conformes** aux CHECK constraints
- **Dates cohérentes** (création < modification)

### Données Cohérentes
- Les emails sont cohérents entre les tables
- Les dates suivent une chronologie logique
- Les entreprises et postes sont réalistes
- Les messages reflètent des besoins réels

## 🔧 Vérification Post-Import

\`\`\`sql
-- Vérifier les comptes
SELECT 'newsletters' as table_name, COUNT(*) as count FROM newsletters
UNION ALL
SELECT 'contact_requests', COUNT(*) FROM contact_requests
UNION ALL
SELECT 'ebook_downloads', COUNT(*) FROM ebook_downloads;

-- Vérifier les relations
SELECT 
  n.email,
  n.first_name,
  n.last_name,
  COUNT(DISTINCT e.id) as ebook_downloads,
  COUNT(DISTINCT c.id) as contact_requests
FROM newsletters n
LEFT JOIN ebook_downloads e ON n.email = e.email
LEFT JOIN contact_requests c ON n.email = c.email
GROUP BY n.email, n.first_name, n.last_name
ORDER BY ebook_downloads DESC, contact_requests DESC;
\`\`\`

Ces données d'exemple vous permettront de tester immédiatement toutes les fonctionnalités du système K-Venture avec des scénarios réalistes du marché gabonais.
