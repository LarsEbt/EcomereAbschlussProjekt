-- Löschen aller vorhandenen Daten
TRUNCATE TABLE products_prd;

-- Einfügen der Handtaschen-Produkte
INSERT INTO products_prd (id, Marke, name, description, price, imageUrl, category) VALUES
(1, 'HERMÈS', '1992 Ardennes Kelly Sellier 35 schwarz (Tote)', '', 11170.95, '', 'Handtasche'),
(2, 'CHLOÉ', 'Woody Beige (Tote)', '', 1146.7, '', 'Handtasche'),
(3, 'Balenciaga', 'Hourglass Top Handle XS Shoulder Bag White (Satchel)', '', 2141.9, '', 'Handtasche'),
(4, 'GUCCI', 'Gucci Jackie Notte Dark Red (Crossbody Bag)', '', 3193.7, '', 'Handtasche'),
(5, 'JACQUEMUS', 'The Bambino Light Brown (Minitasche)', '', 620, '', 'Handtasche'),
(6, 'SAINT LAURENT', 'Ysl Le 5A7 Dark Notte (Schultertasche)', '', 1990, '', 'Handtasche'),
(7, 'COACH', 'Polished Pebble Tab Shoulderbag 26 Bluebell (Crossbody Bag)', '', 450, '', 'Handtasche'),
(8, 'MICHAEL MICHAEL KORS', 'Md Chain Pouchette Brown Luggage (Pochette)', '', 225, '', 'Handtasche'),
(9, 'COCCINELLE', 'Coccinellemagie Soft Royal Blue (Satchel)', '', 325, '', 'Handtasche'),
(10, 'COACH', 'Polished Pebble Leather Lana Shoulder Bag Maple (Hobo Bag)', '', 550, '', 'Handtasche'),
(11, 'AIGNER', 'Cybi Burgundy (Crossbody Bag)', '', 900, '', 'Handtasche'),
(12, 'VALENTINO GARAVANI', 'Antibes Medium Tote Bag Natural (Tote)', '', 1496.9, '', 'Handtasche'),
(13, 'MCM', 'Liz Vi Shopper Medium Black (Shopper)', '', 730, '', 'Handtasche'),
(14, 'Lauren Ralph Lauren', 'Bradley Md-Shoulder Bag-Medium Black (Schultertasche)', '', 459, '', 'Handtasche'),
(15, 'Christian Dior', '2020 Mini Satin Crystal Embellished Saddle grau (Schultertasche)', '', 3370, '', 'Handtasche');

-- Einfügen der Schmuck-Produkte
INSERT INTO products_prd (id, Marke, name, description, price, imageUrl, category) VALUES
(16, 'ETRO', 'Boheme Scarf Multicolour mehrfarbig (Wollschal)', '', 370, '', 'Schmuck'),
(17, 'Burberry', 'Check Gauz Scarf Beige (Leichter Schal)', '', 489.1, '', 'Schmuck'),
(18, 'Gucci', 'GG Belt Print Cashmere Silk Shawl Beige (Kaschmirschal)', '', 976, '', 'Schmuck'),
(19, 'Dolce&Gabbana', 'Belt With Logo Black (Gürtel)', '', 439.11, '', 'Schmuck'),
(20, 'MCM', 'Claus Visetos Belt 24K Cognac (Wendegürtel)', '', 350, '', 'Schmuck'),
(21, 'Gucci', 'Belt Plutone Guccissima Red (Ledergürtel)', '', 459.1, '', 'Schmuck'),
(22, 'ISABEL MARANT', 'Tulum Hat Multicolor (Hut)', '', 380.8, '', 'Schmuck'),
(23, 'GUCCI', 'Hat Arnaud Bob Beige / Natural (Fischerhut)', '', 450, '', 'Schmuck'),
(24, 'AMI PARIS', 'Cap mit Logo-Stick Navy (Hut)', '', 130, '', 'Schmuck'),
(25, 'BALENCIAGA', 'Coin Wallet Leather Black White (Münzportemonnaie)', '', 225, '', 'Schmuck'),
(26, 'MICHAEL MICHAEL KORS', 'Sm Tab Pckt Wllt Black (Bi-Fold Portemonnaie)', '', 125, '', 'Schmuck'),
(27, 'JACQUEMUS', 'Wallet Light Brown (Geldbörse)', '', 290, '', 'Schmuck'),
(28, 'Saint Laurent', 'SL 692-002 Silver-Silver-Grey (Sonnenbrille)', '', 375, '', 'Schmuck'),
(29, 'Versace', '0VE4491U 108/8755 Havana (Sonnenbrille)', '', 242, '', 'Schmuck'),
(30, 'Tiffany & Co.', '0TF4230 Black (Sonnenbrille)', '', 305, '', 'Schmuck');
