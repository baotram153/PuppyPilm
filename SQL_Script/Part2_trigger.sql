------------------------------------ Update Average Ratings--------------------------------------

--- Description: Update the movie’s average rating when a rate is added
--- Description: Update the movie’s average rating when a rate is deleted.

-- Add column avg_rating
ALTER TABLE movie
ADD COLUMN avg_rating DECIMAL(4,2);

-- TRIGGER ON INSERT/UPDATE RATING
-- Trigger function
CREATE OR REPLACE FUNCTION update_movie_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate the new average rating
    UPDATE movie
    SET avg_rating = (
        SELECT AVG(rate_point)
        FROM rates
        WHERE movie_id = NEW.movie_id
    )
    WHERE movie_id = NEW.movie_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger definition
CREATE TRIGGER update_movie_avg_rating
AFTER INSERT OR UPDATE ON rates
FOR EACH ROW 
EXECUTE FUNCTION update_movie_avg_rating();

-- ON DELETE RATINGS
-- Trigger function
CREATE OR REPLACE FUNCTION update_movie_avg_rating_after_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate the new average rating
    UPDATE movie
    SET avg_rating = (
        SELECT AVG(rate_point)
        FROM rates
        WHERE movie_id = OLD.movie_id
    )
    WHERE movie_id = OLD.movie_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for DELETE
CREATE OR REPLACE TRIGGER update_movie_avg_rating_after_delete
AFTER DELETE ON rates
FOR EACH ROW
EXECUTE FUNCTION update_movie_avg_rating_after_delete();

--------- Test Trigger -------------------
-- CHECK avg_rating of a movie
SELECT * FROM movie;

-- Add a rate to see the update 
INSERT INTO RATES (USER_ID, MOVIE_ID, RATE_POINT)
VALUES (1, 1, 8);

------------------------------------ Check showtime overlapping --------------------------------------
-- Description: Check show time overlapping.
-- (ADDED TO UPDATE_REF)
CREATE OR REPLACE FUNCTION check_showtime_overlap()
RETURNS TRIGGER AS $$
DECLARE
    overlap_count INT;
    overlap_count_2 INT;
    movie_duration INT;
BEGIN
  SELECT COUNT(*) INTO overlap_count
  FROM showtime
  LEFT JOIN cinematic_movie ON showtime.movie_id = cinematic_movie.movie_id
  WHERE showtime.room = NEW.room
    AND showtime.cinema_name = NEW.cinema_name
    AND NEW.time BETWEEN showtime.time AND (showtime.time + INTERVAL '1 minute' * COALESCE(cinematic_movie.duration, 300));
    
  -- Get the duration of the NEW movie
  SELECT duration INTO movie_duration
  FROM cinematic_movie
  WHERE movie_id = NEW.movie_id;
  
  -- Check if any other movies exists during this movie showtime
  SELECT COUNT(*) INTO overlap_count_2
  FROM showtime
  WHERE room = NEW.room
    AND cinema_name = NEW.cinema_name
    AND time BETWEEN NEW.time AND (NEW.time + INTERVAL '1 minute' * COALESCE(movie_duration, 300));
    
  IF overlap_count > 0 THEN
      RAISE EXCEPTION 'Showtime overlaps with another movie in the same room.';
  END IF;
  
  IF overlap_count_2 > 0 THEN
      RAISE EXCEPTION 'Showtime overlaps with another movie in the same room.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_showtime_overlap
BEFORE INSERT OR UPDATE ON showtime
FOR EACH ROW 
EXECUTE FUNCTION check_showtime_overlap();

--------- Test Trigger -------------------
INSERT INTO MOVIE_DISTRIBUTOR
VALUES ('CJ CGV', 2000, '0905251508');

INSERT INTO CINEMA (NAME, DISTRIBUTOR_NAME, LOCATION, NUMBER_OF_ROOMS)
VALUES ('CGV Bach Khoa', 'CJ CGV', 'HCM City', 10);

insert into cinematic_movie(MOVIE_ID, duration)
VALUES (2, 120);

-- Firstly, insert a showtime
INSERT INTO SHOWTIME (CINEMA_NAME, "time", ROOM, NUMBER_OF_TICKETS, MOVIE_ID)
VALUES ('CGV Bach Khoa', '2024-11-19 14:00:00+00:00', 12, 5000, 2);

-- Insert another showtime that overlap
INSERT INTO SHOWTIME (CINEMA_NAME, "time", ROOM, NUMBER_OF_TICKETS, MOVIE_ID)
VALUES ('CGV Bach Khoa', '2024-11-19 15:00:00+00:00', 12, 5000, 2);

--Insert another showtime that also overlap
INSERT INTO SHOWTIME (CINEMA_NAME, "time", ROOM, NUMBER_OF_TICKETS, MOVIE_ID)
VALUES ('CGV Bach Khoa', '2024-11-19 13:00:00+00:00', 12, 5000, 2);

------------------------------------ Room number --------------------------------------
-- Description: Room number of a showtime must not be greater than the number of rooms of its corresponding cinema.
-- (ADDED TO UPDATE_REF)
CREATE OR REPLACE FUNCTION check_room_number()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if room number is greater than the number of rooms in the corresponding cinema
    IF NEW.room > (SELECT number_of_rooms FROM cinema WHERE cinema.name = NEW.cinema_name) THEN
        RAISE EXCEPTION 'Room number exceeds the number of rooms in the cinema';
    ELSIF NEW.room <= 0 THEN
        RAISE EXCEPTION 'Room number must be larger than 0.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce room number constraint on insert and update
CREATE OR REPLACE TRIGGER check_room_number
BEFORE INSERT OR UPDATE ON showtime
FOR EACH ROW
EXECUTE FUNCTION check_room_number();

--------- Test Trigger -------------------
-- Check the number of rooms
SELECT * FROM cinema;

-- Insert a showtime that excess the number of rooms.
INSERT INTO SHOWTIME (CINEMA_NAME, "time", ROOM, NUMBER_OF_TICKETS, MOVIE_ID)
VALUES ('CGV Bach Khoa', '2024-11-19 15:00:00+00:00', 12, 5000, 2);

------------------------------------ Number of episodes --------------------------------------
-- Description: number of episodes.
-- TRIGGER WHEN ADDING an episode 
CREATE OR REPLACE FUNCTION update_number_of_episodes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tv_series
  SET number_of_episodes = (
    SELECT COUNT (*)
    FROM episode
    WHERE movie_id = NEW.movie_id
  )
  WHERE movie_id = NEW.movie_id;

  RETURN NEW;
END;
$$ language plpgsql;

CREATE OR REPLACE TRIGGER  update_number_of_episodes
AFTER INSERT OR UPDATE ON episode 
FOR EACH ROW 
EXECUTE FUNCTION update_number_of_episodes();


-- TRIGGER WHEN REMOVING an episode
CREATE OR REPLACE FUNCTION update_number_of_episodes_after_deleting()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tv_series
  SET number_of_episodes = (
    SELECT COUNT (*)
    FROM episode
    WHERE movie_id = OLD.movie_id
  )
  WHERE movie_id = OLD.movie_id;

  RETURN NEW;
END;
$$ language plpgsql;

CREATE OR REPLACE TRIGGER  update_number_of_episodes_after_deleting
AFTER DELETE ON episode 
FOR EACH ROW 
EXECUTE FUNCTION update_number_of_episodes();

--------- Test Trigger -------------------
SELECT * FROM tv_series;
-- Add a tv_se
INSERT INTO tv_series(movie_id, season_number, streaming_media)
VALUES (2, 1, 'HBO');
-- Add a episode
INSERT INTO EPISODE(movie_id, episode_number)
VALUES (2,2);

------------------------ Disjoint in cinematic_movie, documentary --------------------------------------
-- Trigger to ensure disjoint in cinematic_movie, documentary
-- Create or replace function for documentary
CREATE OR REPLACE FUNCTION enforce_disjoint_before_inserting_into_documentary()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the movie_id exists in tv_series
    IF EXISTS (SELECT 1 FROM tv_series WHERE tv_series.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in TV_SERIES subclass';
    
    -- Check if the movie_id exists in cinematic_movie
    ELSIF EXISTS (SELECT 1 FROM cinematic_movie WHERE cinematic_movie.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in CINEMATIC_MOVIE subclass';
    END IF;
    
    -- Return the new row to continue the insert
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for documentary
CREATE OR REPLACE TRIGGER enforce_disjoint_before_inserting_into_documentary
BEFORE INSERT OR UPDATE ON documentary
FOR EACH ROW
EXECUTE FUNCTION enforce_disjoint_before_inserting_into_documentary();


-- Create or replace function for tv_series
CREATE OR REPLACE FUNCTION enforce_disjoint_before_inserting_into_tv_series()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the movie_id exists in documentary
    IF EXISTS (SELECT 1 FROM documentary WHERE documentary.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in DOCUMENTARY subclass';
    
    -- Check if the movie_id exists in cinematic_movie
    ELSIF EXISTS (SELECT 1 FROM cinematic_movie WHERE cinematic_movie.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in CINEMATIC_MOVIE subclass';
    END IF;
    
    -- Return the new row to continue the insert
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for tv_series
CREATE OR REPLACE TRIGGER enforce_disjoint_before_inserting_into_tv_series
BEFORE INSERT OR UPDATE ON tv_series
FOR EACH ROW
EXECUTE FUNCTION enforce_disjoint_before_inserting_into_tv_series();


-- Create or replace function for cinematic_movie
CREATE OR REPLACE FUNCTION enforce_disjoint_before_inserting_into_cinematic_movie()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the movie_id exists in documentary
    IF EXISTS (SELECT 1 FROM documentary WHERE documentary.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in DOCUMENTARY subclass';
    
    -- Check if the movie_id exists in tv_series
    ELSIF EXISTS (SELECT 1 FROM tv_series WHERE tv_series.movie_id = NEW.movie_id) THEN
        RAISE EXCEPTION 'Movie already in TV_SERIES subclass';
    END IF;
    
    -- Return the new row to continue the insert
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for cinematic_movie
CREATE OR REPLACE TRIGGER enforce_disjoint_before_inserting_into_cinematic_movie
BEFORE INSERT OR UPDATE ON cinematic_movie
FOR EACH ROW
EXECUTE FUNCTION enforce_disjoint_before_inserting_into_cinematic_movie();
--------- Test Trigger -------------------
insert into documentary(MOVIE_ID)
VALUES (3);

insert into cinematic_movie(MOVIE_ID, duration)
VALUES (3, 120);

------------------------ Review before rating --------------------------------------
CREATE OR REPLACE FUNCTION ensure_review_before_rating()
RETURNS TRIGGER AS $$
BEGIN 
  IF NOT EXISTS (
    SELECT 1 
    FROM review
    WHERE review.movie_id = NEW.movie_id
    AND review.user_id = NEW.user_id
  ) THEN 
    RAISE EXCEPTION 'User must review before rating a movie.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER ensure_review_before_rating
BEFORE INSERT OR UPDATE ON rates
FOR EACH ROW
EXECUTE FUNCTION ensure_review_before_rating();

------------------------ Some testdata --------------------------------------
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