-------------------------------- Calculate point and member ranking ----------------------------------
---------------------------based on number of review, rate and like actions------------------------------
CREATE OR REPLACE FUNCTION calculate_points(bronzePoint INT, silverPoint INT, goldPoint INT)
RETURNS TABLE(
  User_id INT, 
  Displayed_name TEXT, 
  Total_reviews INT, 
  Total_ratings INT, 
  Total_likes INT, 
  Points INT,
  Member_ranking TEXT) AS $$

DECLARE
    user_record RECORD; -- To hold each user during the loop
    total_reviews_var INT;
    total_ratings_var INT;
    total_likes_var INT;
    points_var INT;
    ranking_var TEXT;
BEGIN
    -- Validate input
    IF bronzePoint < 0 OR silverPoint < 0 OR goldPoint < 0 THEN
        RAISE EXCEPTION 'Input is invalid! The points must be positive! 
                        Your input is: (bronze - % pt), (silver - % pt), (gold - % pt)', 
                        bronzePoint, silverPoint, goldPoint;
    END IF;
    IF NOT (bronzePoint < silverPoint AND silverPoint < goldPoint) THEN
        RAISE EXCEPTION 'Input is invalid! The points must followed the rule: 
                          bronzePoint < silverPoint < goldPoint.
                          Your input is: (bronze - % pt), (silver - % pt), (gold - % pt)',
                          bronzePoint, silverPoint, goldPoint;
    END IF;

    -- Loop through all users
    FOR user_record IN SELECT U.user_id, U.displayed_name FROM "USER" U LOOP
        -- Get the total activity counts for the user
        SELECT COUNT(*) INTO total_reviews_var FROM review WHERE review.user_id = user_record.user_id;
        SELECT COUNT(*) INTO total_ratings_var FROM rates WHERE rates.user_id = user_record.user_id;
        SELECT COUNT(*) INTO total_likes_var FROM likes_movie WHERE likes_movie.user_id = user_record.user_id;

        -- Initialize points
        points_var := 0;

        -- Calculate review point
        IF total_reviews_var > 5 THEN
            points_var := points_var + total_reviews_var * 9;
        ELSIF total_reviews_var > 2 THEN
            points_var := points_var + total_reviews_var * 6;
        ELSIF total_reviews_var > 0 THEN
            points_var := points_var + total_reviews_var * 3;
        END IF;

        -- Calculate rating point
        IF total_ratings_var > 10 THEN
            points_var := points_var + total_ratings_var * 8;
        ELSIF total_ratings_var > 5 THEN
            points_var := points_var + total_ratings_var * 5; 
        ELSIF total_ratings_var > 2 THEN
            points_var := points_var + total_ratings_var * 2;
        END IF;

        -- Calculate like point
        IF total_likes_var > 20 THEN
            points_var := points_var + total_likes_var * 7;
        ELSIF total_likes_var > 10 THEN
            points_var := points_var + total_likes_var * 4;
        ELSIF total_likes_var > 5 THEN
            points_var := points_var + total_likes_var * 1;
        END IF;

        -- Check ranking
        IF points_var > goldPoint THEN
          ranking_var := 'GOLD';
        ELSIF points_var > silverPoint THEN
          ranking_var := 'SILVER';
        ELSIF points_var > bronzePoint THEN
          ranking_var := 'BRONZE';
        ELSE 
          ranking_var := 'MEMBER';
        END IF;

        User_id := user_record.user_id;
        Displayed_name := user_record.displayed_name;
        Total_reviews := total_reviews_var;
        Total_ratings := total_ratings_var;
        Total_likes:= total_likes_var;
        Points := points_var;
        Member_ranking := ranking_var;

        RETURN NEXT ;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Call function
SELECT * FROM calculate_points(1,5,6);

-- Sample data for testing function

-- Calulate Member ranking
DELETE FROM "USER";
DELETE FROM STUDIO;
DELETE FROM movie;
DELETE FROM review;
DELETE FROM likes_movie;
DELETE FROM rates;

INSERT INTO "USER" (user_id, email, password, displayed_name, house_number, street, district, city)
VALUES
    (1,'tatrungtin2004@gmail.com', 'abc', 'tinta', '246', 'Ly Thuong Kiet', 'District 10', 'Ho Chi Minh City'),
    (2,'baotram2004@gmail.com', '123', 'tramdang', '357', 'Ngo Quyen', 'Dong Da', 'Ha Noi'),
    (3,'khang@example.com', 'noPass', 'KhangPham', '789', 'Hai Ba Trung', 'District 1', 'Ho Chi Minh City'),
    (4,'khanh@example.com', 'xyz', 'KhanhNguyen', '101', 'Dien Bien Phu', 'District 3', 'Ho Chi Minh City');


INSERT INTO STUDIO (studio_id, "name", FOUNDED_YEAR)
VALUES
    (1,'Universal Pictures', 1912),
    (2,'Paramount Pictures', 1912),
    (3,'Warner Bros', 1923);
    
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
    (2, '2024-02-20', 2, 'Great'),
    (3, '2024-03-10', 2, 'Absolutely delightful!'),
    (3, '2024-03-15', 3, 'A masterpiece.'),
    (4, '2024-03-15', 4, 'Dinh noc, kich tran, bay phap phoi.');

INSERT INTO likes_movie (user_id, movie_id)
VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 2), (2, 1), (2, 3), (2,4), (2,5), (2,6),
    (3, 2), (3, 3), (3, 4), 
    (4, 1);

INSERT INTO rates (user_id, movie_id, rate_point)
VALUES
    (1, 1, 5), (1, 2, 4), (1, 3, 5),
    (2, 4, 3), (2, 1, 4), (2, 2, 6),
    (3, 2, 5), 
    (4, 4, 4);