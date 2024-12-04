--Thủ tục get_movies_by_conditions(refcursor cursor, varchar title, int age, int release_year, int rating, varchar country)

CREATE OR REPLACE PROCEDURE get_movies_by_conditions(
    OUT result_cursor REFCURSOR,
    IN in_title VARCHAR DEFAULT NULL,
    IN in_age INT DEFAULT NULL,
    IN in_rating INT DEFAULT NULL,
    IN in_released_year INT DEFAULT NULL,
    IN in_country_name VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
    OPEN result_cursor FOR
        SELECT 
            movie.movie_id,
            title, 
            country, 
            budget, 
            released_year, 
            mpa_rating, 
            description, 
            "link" AS link_trailer, 
            studio.name AS studio, 
            AVG(rate_point) AS average_rate,
            ARRAY_AGG(DISTINCT BELONGS_TO.genre_name) AS genres
            -- BELONGS_TO.genre_name AS genres
        FROM 
            movie
        LEFT JOIN 
            studio ON movie.studio_id = studio.studio_id
        LEFT JOIN 
            main_trailer ON movie.movie_id = main_trailer.movie_id
        LEFT JOIN 
            rates ON movie.movie_id = rates.movie_id  
        LEFT JOIN 
            BELONGS_TO ON movie.movie_id = BELONGS_TO.movie_id
        WHERE
            (in_title IS NULL OR movie.title ILIKE '%' || in_title || '%')
            AND (in_released_year IS NULL OR movie.released_year = in_released_year)
            AND (in_country_name IS NULL OR movie.country = in_country_name)
            AND (in_age IS NULL OR
                CASE 
                    WHEN movie.mpa_rating = 'G' THEN 0
                    WHEN movie.mpa_rating = 'PG' THEN 7
                    WHEN movie.mpa_rating = 'PG-13' THEN 13
                    WHEN movie.mpa_rating = 'R' THEN 18
                    WHEN movie.mpa_rating = 'NC-17' THEN 18
                    ELSE 0
                END <= in_age)
        GROUP BY 
            movie.movie_id, title, country, budget, released_year, mpa_rating, description, link_trailer, studio.name
        HAVING in_rating IS NULL OR AVG(COALESCE(rate_point, 0)) >= in_rating
        ORDER BY title;
END;
$$;


DO $$
DECLARE
    result_cursor REFCURSOR;
    movie_record RECORD;
BEGIN
    -- Gọi thủ tục
    CALL get_movies_by_conditions(result_cursor, NULL, NULL, 0, NULL, NULL);
    
    -- Duyệt  qua các dòng dữ liệu trong con trỏ và hiển thị kết quả
    CREATE TEMP TABLE temp_result (movie_id VARCHAR,title VARCHAR, country VARCHAR, budget NUMERIC, released_year INT, mpa_rating VARCHAR, description TEXT, link_trailer TEXT, studio VARCHAR, average_rate NUMERIC, genres VARCHAR[]);
    
    LOOP
        FETCH NEXT FROM result_cursor INTO movie_record;
        EXIT WHEN NOT FOUND;
        INSERT INTO temp_result VALUES (movie_record.movie_id ,movie_record.title, movie_record.country, movie_record.budget, movie_record.released_year, movie_record.mpa_rating, movie_record.description, movie_record.link_trailer, movie_record.studio, movie_record.average_rate, movie_record.genres);
    END LOOP;

    -- Đóng con trỏ
    CLOSE result_cursor;

END $$;

-- TRuy vấn kết quả
SELECT * FROM temp_result;
-- Xóa procedure get_movies_by_conditions
DROP PROCEDURE get_movies_by_conditions;
-- Xóa bảng truy vấn tạm thời
DROP TABLE IF EXISTS temp_result;

-- Tạo kiểu dữ liệu mới
CREATE TYPE movie_type AS (
    movie_id INT,
    title VARCHAR,
    country VARCHAR,
    budget NUMERIC,
    released_year INT,
    mpa_rating VARCHAR,
    description TEXT,
    link_trailer VARCHAR,
    studio VARCHAR,
    average_rate NUMERIC,
    genres TEXT[]
);

-- function gọi procedure
CREATE OR REPLACE FUNCTION call_get_movies_by_conditions(
    in_title VARCHAR DEFAULT NULL,
    in_age INT DEFAULT NULL,
    in_rating INT DEFAULT NULL,
    in_released_year INT DEFAULT NULL,
    in_country_name VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    movie_id INT,
    title VARCHAR,
    country VARCHAR,
    budget NUMERIC,
    released_year INT,
    mpa_rating VARCHAR,
    description TEXT,
    link_trailer VARCHAR,
    studio VARCHAR,
    average_rate NUMERIC,
    genres TEXT[]
)
LANGUAGE plpgsql
AS $$ 
DECLARE
    result_cursor REFCURSOR;
    movie_record movie_type;
BEGIN
    -- Gọi thủ tục để mở con trỏ
    CALL get_movies_by_conditions(result_cursor, in_title, in_age, in_rating, in_released_year, in_country_name);

    -- Duyệt qua các bản ghi từ con trỏ và trả về từng bản ghi
    LOOP
        FETCH NEXT FROM result_cursor INTO movie_record;
        EXIT WHEN NOT FOUND;
        RETURN QUERY SELECT movie_record.*;
    END LOOP;

    -- Đóng con trỏ khi hoàn thành
    CLOSE result_cursor;
    RETURN;
END;
$$;


-- Gọi hàm để kiểm tra kết quả
SELECT * 
FROM call_get_movies_by_conditions(NULL, 10);


--Thêm dữ liệu để cô xem
INSERT INTO studio ("name", founded_year)
VALUES
    ('Warner Bros', 1923),
    ('Universal Pictures', 1912),
    ('Pixar Animation Studios', 1986),
    ('Marvel Studios', 1993),
    ('Paramount Pictures', 1912),
    ('Sony Pictures', 1987);

INSERT INTO movie (title, country, budget, released_year, mpa_rating, description, studio_id)
VALUES
    ('Inception', 'USA', 160000000, 2010, 'PG-13', 'A mind-bending thriller.', 1),
    ('The Dark Knight', 'USA', 185000000, 2008, 'PG-13', 'A tale of Batman and Joker.', 1),
    ('Finding Nemo', 'USA', 94000000, 2003, 'G', 'A story of a lost fish.', 3),
    ('Iron Man', 'USA', 140000000, 2008, 'PG-13', 'The origin of Iron Man.', 4),
    ('The Avengers', 'USA', 220000000, 2012, 'PG-13', 'Earths mightiest heroes.', 4),
    ('Spider-Man', 'USA', 139000000, 2002, 'PG-13', 'A boy becomes a superhero.', 6);
    
    
    

--Thủ tục get_reviews_by_movie_id
-- Tạo PROCEDURE get_users_reviews_by_movie_id(cursor reviews_cursor, cursor users_cursor, int movie_id, int in_number_reviews)
CREATE OR REPLACE PROCEDURE get_users_reviews_by_movie_id(
    OUT reviews_cursor REFCURSOR,
    OUT users_cursor REFCURSOR,
    IN in_movie_id INT, 
    IN in_number_reviews INT DEFAULT NULL 
)
LANGUAGE plpgsql 
AS $$
BEGIN 
    -- Mở con trỏ reviews_cursor
    OPEN reviews_cursor FOR
      SELECT 
        u.displayed_name, 
        r."comment", 
        r."timestamp" as timestamp
      FROM "USER" as u
      INNER JOIN review as r ON u.user_id = r.user_id
      WHERE r.movie_id = in_movie_id
      ORDER BY u.displayed_name, r."timestamp";

    -- Mở con trỏ users_cursor
    OPEN users_cursor FOR
      SELECT 
        u.displayed_name,
        COUNT(*) as number_reviews
      FROM "USER" as u
      INNER JOIN review as r ON u.user_id = r.user_id
      WHERE r.movie_id = in_movie_id
      GROUP BY u.displayed_name
      HAVING COUNT(*) >= COALESCE(in_number_reviews, 0);

END;
$$;

-- Xóa thủ tục
DROP PROCEDURE get_users_reviews_by_movie_id;

DO $$
DECLARE
    reviews_cursor REFCURSOR;
    users_cursor REFCURSOR;
    review_record RECORD;
    user_record RECORD;
BEGIN
    -- Gọi thủ tục
    CALL get_users_reviews_by_movie_id(reviews_cursor, users_cursor, 1, 0);

    -- Tạo bảng tạm thời để lưu trữ kết quả từ reviews_cursor
    CREATE TEMP TABLE temp_reviews (
        displayed_name VARCHAR,
        comment TEXT,
        timestamp TIMESTAMP
    );

    -- Duyệt qua các dòng dữ liệu từ reviews_cursor và chèn vào temp_reviews
    LOOP
        FETCH NEXT FROM reviews_cursor INTO review_record;
        EXIT WHEN NOT FOUND;
        INSERT INTO temp_reviews (displayed_name, comment, timestamp)
        VALUES (review_record.displayed_name, review_record."comment", review_record.timestamp);
    END LOOP;

    -- Tạo bảng tạm thời để lưu trữ kết quả từ users_cursor
    CREATE TEMP TABLE temp_users (
        displayed_name VARCHAR,
        number_reviews INT
    );

    -- Duyệt qua các dòng dữ liệu từ users_cursor và chèn vào temp_users
    LOOP
        FETCH NEXT FROM users_cursor INTO user_record;
        EXIT WHEN NOT FOUND;
        INSERT INTO temp_users (displayed_name, number_reviews)
        VALUES (user_record.displayed_name, user_record.number_reviews);
    END LOOP;

    -- Đóng con trỏ
    CLOSE reviews_cursor;
    CLOSE users_cursor;
END $$;

-- Xóa các bảng tạm thời
DROP TABLE temp_reviews;
DROP TABLE temp_users;

-- Hiển thị kết quả từ temp_users, temp_reviews 
SELECT displayed_name, comment, timestamp FROM temp_reviews;
SELECT displayed_name, number_reviews FROM temp_users;
--test
INSERT INTO review (user_id, movie_id, "comment", "timestamp")
VALUES
    (1, 1, 'Amazing movie!', '2024-11-01 10:30:00'),
    (1, 1, 'Great cinematography.', '2024-11-02 11:00:00'),
    (2, 1, 'Interesting plot.', '2024-11-01 12:00:00'),
    (2, 2, 'Loved the action scenes!', '2024-11-03 15:45:00'),
    (3, 1, 'A bit slow, but good.', '2024-11-04 09:20:00'),
    (3, 3, 'Too long for my taste.', '2024-11-05 14:10:00'),
    (4, 2, 'Incredible performance!', '2024-11-06 17:30:00'),
    (4, 1, 'Classic masterpiece.', '2024-11-07 19:45:00');



--Thủ tục get_top_actors
-- Tạo PROCEDURE get_top_actors(cursor actor_cursor, int number_actors)
CREATE OR REPLACE procedure get_top_actors(
    OUT actor_cursor REFCURSOR,
    IN number_actors INT DEFAULT 0
)

language plpgsql
AS $$
BEGIN 
  OPEN actor_cursor FOR 
    SELECT 
      actor.participant_id AS participant_id, 
      participant.firstname || ' ' || participant.middlename || ' ' || participant.lastname AS "name",
      COUNT(award_id) AS number_awards
    FROM 
      actor
    LEFT JOIN 
      actor_award ON actor.participant_id = actor_award.actor_id
    LEFT JOIN 
      participant ON actor.participant_id = participant.participant_id
    GROUP BY actor.participant_id, participant.firstname || ' ' || participant.middlename || ' ' || participant.lastname
    ORDER BY COUNT(award_id) DESC
    LIMIT COALESCE(number_actors, 10);
END; 
$$;

DO $$ 
DECLARE 
  result_cursor REFCURSOR;
  actor_record RECORD;
BEGIN 
  CREATE TEMP TABLE temp_result (participant_id INT, name VARCHAR, number_awards INT);
  CALL get_top_actors(result_cursor, 3);
  
  LOOP 
    FETCH NEXT FROM result_cursor INTO actor_record;
    EXIT WHEN NOT FOUND;
    INSERT INTO temp_result VALUES(actor_record.participant_id, actor_record.name, actor_record.number_awards);
  END LOOP;
  
  --Đóng con trỏ
  CLOSE result_cursor;
  
END $$;

-- Truy vấn kết quả
SELECT * FROM temp_result;

DROP PROCEDURE get_top_actors;

DROP TABLE IF exists temp_result;

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
INSERT INTO actor_award (award_id, actor_id, role, movie)
VALUES
    (1, 5, 'Protagonist', 'Crying'' in the rain'),
    (2, 1, 'Protagonist', 'Singin'' in the rain'),
    (2, 1, 'Protagonist', 'Singin'' in the rain');