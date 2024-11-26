--------------------------------- Nomination vs Win Rate for Movies ----------------------------- 
-- Function definition:
-- Nomination vs Win Rate for Movies:
CREATE OR REPLACE FUNCTION get_award_win_ratio(given_ratio FLOAT)
RETURNS TABLE(Movie_ID INT, Title TEXT, Number_of_nominations INT, Number_of_awards INT, Winning_Ratio FLOAT, Is_larger TEXT) AS $$
DECLARE movie_record RECORD;
BEGIN
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
