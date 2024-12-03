--------------------------------- Nomination vs Win Rate for Movies ----------------------------- 
-- Function definition:
-- Nomination vs Win Rate for Movies:
CREATE OR REPLACE FUNCTION get_award_win_ratio(given_ratio FLOAT)
RETURNS TABLE(Movie_ID INT, Title TEXT, Number_of_nominations INT, Number_of_awards INT, Winning_Ratio FLOAT, Is_larger TEXT) AS $$
DECLARE movie_record RECORD;
BEGIN

     -- Validate input
    IF given_ratio < 0 OR given_ratio > 100 THEN
        RAISE EXCEPTION 'Input is invalid! The ratio must be between 0 and 100! Your input is: % ', given_ratio;
    END IF;

    FOR movie_record IN
      SELECT 
        MV.movie_id Movie_ID, 
        MV.title Title, 
        COUNT(DISTINCT N.award_id) Number_of_nominations, 
        COUNT(DISTINCT A.award_id) Number_of_awards
      FROM movie MV 
        LEFT JOIN movie_award_is_nominated N ON MV.movie_id = N.movie_id
        LEFT JOIN movie_award A ON MV.movie_id = A.movie_id
        GROUP BY MV.movie_id
    LOOP
    
      Movie_ID := movie_record.Movie_ID;
      Title := movie_record.Title;
      Number_of_nominations := movie_record.Number_of_nominations;
  
      Number_of_awards := movie_record.Number_of_awards;
        
      IF movie_record.Number_of_nominations = 0 THEN 
        Winning_Ratio := 0;
      ELSE 
        Winning_Ratio := (movie_record.Number_of_awards::FLOAT / movie_record.Number_of_nominations) * 100;
      END IF;
      Is_larger := CASE
          WHEN Winning_Ratio >= given_ratio THEN 'TRUE'
          ELSE 'FALSE'
        END;
      
      RETURN NEXT;
    END LOOP;

END;
$$ LANGUAGE plpgsql;

-- Call Function:
SELECT * FROM get_award_win_ratio(70);
SELECT * FROM get_award_win_ratio();

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
    FOR user_record IN SELECT U.user_id, U.displayed_name FROM "user" U LOOP
        -- Get the total activity counts for the user
        SELECT COUNT(*) INTO total_reviews_var FROM review WHERE review.user_id = user_record.user_id;
        SELECT COUNT(*) INTO total_ratings_var FROM rates WHERE rates.user_id = user_record.user_id;
        SELECT COUNT(*) INTO total_likes_var FROM likes_movie WHERE likes_movie.user_id = user_record.user_id;

        -- Initialize points
        points_var := 0;

        -- Calculate review point
        IF total_reviews_var > 5 THEN
            points_var := points_var + 10;
        ELSIF total_reviews_var > 2 THEN
            points_var := points_var + 5;
        ELSIF total_reviews_var > 0 THEN
            points_var := points_var + 2;
        END IF;

        -- Calculate rating point
        IF total_ratings_var > 10 THEN
            points_var := points_var + 10;
        ELSIF total_ratings_var > 5 THEN
            points_var := points_var + 5;
        ELSIF total_ratings_var > 2 THEN
            points_var := points_var + 2;
        END IF;

        -- Calculate like point
        IF total_likes_var > 20 THEN
            points_var := points_var + 10;
        ELSIF total_likes_var > 10 THEN
            points_var := points_var + 5;
        ELSIF total_likes_var > 5 THEN
            points_var := points_var + 2;
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

SELECT * FROM calculate_points(1,5,6);



