---------------------------------------------------- Trâm -----------------------------------------------
-- 1. studio
INSERT INTO STUDIO ("NAME", FOUNDED_YEAR)
VALUES
    ('Universal Pictures', 1912),
    ('Paramount Pictures', 1912),
    ('Warner Bros', 1923);

-- 2. movie
-- Note: Budget unit is in million dollars.
INSERT INTO MOVIE (COUNTRY, BUDGET, TITLE, DESCRIPTION, MPA_RATING, RELEASED_YEAR, STUDIO_ID)
VALUES
    ('United States', 200, 'Breaking Bad - Season 1', 
     'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.', 
     'TV-MA', 2008, 1),
    ('Germany', 500, 'Schindler''s List', 
     'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 
     'R', 1993, 2),
    ('England', 700, 'Singin'' in the Rain', 
     'A silent film star falls for a chorus girl when he and his jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.', 
     'G', 1952, 3),
    ('United States', 300, 'Breaking Bad - Season 2', 
     'Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them first.', 
     'TV-MA', 2009, 1),
    ('United Kingdom', 50, 'The Fog of War', 
     'An Academy Award-winning documentary examining the complex lessons from the U.S. involvement in Vietnam and Robert S. McNamara’s tenure as Secretary of Defense.', 
     'PG-13', 2003, 2),
    ('Germany', 40, 'The Berlin Wall: Escape to Freedom', 
     'A detailed documentary about the rise and fall of the Berlin Wall and the courageous attempts to escape from East to West Germany.', 
     'PG', 2012, 2),
    ('United States', 40, 'The Last Dance', 
     'A documentary chronicling Michael Jordan’s career and his final season with the Chicago Bulls.', 
     'TV-MA', 2020, 3),
    ('United Kingdom', 25, 'Becoming Bond', 
     'The story of George Lazenby, a car mechanic who became James Bond for one movie and walked away from fame.', 
     'TV-14', 2017, 1);

-- 3. remakes
INSERT INTO REMAKES
VALUES 
    (1, 2);

-- 4.
INSERT INTO CINEMATIC_MOVIE
VALUES 
    (2, 180),
    (3, 120);

-- 5. 
INSERT INTO TV_SERIES
VALUES 
    (1, 8, 1, 'HBO'),
    (4, 10, 2, 'HBO');

-- 6.
INSERT INTO "user" (EMAIL, HASHED_PASSWORD, DISPLAYED_NAME, HOUSE_NUMBER, STREET, DISTRICT, CITY)
VALUES 
    ('tatrungtin2004@gmail.com', 'abc', 'tinta', '246', 'Ly Thuong Kiet', 'District 10', 'Ho Chi Minh City'),
    ('baotram2004@gmail.com', '123', 'tramdang', '357', 'Ngo Quyen', 'Dong Da', 'Ha Noi');

-- 7.
INSERT INTO RATES (USER_ID, MOVIE_ID, RATE_POINT)
VALUES 
    (1, 1, 8);

-- 8.
INSERT INTO MOVIE_DISTRIBUTOR
VALUES 
    ('CJ CGV', 2000, '0905251508');

-- 9.
INSERT INTO CINEMA ("NAME", DISTRIBUTOR_NAME, "LOCATION", NUMBER_OF_ROOMS)
VALUES 
    ('CGV Bach Khoa', 'CJ CGV', 'HCM City', 10);

-- 10.
INSERT INTO SHOWTIME (CINEMA_NAME, "TIME", ROOM, NUMBER_OF_TICKETS, MOVIE_ID)
VALUES 
    ('CGV Bach Khoa', '2024-11-19 14:00:00+02:00', 12, 5000, 1);

-- 11. studio_founder
INSERT INTO STUDIO_FOUNDER (STUDIO_ID, FOUNDER_NAME)
VALUES
    (1, 'Steven Spielberg'),
    (2, 'George Lucas'),
    (3, 'Christopher Nolan');

-- 12. award 
INSERT INTO AWARD (AWARD_ID, NAME, YEAR, INSTITUTION)
VALUES
    (1, 'Best Picture', 2024, 'Academy Awards'),
    (2, 'Best Director', 2023, 'Golden Globes'),
    (3, 'Best Actor', 2022, 'Cannes Film Festival');

-- 13. movie_award
INSERT INTO MOVIE_AWARD (AWARD_ID, MOVIE_ID)
VALUES
    (1, 2);
    
-- 14. participant
INSERT INTO PARTICIPANT (PARTICIPANT_ID, FIRST_NAME, MID_NAME, LAST_NAME, NATIONALITY, DOB)
VALUES 
		(1, 'Margot', 'Elise', 'Robbie', 'Australian', '1990-07-02'),
		(2, 'Emma', 'Charlotte', 'Watson', 'British', '1990-04-15'),
		(3, 'Leonardo', 'Wilhelm', 'DiCaprio', 'American', '1974-11-11'),
		(4, 'Chris', 'Robert', 'Evans', 'American', '1981-06-13'),
		(5, 'Scarlett', 'Ingrid', 'Johansson', 'American', '1984-11-22'),
		(6, 'Daniel', 'Jacob', 'Radcliffe', 'British', '1989-07-23'),
		(7, 'Jennifer', 'Shrader', 'Lawrence', 'American', '1990-08-15'),
		(8, 'Tom', 'Andrew', 'Holland', 'British', '1996-06-01');
		
-- 15. actor
INSERT INTO ACTOR (PARTICIPANT_ID)
VALUES 
		(1),
		(2),
		(5),
		(6),
		(7);

-- 16. director
INSERT INTO DIRECTOR (PARTICIPANT_ID)
VALUES 
		(3),
		(4),
		(8);

-- 17. movie_casts
INSERT INTO MOVIE_CASTS (MOVIE_ID, PARTICIPANT_ID, ROLE)
VALUES 
		(1, 1, 'Thomas'),
		(2, 2, 'Helene');

-- 18. is_directed
INSERT INTO IS_DIRECTED (MOVIE_ID, PARTICIPANT_ID)
VALUES 
(3, 3);
 
-- 19. genre
INSERT INTO GENRE (NAME)
VALUES 
		('Action'),
		('Drama'),
		('Romance');

-- 20. belongs_to
INSERT INTO BELONGS_TO (MOVIE_ID, GENRE_NAME)
VALUES 
		(1, 'Action'),
		(2, 'Drama'),
		(3, 'Romance');

-- 21. likes_movie
INSERT INTO LIKES_MOVIE (USER_ID, MOVIE_ID)
VALUES 
		(1, 1),
		(2, 2),
		(1, 3);

-- 22. likes_genre
INSERT INTO LIKES_GENRE (USER_ID, GENRE_NAME)
VALUES 
		(1, 'Action'),
		(2, 'Drama'),
		(2, 'Romance');

-- 23. actor_award
INSERT INTO ACTOR_AWARD (AWARD_ID, ACTOR_ID, ROLE, MOVIE)
VALUES
    (2, 1, 'Protagonist', 'Singin'' in the rain');
    
-- 24. director_award
INSERT INTO DIRECTOR_AWARD (AWARD_ID, DIRECTOR_ID, MOVIE)
VALUES
    (2, 3, 'Breaking bad');

-- 25. MOVIE_AWARD_IS_NOMINATED
INSERT INTO MOVIE_AWARD_IS_NOMINATED (AWARD_ID, MOVIE_ID)
VALUES
    (1, 3),
    (1, 2);
    
-- 26. distributor_payment_method
INSERT INTO DISTRIBUTOR_PAYMENT_METHOD
VALUES
  ('CJ CGV', 'Momo'),
  ('Galaxy Cinema', 'OCB');

-- 27.
INSERT INTO CINEMA_STREAMS
VALUES
	  ('CGV Bach Khoa', 1),
	  ('Galaxy Back Khoa', 1),
	  ('CGV Bach Khoa', 2);
	  
-- 28. 
INSERT INTO ACTOR_AWARD_IS_NOMINATED
VALUES
		(3, 2, 'Hermione Granger', 'Harry Potter and the Philosopher Stone'),
		(3, 5, 'Charlotte', 'Lost in Translation');
		
-- 29. 
INSERT INTO DIRECTOR_AWARD_IS_NOMINATED
VALUES
		(2, 3, 'Titanic'),
		(2, 4, 'Everything everywhere all at once');
		
-- 30.
ALTER TABLE DOCUMENTARY
    MODIFY PRIMARY_HISTORICAL_FIGURE VARCHAR(100),
    MODIFY PRIMARY_HISTORICAL_EVENT VARCHAR(100);
INSERT INTO DOCUMENTARY
VALUES
		(5, NULL, 'The Vietnam War'),
		(6, NULL, 'The Berlin Wall'),
		(7, 'Michael Jordan', NULL),
		(8, 'George Lazenby', NULL);
		
-- 31.
INSERT INTO EPISODE
VALUES
		(1, 1),
		(1, 2),
		(1, 3),
		(1, 4),
		(4, 1),
		(4, 2),
		(4, 3),
		(4, 4);
		
-- 32.
INSERT INTO EPISODE_CASTS
VALUES
		(1, 1, 1),
		(1, 1, 2),
		(4, 1, 5),
		(4, 1, 7),
		
		
-- 33.
INSERT INTO MAIN_TRAILER
VALUES
		('https://www.youtube.com/watch?v=J2eCrGU2OG8&list=RDJ2eCrGU2OG8&start_radio=1', 2.5, '2020-10-09', 1),
		('https://www.youtube.com/watch?v=gVVhHjyC04k&list=RDJ2eCrGU2OG8&index=6', 4, '2019-01-01', 2);

---------------------------------------------------- Tín ----------------------------------------------- 
INSERT INTO studio(name, founded_year)
VALUES ('20th Century Studios', 1935);

INSERT INTO movie (country, budget, title, description, mpa_rating, releases_year, studio_id)
VALUES ('USA', 50000000, 'Ice Age', 'About a group of mammals surviving the Pleistocene ice age.', 'PG-13', 2002, 1);

INSERT INTO "user" (
    email, hashed_password, displayed_name, house_number, street, district, city
)
VALUES (
    'tatrungtin2004@gmail.com',
    'abc',
    'tinta',
    '246',
    'Ly Thuong Kiet',
    'District 10',
    'Ho Chi Minh City'
);

INSERT INTO rates (user_id, movie_id, rate_point)
VALUES (1, 1, 8);

INSERT INTO CINEMATIC_MOVIE(movie_id, duration)
VALUES (1, 90);

INSERT INTO movie_distributor
VALUES ('CJ CGV', 2000, '0905251508');

INSERT INTO cinema("name", distributor_name, "location", number_of_rooms)
 VALUES ('CGV Bach Khoa', 'CJ CGV', 'HCM City', 10);
 
INSERT INTO showtime(cinema_name, time, room, number_of_tickets, movie_id)
VALUES ('CGV Bach Khoa', '2024-11-19 14:00:00+02:00', 12, 5000, 1);

-- Overlapping showtime.
INSERT INTO showtime(cinema_name, time, room, number_of_tickets, movie_id)
VALUES ('CGV Bach Khoa', '2024-11-19 15:00:00+02:00', 12, 5000, 1);       

---------------------------------------------------- Khánh ----------------------------------------------- 
INSERT INTO movie (country, budget, title, description, mpa_rating, releases_year, studio_id)
VALUES ('USA', 300, 'spiderman', 'superhero', '6', 2003, 1)

INSERT INTO studio (name, founded_year) 
VALUES ('DC', 2022);

INSERT INTO main_trailer ("LINK", duration, release_date, movie_id)
VALUES ('https://www.youtube.com/watch?v=t06RUxPbp_c',12, '2024-11-18', 3)

INSERT INTO participant (first_name, mid_name, last_name, nationality, dob) 
VALUES ('uchiha', '', 'itachi', 'Japan', '2000-12-12')

---------------------------------------------------- Khang ----------------------------------------------- 
-- Calulate Member ranking
INSERT INTO "user" (user_id, email, hashed_password, displayed_name, house_number, street, district, city)
VALUES
    (1,'tatrungtin2004@gmail.com', 'abc', 'tinta', '246', 'Ly Thuong Kiet', 'District 10', 'Ho Chi Minh City'),
    (2,'baotram2004@gmail.com', '123', 'tramdang', '357', 'Ngo Quyen', 'Dong Da', 'Ha Noi'),
    (3,'khang@example.com', 'noPass', 'KhangPham', '789', 'Hai Ba Trung', 'District 1', 'Ho Chi Minh City'),
    (4,'khanh@example.com', 'xyz', 'KhanhNguyen', '101', 'Dien Bien Phu', 'District 3', 'Ho Chi Minh City');

INSERT INTO movie (movie_id, country, budget, title, description, mpa_rating, released_year, studio_id)
VALUES
    (1,'United States', 200, 'Breaking Bad - Season 1', 
     'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.', 
     'R', 2008, 1),
    (2,'Germany', 500, 'Schindler''s List', 
     'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 
     'R', 1993, 2),
    (3,'England', 700, 'Singin'' in the Rain', 
     'A silent film star falls for a chorus girl when he and his jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.', 
     'G', 1952, 3),
    (4,'United States', 300, 'Breaking Bad - Season 2', 
     'Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them first.', 
     'R', 2009, 1),
    (5,'United Kingdom', 50, 'The Fog of War', 
     'An Academy Award-winning documentary examining the complex lessons from the U.S. involvement in Vietnam and Robert S. McNamara’s tenure as Secretary of Defense.', 
     'PG-13', 2003, 2),
    (6,'Germany', 40, 'The Berlin Wall: Escape to Freedom', 
     'A detailed documentary about the rise and fall of the Berlin Wall and the courageous attempts to escape from East to West Germany.', 
     'PG', 2012, 2),
    (7,'United States', 40, 'The Last Dance', 
     'A documentary chronicling Michael Jordan’s career and his final season with the Chicago Bulls.', 
     'R', 2020, 3),
    (8,'United Kingdom', 25, 'Becoming Bond', 
     'The story of George Lazenby, a car mechanic who became James Bond for one movie and walked away from fame.', 
     'R', 2017, 1);

INSERT INTO review (user_id, timestamp, movie_id, comment)
VALUES
    (1, '2024-01-01', 1, 'Amazing movie!'),
    (1, '2024-02-01', 2, 'Mind-blowing concepts!'),
    (1, '2024-03-01', 3, 'Lovely and artistic.'),
    (2, '2024-01-15', 4, 'Good, but confusing.'),
    (2, '2024-02-20', 1, 'Enjoyable but slow.'),
    (3, '2024-03-10', 2, 'Absolutely delightful!'),
    (3, '2024-03-15', 3, 'A masterpiece.');
    (4, '2024-03-15', 4, 'Dinh noc, kich tran, bay phap phoi.');

INSERT INTO likes_movie (user_id, movie_id)
VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 4), (2, 1), (2, 3), (2,4), (2,5), (2,6)
    (3, 2), (3, 3), (3, 4), 
    (4, 1);

INSERT INTO rates (user_id, movie_id, rate_point)
VALUES
    (1, 1, 5), (1, 2, 4), (1, 3, 5),
    (2, 4, 3), (2, 1, 4), (2, 2, 6)
    (3, 2, 5), 
    (4, 3, 5), (4, 4, 4);