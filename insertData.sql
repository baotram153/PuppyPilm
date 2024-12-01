INSERT INTO studio ("name", founded_year)
VALUES
    ('Universal Pictures', 1912),
    ('Paramount Pictures', 1912),
    ('Warner Bros', 1923);

INSERT INTO movie (country, budget, title, description, mpa_rating, released_year, studio_id)
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

INSERT INTO remakes
VALUES 
    (1, 2);

INSERT INTO cinematic_movie
VALUES 
    (2, 180),
    (3, 120);

INSERT INTO tv_series
VALUES 
    (1, 8, 1, 'HBO'),
    (4, 10, 2, 'HBO');

INSERT INTO "USER" (email, hashed_password, displayed_name, house_number, street, district, city)
VALUES 
    ('tatrungtin2004@gmail.com', 'abc', 'tinta', '246', 'Ly Thuong Kiet', 'District 10', 'Ho Chi Minh City'),
    ('baotram2004@gmail.com', '123', 'tramdang', '357', 'Ngo Quyen', 'Dong Da', 'Ha Noi'),
    ('nhatkhang2004@gmail.com', 'cdf', 'khang', '113', 'Hai Ba Trung', 'Dong Da', 'Ha Noi'),
    ('minhkhanh2004@gmail.com', 'xyz', 'khanh', '114', 'Ba Huyen Thanh Quan', 'Binh Thanh', 'Ho Chi Minh City');

INSERT INTO rates (user_id, movie_id, rate_point)
VALUES 
    (1, 1, 8);

INSERT INTO movie_distributor
VALUES 
    ('CJ CGV', 2000, '0905251508');

INSERT INTO cinema ("name", distributor_name, "location", number_of_rooms)
VALUES 
    ('CGV Bach Khoa', 'CJ CGV', 'HCM City', 10);

INSERT INTO showtime (cinema_name, "time", room, number_of_tickets, movie_id)
VALUES 
    ('CGV Bach Khoa', '2024-11-19 14:00:00+02:00', 12, 5000, 1);

INSERT INTO studio_founder (studio_id, founder_name)
VALUES
    (1, 'Steven Spielberg'),
    (2, 'George Lucas'),
    (3, 'Christopher Nolan');

INSERT INTO award (award_id, name, year, institution)
VALUES
    (1, 'Best Picture', 2024, 'Academy Awards'),
    (2, 'Best Director', 2023, 'Golden Globes'),
    (3, 'Best Actor', 2022, 'Cannes Film Festival');

INSERT INTO movie_award (award_id, movie_id)
VALUES
    (1, 2);
    
INSERT INTO participant (participant_id, firstname, middlename, lastname, nationality, dob)
VALUES 
		(1, 'Margot', 'Elise', 'Robbie', 'Australian', '1990-07-02'),
		(2, 'Emma', 'Charlotte', 'Watson', 'British', '1990-04-15'),
		(3, 'Leonardo', 'Wilhelm', 'DiCaprio', 'American', '1974-11-11'),
		(4, 'Chris', 'Robert', 'Evans', 'American', '1981-06-13'),
		(5, 'Scarlett', 'Ingrid', 'Johansson', 'American', '1984-11-22'),
		(6, 'Daniel', 'Jacob', 'Radcliffe', 'British', '1989-07-23'),
		(7, 'Jennifer', 'Shrader', 'Lawrence', 'American', '1990-08-15'),
		(8, 'Tom', 'Andrew', 'Holland', 'British', '1996-06-01');
		
INSERT INTO actor (participant_id)
VALUES 
		(1),
		(2),
		(5),
		(6),
		(7);

INSERT INTO director (participant_id)
VALUES 
		(3),
		(4),
		(8);

INSERT INTO movie_casts (movie_id, participant_id, role)
VALUES 
		(1, 1, 'Thomas'),
		(2, 2, 'Helene');

INSERT INTO is_directed (movie_id, participant_id)
VALUES 
(3, 3);
 
INSERT INTO genre (name)
VALUES 
		('Action'),
		('Drama'),
		('Romance');

INSERT INTO belongs_to (movie_id, genre_name)
VALUES 
		(1, 'Action'),
		(2, 'Drama'),
		(3, 'Romance');

INSERT INTO likes_movie (user_id, movie_id)
VALUES 
		(1, 1),
		(2, 2),
		(1, 3);

INSERT INTO likes_genre (user_id, genre_name)
VALUES 
		(1, 'Action'),
		(2, 'Drama'),
		(2, 'Romance');

INSERT INTO actor_award (award_id, actor_id, role, movie)
VALUES
    (2, 1, 'Protagonist', 'Singin'' in the rain');
    
INSERT INTO director_award (award_id, director_id, movie)
VALUES
    (2, 3, 'Breaking bad');

INSERT INTO movie_award_is_nominated (award_id, movie_id)
VALUES
    (1, 3),
    (1, 2);
    
INSERT INTO movie_distributor
VALUES
  ('Galaxy Cinema', 1996, '0901292933');

INSERT INTO distributor_payment_method
VALUES
  ('CJ CGV', 'Momo'),
  ('Galaxy Cinema', 'OCB');

INSERT INTO cinema_streams
VALUES
	  ('CGV Bach Khoa', 1),
	  ('Galaxy Back Khoa', 1),
	  ('CGV Bach Khoa', 2);

INSERT INTO actor_award_is_nominated
VALUES
		(2, 1, 'Hermione Granger', 'Harry Potter and the Philosopher Stone'),
		(2, 2, 'Charlotte', 'Lost in Translation');
		
INSERT INTO director_award_is_nominated
VALUES
		(2, 3, 'Titanic'),
		(2, 4, 'Everything everywhere all at once');
		
ALTER TABLE documentary
    ALTER COLUMN primary_historical_figure TYPE VARCHAR(100),
    ALTER COLUMN primary_historical_event TYPE VARCHAR(100);

INSERT INTO documentary
VALUES
		(5, NULL, 'The Vietnam War'),
		(6, NULL, 'The Berlin Wall'),
		(7, 'Michael Jordan', NULL),
		(8, 'George Lazenby', NULL);
		
INSERT INTO episode
VALUES
		(1, 1),
		(1, 2),
		(1, 3),
		(1, 4),
		(4, 1),
		(4, 2),
		(4, 3),
		(4, 4);
		
INSERT INTO episode_casts
VALUES
		(1, 1, 1),
		(1, 1, 2),
		(4, 1, 5),
		(4, 1, 7);
		
INSERT INTO main_trailer
VALUES
		('https://www.youtube.com/watch?v=J2eCrGU2OG8&list=RDJ2eCrGU2OG8&start_radio=1', 2.5, '2020-10-09', 1),
		('https://www.youtube.com/watch?v=gVVhHjyC04k&list=RDJ2eCrGU2OG8&index=1', 2, '2020-10-09', 1);
