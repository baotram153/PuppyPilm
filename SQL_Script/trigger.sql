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
CREATE TRIGGER update_movie_avg_rating_after_delete
AFTER DELETE ON rates
FOR EACH ROW
EXECUTE FUNCTION update_movie_avg_rating_after_delete();

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

------------------------------------ Number of episodes --------------------------------------
-- Description: number of episodes.
CREATE OR REPLACE FUNCTION update_number_of_episodes()
RETURN TRIGGER AS $$
BEGIN
  UPDATE tv_series;
END;
$$ language plpgsql;