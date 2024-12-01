DROP TABLE IF EXISTS movie;
CREATE TABLE movie (
    movie_id SERIAL PRIMARY KEY,
    country VARCHAR(100),
    budget NUMERIC,
    title VARCHAR(255),
    description TEXT,
    mpa_rating VARCHAR(10),
    released_year INT,
    studio_id INT
);

DROP TABLE IF EXISTS remakes;
CREATE TABLE remakes (
    movie_remake_id INT PRIMARY KEY REFERENCES movie(movie_id),
    original_movie_id INT REFERENCES movie(movie_id)
);

DROP TABLE IF EXISTS cinematic_movie;
CREATE TABLE cinematic_movie (
    movie_id INT PRIMARY KEY REFERENCES movie(movie_id),
    duration INT
);

DROP TABLE IF EXISTS tv_series;
CREATE TABLE tv_series (
    movie_id INT PRIMARY KEY REFERENCES movie(movie_id),
    number_of_episodes INT,
    season_number INT,
    streaming_media VARCHAR(255)
);

DROP TABLE IF EXISTS documentary;
CREATE TABLE documentary (
    movie_id INT PRIMARY KEY REFERENCES movie(movie_id),
    primary_historical_figure VARCHAR(255),
    primary_historical_event VARCHAR(255)
);

DROP TABLE IF EXISTS episode;
CREATE TABLE episode (
    movie_id INT REFERENCES tv_series(movie_id),
    episode_number INT,
    PRIMARY KEY (movie_id, episode_number)
);

DROP TABLE IF EXISTS episode_casts;
CREATE TABLE episode_casts (
    movie_id INT,
    episode_number INT,
    participant_id INT,
    PRIMARY KEY (movie_id, episode_number, participant_id),
    FOREIGN KEY (movie_id, episode_number) REFERENCES episode(movie_id, episode_number)
);

DROP TABLE IF EXISTS main_trailer;
CREATE TABLE main_trailer (
    link VARCHAR(255) PRIMARY KEY,
    duration INT,
    release_date DATE,
    movie_id INT REFERENCES movie(movie_id)
);

DROP TABLE IF EXISTS review;
CREATE TABLE review (
    user_id INT,
    timestamp TIMESTAMP,
    movie_id INT REFERENCES movie(movie_id),
    comment TEXT,
    PRIMARY KEY (user_id, timestamp)
);

DROP TABLE IF EXISTS studio;
CREATE TABLE studio (
    studio_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    founded_year INT
);

DROP TABLE IF EXISTS studio_founder;
CREATE TABLE studio_founder (
    studio_id INT REFERENCES studio(studio_id),
    founder_name VARCHAR(255),
    PRIMARY KEY (studio_id, founder_name)
);

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    displayed_name VARCHAR(255),
    house_number VARCHAR(50),
    street VARCHAR(255),
    district VARCHAR(255),
    city VARCHAR(100),
    dob DATE
);

DROP TABLE IF EXISTS user_phone_number;
CREATE TABLE user_phone_number (
    user_id INT REFERENCES "user"(user_id),
    phone_number VARCHAR(20),
    PRIMARY KEY (user_id, phone_number)
);

DROP TABLE IF EXISTS award;
CREATE TABLE award (
    award_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    year INT,
    institution VARCHAR(255)
);

DROP TABLE IF EXISTS movie_award_is_nominated;
CREATE TABLE movie_award_is_nominated (
    award_id INT,
    movie_id INT REFERENCES movie(movie_id),
    PRIMARY KEY (award_id, movie_id)
);

DROP TABLE IF EXISTS movie_award;
CREATE TABLE movie_award (
    award_id INT PRIMARY KEY REFERENCES award(award_id),
    movie_id INT REFERENCES movie(movie_id)
);

DROP TABLE IF EXISTS actor_award;
CREATE TABLE actor_award (
    award_id INT PRIMARY KEY REFERENCES award(award_id),
    actor_id INT,
    role VARCHAR(255),
    movie VARCHAR(255)
);

DROP TABLE IF EXISTS director_award;
CREATE TABLE director_award (
    award_id INT PRIMARY KEY REFERENCES award(award_id),
    director_id INT,
    movie VARCHAR(255)
);

DROP TABLE IF EXISTS actor_award_is_nominated;
CREATE TABLE actor_award_is_nominated (
    award_id INT REFERENCES actor_award(award_id),
    participant_id INT,
    role VARCHAR(255),
    movie VARCHAR(255),
    PRIMARY KEY (award_id, participant_id)
);

DROP TABLE IF EXISTS director_award_is_nominated;
CREATE TABLE director_award_is_nominated (
    award_id INT REFERENCES director_award(award_id),
    participant_id INT,
    movie VARCHAR(255),
    PRIMARY KEY (award_id, participant_id)
);

DROP TABLE IF EXISTS participant;
CREATE TABLE participant (
    participant_id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    middlename VARCHAR(100),
    lastname VARCHAR(100),
    nationality VARCHAR(100),
    dob DATE
);

DROP TABLE IF EXISTS actor;
CREATE TABLE actor (
    participant_id INT PRIMARY KEY REFERENCES participant(participant_id)
);

DROP TABLE IF EXISTS director;
CREATE TABLE director (
    participant_id INT PRIMARY KEY REFERENCES participant(participant_id)
);

DROP TABLE IF EXISTS movie_casts;
CREATE TABLE movie_casts (
    movie_id INT REFERENCES movie(movie_id),
    participant_id INT REFERENCES actor(participant_id),
    role VARCHAR(100),
    PRIMARY KEY (movie_id, participant_id)
);

DROP TABLE IF EXISTS is_directed;
CREATE TABLE is_directed (
    movie_id INT REFERENCES movie(movie_id),
    participant_id INT REFERENCES director(participant_id),
    PRIMARY KEY (movie_id, participant_id)
);

DROP TABLE IF EXISTS likes_movie;
CREATE TABLE likes_movie (
    user_id INT REFERENCES "user"(user_id),
    movie_id INT REFERENCES movie(movie_id),
    PRIMARY KEY (user_id, movie_id)
);

DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
    name VARCHAR(100) PRIMARY KEY
);

DROP TABLE IF EXISTS belongs_to;
CREATE TABLE belongs_to (
    movie_id INT REFERENCES movie(movie_id),
    genre_name VARCHAR(100) REFERENCES genre(name),
    PRIMARY KEY (movie_id, genre_name)
);

DROP TABLE IF EXISTS likes_genre;
CREATE TABLE likes_genre (
    user_id INT REFERENCES "user"(user_id),
    genre_name VARCHAR(100) REFERENCES genre(name),
    PRIMARY KEY (user_id, genre_name)
);

DROP TABLE IF EXISTS rates;
CREATE TABLE rates (
    user_id INT REFERENCES "user"(user_id),
    movie_id INT REFERENCES movie(movie_id),
    rate_point NUMERIC(3,1),
    PRIMARY KEY (user_id, movie_id)
);

DROP TABLE IF EXISTS movie_distributor;
CREATE TABLE movie_distributor (
    name VARCHAR(255) PRIMARY KEY,
    founded_year INT,
    phone_number VARCHAR(20)
);

DROP TABLE IF EXISTS distributor_payment_method;
CREATE TABLE distributor_payment_method (
    distributor_name VARCHAR(255) REFERENCES movie_distributor(name),
    payment_method VARCHAR(100),
    PRIMARY KEY (distributor_name, payment_method)
);

DROP TABLE IF EXISTS cinema;
CREATE TABLE cinema (
    name VARCHAR(255) PRIMARY KEY,
    distributor_name VARCHAR(255) REFERENCES movie_distributor(name),
    location VARCHAR(255),
    number_of_rooms INT
);

DROP TABLE IF EXISTS cinema_streams;
CREATE TABLE cinema_streams (
    cinema_name VARCHAR(255) REFERENCES cinema(name),
    movie_id INT REFERENCES movie(movie_id),
    PRIMARY KEY (cinema_name, movie_id)
);

DROP TABLE IF EXISTS showtime;
CREATE TABLE showtime (
    cinema_name VARCHAR(255) REFERENCES cinema(name),
    time TIMESTAMP,
    room VARCHAR(50),
    number_of_tickets INT,
    movie_id INT REFERENCES movie(movie_id),
    PRIMARY KEY (cinema_name, time, room, movie_id)
);

ALTER TABLE movie
ADD CONSTRAINT fk_studio
FOREIGN KEY (studio_id) REFERENCES studio(studio_id);

ALTER TABLE episode_casts
ADD CONSTRAINT fk_episode_cast
FOREIGN KEY (participant_id) REFERENCES actor(participant_id);

ALTER TABLE review
ADD CONSTRAINT fk_review
FOREIGN KEY (user_id) REFERENCES "user"(user_id);

ALTER TABLE movie_award_is_nominated
ADD CONSTRAINT fk_movie_award_is_nominated
FOREIGN KEY (award_id) REFERENCES movie_award(award_id);

ALTER TABLE actor_award
ADD CONSTRAINT fk_actor_award
FOREIGN KEY (actor_id) REFERENCES actor(participant_id);

ALTER TABLE director_award
ADD CONSTRAINT fk_director_award
FOREIGN KEY (director_id) REFERENCES director(participant_id);

ALTER TABLE actor_award_is_nominated
ADD CONSTRAINT fk_actor_award_is_nominated
FOREIGN KEY (participant_id) REFERENCES actor(participant_id);

ALTER TABLE director_award_is_nominated
ADD CONSTRAINT fk_director_award_is_nominated
FOREIGN KEY (participant_id) REFERENCES director(participant_id);
