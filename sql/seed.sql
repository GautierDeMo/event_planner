USE event_planner;

-- ===================================================================
--  Création de 10 événements
-- ===================================================================

-- 5 événements en petit comité
CALL create_event('Soirée Dégustation de Fromages', '2025-12-05 19:00:00', '2025-12-05 22:00:00', 8, 'La Crèmerie du Coin');
CALL create_event('Atelier d''écriture de Haïkus', '2025-12-10 18:00:00', '2025-12-10 20:00:00', 10, 'Bibliothèque Poésie');
CALL create_event('Partie de Poker entre amis', '2025-12-12 21:00:00', '2026-01-13 02:00:00', 6, 'Le Salon Privé');
CALL create_event('Cours de cuisine thaïlandaise', '2025-12-18 18:30:00', '2025-12-18 21:30:00', 8, 'Bangkok Kitchen');
CALL create_event('Club de lecture "Science-Fiction"', '2026-01-07 19:30:00', '2026-01-07 21:00:00', 10, 'Café "Le Futuriste"');

-- 5 événements de plus grande envergure
CALL create_event('Concert de Jazz en plein air', '2026-01-15 20:00:00', '2026-01-15 23:00:00', 200, 'Parc Monceau');
CALL create_event('Conférence "Les Nouveaux Explorateurs"', '2026-01-22 09:30:00', '2026-01-22 17:00:00', 150, 'Auditorium de la Cité des Sciences');
CALL create_event('Tournoi de Badminton', '2026-01-25 10:00:00', '2026-01-25 18:00:00', 32, 'Gymnase Municipal');
CALL create_event('Projection-débat "Le Monde de Demain"', '2026-02-01 19:00:00', '2026-02-01 22:00:00', 80, 'Cinéma Utopia');
CALL create_event('Gala Annuel des Anciens Élèves', '2026-02-07 19:30:00', '2026-02-08 02:00:00', 250, 'Salons Hoche');


-- ===================================================================
--  Inscriptions aux événements
-- ===================================================================

-- Inscriptions pour 'Soirée Dégustation de Fromages' (ID: 1, Max: 8)
CALL register_person(1, 'Gautier', 'De Mauroy', '2025-11-20 10:15:00');
CALL register_person(1, 'Alice', 'Martin', '2025-11-21 11:30:00');
CALL register_person(1, 'Bob', 'Lefebvre', '2025-11-22 14:00:00');
CALL register_person(1, 'Carla', 'Garcia', '2025-11-23 18:45:00');

-- Inscriptions pour 'Atelier d''écriture de Haïkus' (ID: 2, Max: 10)
CALL register_person(2, 'David', 'Bernard', NULL);
CALL register_person(2, 'Eva', 'Dubois', NULL);
CALL register_person(2, 'Gautier', 'De Mauroy', NULL);

-- Inscriptions pour 'Partie de Poker entre amis' (ID: 3, Max: 6)
CALL register_person(3, 'Frank', 'Moreau', '2025-12-01 20:00:00');
CALL register_person(3, 'Grace', 'Roux', '2025-12-02 10:05:00');
CALL register_person(3, 'Heidi', 'Fournier', '2025-12-02 13:25:00');
CALL register_person(3, 'Ivan', 'Girard', '2025-12-03 17:10:00');
CALL register_person(3, 'Gautier', 'De Mauroy', '2025-12-04 22:00:00');

-- Inscriptions pour 'Cours de cuisine thaïlandaise' (ID: 4, Max: 8)
CALL register_person(4, 'Judy', 'Bonnet', NULL);
CALL register_person(4, 'Mallory', 'Vincent', NULL);

-- Inscriptions pour 'Club de lecture "Science-Fiction"' (ID: 5, Max: 10)
-- Personne n'est encore inscrit

-- Inscriptions pour 'Concert de Jazz en plein air' (ID: 6, Max: 200)
CALL register_person(6, 'Gautier', 'De Mauroy', '2025-12-20 12:00:00');
CALL register_person(6, 'Olivia', 'Petit', '2025-12-21 15:00:00');
CALL register_person(6, 'Paul', 'Sanchez', '2025-12-22 18:00:00');
CALL register_person(6, 'Quentin', 'David', '2025-12-23 21:00:00');

-- Inscriptions pour 'Conférence "Les Nouveaux Explorateurs"' (ID: 7, Max: 150)
CALL register_person(7, 'Rachel', 'Simon', NULL);
CALL register_person(7, 'Steve', 'Laurent', NULL);

-- Inscriptions pour 'Tournoi de Badminton' (ID: 8, Max: 32)
CALL register_person(8, 'Trudy', 'Michel', '2026-01-10 10:00:00');
CALL register_person(8, 'Victor', 'Gagnon', '2026-01-11 12:30:00');
CALL register_person(8, 'Wendy', 'Lemaire', '2026-01-12 15:00:00');
CALL register_person(8, 'Gautier', 'De Mauroy', '2026-01-13 17:30:00');

-- Inscriptions pour 'Projection-débat "Le Monde de Demain"' (ID: 9, Max: 80)
CALL register_person(9, 'Xavier', 'Caron', NULL);

-- Inscriptions pour 'Gala Annuel des Anciens Élèves' (ID: 10, Max: 250)
CALL register_person(10, 'Yasmine', 'Marchand', '2026-01-25 14:00:00');
CALL register_person(10, 'Zoe', 'Menard', '2026-01-26 16:30:00');
CALL register_person(10, 'Gautier', 'De Mauroy', '2026-01-27 19:00:00');
