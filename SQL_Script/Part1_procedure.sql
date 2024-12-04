-------------------------------------------------------------------- Insert Procedure --------------------------------------------------------------
CREATE OR REPLACE PROCEDURE insert_movie(
    p_title TEXT,
    p_country TEXT,
    p_budget NUMERIC,
    p_mpa_rating TEXT,
    p_description TEXT,
    p_released_year INTEGER,
    p_studio_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
		-- Check if duplicate
		
    -- Validate title
    IF p_title IS NULL OR LENGTH(TRIM(p_title)) = 0 THEN
        RAISE EXCEPTION 'Movie title cannot be empty';
    END IF;

    -- Validate country
    IF p_country IS NULL OR LENGTH(TRIM(p_country)) = 0 THEN
        RAISE EXCEPTION 'Country cannot be empty';
    END IF;

    -- Validate budget
    IF p_budget IS NULL THEN
        RAISE EXCEPTION 'Budget must be provided and cannot be NULL';
    ELSIF p_budget < 0 THEN
        RAISE EXCEPTION 'Budget must be a positive number';
    END IF;

    -- Validate MPA rating
    IF p_mpa_rating NOT IN ('G', 'PG', 'PG-13', 'R', 'NC-17') THEN
        RAISE EXCEPTION 'Invalid MPA rating';
    END IF;
    
    -- Validate review
    IF p_description IS NULL OR LENGTH(TRIM(p_description)) = 0 THEN
        RAISE EXCEPTION 'Movie description cannot be empty';
    END IF;

    -- Validate released year
    IF p_released_year IS NULL THEN
        RAISE EXCEPTION 'Released year cannot be empty';
    ELSIF p_released_year < 1888 THEN
        RAISE EXCEPTION 'Invalid released year. Realeased year must be greater than or equal to 1888';
    END IF;

    -- Validate studio ID
    IF p_studio_id IS NULL OR p_studio_id <= 0 THEN
        RAISE EXCEPTION 'Studio ID must be a valid positive integer';
	    ELSIF NOT EXISTS (
        SELECT 1 FROM studio WHERE studio_id = p_studio_id
    ) THEN
        RAISE EXCEPTION 'Studio with ID % does not exist', p_studio_id;
    END IF;

    -- Insert into the movies table
    INSERT INTO movie (title, country, budget, mpa_rating, description, released_year, studio_id)
    VALUES (p_title, p_country, p_budget, p_mpa_rating, p_description, p_released_year, p_studio_id);

    RAISE NOTICE 'Movie % inserted successfully', p_title;
END;
$$;

-------------------------------------------------------------------- Update Procedure --------------------------------------------------------------

CREATE OR REPLACE PROCEDURE update_movie(
		p_id INTEGER,
    p_title TEXT,
    p_country TEXT,
    p_budget NUMERIC,
    p_mpa_rating TEXT,
    p_description TEXT,
    p_released_year INTEGER,
    p_studio_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
		-- Validate movie ID exists
		IF NOT EXISTS (
				SELECT 1 FROM movie where movie_id = p_id
		) THEN
				RAISE EXCEPTION 'ID of movie does not exist';
		END IF;
				
    -- Validate title
    IF p_title IS NOT NULL AND LENGTH(TRIM(p_title)) != 0 THEN
      UPDATE movie
        SET
            title = p_title
      WHERE movie_id = p_id;
    END IF;

    -- Validate country
    IF p_country IS NOT NULL AND LENGTH(TRIM(p_country)) != 0 THEN
        UPDATE movie
          SET
              country = p_country
        WHERE movie_id = p_id;
    END IF;

    -- Validate budget
    IF p_budget IS NOT NULL THEN
        IF p_budget < 0 THEN
            RAISE EXCEPTION 'Budget must be a positive number';
        ELSE
            UPDATE movie
              SET
                  budget = p_budget
            WHERE movie_id = p_id;
        END IF;
    END IF;

    -- Validate MPA rating
    IF p_mpa_rating IS NOT NULL AND LENGTH(TRIM(p_mpa_rating)) != 0 THEN
        IF p_mpa_rating NOT IN ('G', 'PG', 'PG-13', 'R', 'NC-17') THEN
            RAISE EXCEPTION 'Invalid MPA rating';
        ELSE 
          UPDATE movie
            SET
                mpa_rating = p_mpa_rating
          WHERE movie_id = p_id;
        END IF;
    END IF;
    
    -- Validate review
    IF p_description IS NOT NULL AND LENGTH(TRIM(p_description)) != 0 THEN
        UPDATE movie
          SET
              description = p_description
        WHERE movie_id = p_id;
    END IF;

    -- Validate released year
    IF p_released_year IS NOT NULL THEN
        IF p_released_year < 1888 THEN
            RAISE EXCEPTION 'Invalid released year. Realeased year must be greater than or equal to 1888';
        ELSE
            UPDATE movie
              SET
                  released_year = p_released_year
            WHERE movie_id = p_id;
        END IF;
    END IF;

    -- Validate studio ID
    IF p_studio_id IS NOT NULL THEN
        IF p_studio_id <= 0 THEN
            RAISE EXCEPTION 'Studio ID must be a valid positive integer';
        ELSIF NOT EXISTS (
            SELECT 1 FROM studio WHERE studio_id = p_studio_id
        ) THEN
            RAISE EXCEPTION 'Studio with ID % does not exist', p_studio_id;
        ELSE 
        UPDATE movie
          SET
              studio_id = p_studio_id
        WHERE movie_id = p_id;
        END IF;
    END IF;

    RAISE NOTICE 'Movie with ID % updated successfully', p_id;
END;
$$;

-------------------------------------------------------------------- Delete Procedure --------------------------------------------------------------
CREATE OR REPLACE PROCEDURE delete_movie(p_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Validate movie ID exists
    IF p_id IS NULL THEN
		    RAISE EXCEPTION 'Movie ID must not be empty';
		END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM movie WHERE movie_id = p_id
    ) THEN
        RAISE EXCEPTION 'Movie with ID % does not exist', p_id;
    END IF;
    
    -- Delete the movie record from the movie table
    DELETE FROM movie WHERE movie_id = p_id;

    RAISE NOTICE 'Movie with ID % deleted successfully', p_id;
END;
$$;

-- select * from movie;
CALL delete_movie(5);