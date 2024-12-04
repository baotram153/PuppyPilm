---------------------------------- Test Insert Procedure --------------------------------------------------------------
-- Valid input
CALL insert_movie(
    'Everything Everywhere all at once',
    'China',
    100.5,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie name is an empty string
CALL insert_movie(
    '',
    'China',
    100.5,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie budget is not a number
CALL insert_movie(
    'Everything Everywhere all at once',
    'China',
    'budget',
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie budget is a negative number
CALL insert_movie(
    'Everything Everywhere all at once',
    'China',
    -200,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- MPA rating is invalid
CALL insert_movie(
    'Everything Everywhere all at once',
    'China',
    200,
    'TV-MA',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Description is an empty string
CALL insert_movie(
    'Everything Everywhere all at once',
    'China',
    100.5,
    'R',
    '',
    2008,
    2
);

-- ID of studio does not exist
CALL insert_movie(
	'Everything Everywhere all at once',
	'China',
	100.5,
	'R',
	'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
	2008,
	 12
);

---------------------------------- Test Update Procedure --------------------------------------------------------------
-- Valid input
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    100.5,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie name is an empty string
CALL update_movie(
    1,
    '',
    'China',
    100.5,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie budget is not a number
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    'budget',
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Movie budget is a negative number
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    -200,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- MPA rating is invalid
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    200,
    'TV-MA',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    2
);

-- Review is an empty string
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    100.5,
    'R',
    '',
    2008,
    2
);

-- ID of studio does not exist
CALL update_movie(
    1,
    'Everything Everywhere all at once',
    'China',
    100.5,
    'R',
    'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook methamphetamine.',
    2008,
    12
);
---------------------------------- Test Delete Procedure --------------------------------------------------------------
-- Valid input
CALL delete_movie(1);

-- Movie ID does not exist
CALL delete_movie(1);