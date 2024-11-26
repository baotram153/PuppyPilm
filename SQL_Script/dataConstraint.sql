-- MPA_rating
---Desc: Check MPA_rating before adding.
ALTER TABLE movie
ADD CONSTRAINT check_mpa_rating
CHECK (mpa_rating IN ('R', 'G', 'PG', 'PG-13', 'NC-17'))

-- Positive number
ALTER TABLE tv_series
ADD CONSTRAINT check_positive_episodes
CHECK (number_of_episodes > 0);

ALTER TABLE tv_series
ADD CONSTRAINT check_positive_season_number
CHECK (season_number > 0);

ALTER TABLE episode
ADD CONSTRAINT check_positive_episode_number
CHECK (episode_number > 0);

ALTER TABLE movie
ADD CONSTRAINT check_positive_budget
CHECK (budget > 0);

ALTER TABLE rates
ADD CONSTRAINT check_rate_point_range
CHECK (rate_point >= 1 AND rate_point <= 10);
