-- 1. Thủ tục get_movies_by_conditions(refcursor cursor, varchar title, int age, int release_year, int rating, varchar country)
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
            "LINK" AS link_trailer, 
            studio.name AS studio, 
            AVG(rate_point) AS average_rate
            
        FROM 
            movie
        LEFT JOIN 
            studio ON movie.studio_id = studio.studio_id
        LEFT JOIN 
            main_trailer ON movie.movie_id = main_trailer.movie_id
        LEFT JOIN 
            rates ON movie.movie_id = rates.movie_id  
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
        HAVING AVG(COALESCE(rate_point, 0)) >= in_rating
        ORDER BY title;
END;
$$;


DO $$
DECLARE
    result_cursor REFCURSOR;
    movie_record RECORD;
BEGIN
    -- Gọi thủ tục
    CALL get_movies_by_conditions(result_cursor, NULL, NULL, 1, NULL, NULL);
    
    -- Duyệt qua các dòng dữ liệu trong con trỏ và hiển thị kết quả
    CREATE TEMP TABLE temp_result (title VARCHAR, country VARCHAR, budget NUMERIC, released_year INT, mpa_rating VARCHAR, description TEXT, link_trailer TEXT, studio VARCHAR, average_rate NUMERIC);
    
    LOOP
        FETCH NEXT FROM result_cursor INTO movie_record;
        EXIT WHEN NOT FOUND;
        INSERT INTO temp_result VALUES (movie_record.title, movie_record.country, movie_record.budget, movie_record.released_year, movie_record.mpa_rating, movie_record.description, movie_record.link_trailer, movie_record.studio, movie_record.average_rate);
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

-------------------------------------------------- 2. Thủ tục get_reviews_by_movie_id -----------------------------------------------
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
        r."COMMENT", 
        r."TIMESTAMP" as timestamp
      FROM "user" as u
      INNER JOIN review as r ON u.user_id = r.user_id
      WHERE r.movie_id = in_movie_id
      ORDER BY u.displayed_name, r."TIMESTAMP";

    -- Mở con trỏ users_cursor
    OPEN users_cursor FOR
      SELECT 
        u.displayed_name,
        COUNT(*) as number_reviews
      FROM "user" as u
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
        VALUES (review_record.displayed_name, review_record."COMMENT", review_record.timestamp);
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
