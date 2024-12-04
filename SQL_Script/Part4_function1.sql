--------------------------------- Nomination vs Win Rate for Movies ----------------------------- 
-- Function definition:
-- Nomination vs Win Rate for Movies:
CREATE OR REPLACE FUNCTION get_award_win_ratio(given_ratio FLOAT DEFAULT 0)
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

-- Sample data for testing function

DELETE FROM STUDIO;
DELETE FROM movie;
DELETE FROM AWARD;
DELETE FROM MOVIE_AWARD ;
DELETE FROM MOVIE_AWARD_IS_NOMINATED;

INSERT INTO STUDIO (studio_id, "name", FOUNDED_YEAR)
VALUES
    (1,'Universal Pictures', 1912),
    (2,'Paramount Pictures', 1912),
    (3,'Warner Bros', 1923),
    (4, '20th Century Fox', 1935),
    (5, 'Columbia Pictures', 1918),
    (6, 'Metro-Goldwyn-Mayer', 1924);
    
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
     'R', 2009, 1);

INSERT INTO AWARD (AWARD_ID, NAME, YEAR, INSTITUTION)
VALUES
    (1, 'Best Picture', 2024, 'Academy Awards'),
    (2, 'Best Director', 2023, 'Golden Globes'),
    (3, 'Best Actor', 2022, 'Cannes Film Festival'),
    (4, 'Best Animated Feature', 2021, 'Academy Awards'),
    (5, 'Best Visual Effects', 2010, 'BAFTA'),
    (6, 'Best Screenplay', 2011, 'Writers Guild of America'),
    (7, 'Best Actor', 1998, 'Academy Awards'),
    (8, 'Best Supporting Actor', 2023, 'Golden Globes'),
    (9, 'Best Editing', 2019, 'BAFTA'),
    (10, 'Best Cinematography', 2020, 'Academy Awards'),
    (11, 'Best Original Score', 2018, 'Grammy Awards'),
    (12, 'Best Costume Design', 2015, 'BAFTA'),
    (13, 'Best Foreign Language Film', 2017, 'Golden Globes'),
    (14, 'Best Documentary Feature', 2022, 'Academy Awards');

INSERT INTO MOVIE_AWARD (AWARD_ID, MOVIE_ID)
VALUES
		(1, 1),
		(4, 2),  
    (5, 3),
    (6, 4),
    (9, 1),
    (10, 2),
    (11, 2),
    (12, 3),
    (13, 3),
    (14, 3);

INSERT INTO MOVIE_AWARD_IS_NOMINATED (AWARD_ID, MOVIE_ID)
VALUES
    (1, 1), (1, 2),
		(4, 2), (4, 3), (4, 4),  
    (5, 3),
    (6, 4),
    (9, 1),
    (10, 2),
    (11, 2),
    (12, 3),
    (13, 3),
    (14, 3);