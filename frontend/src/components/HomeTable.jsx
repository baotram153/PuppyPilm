import { useState } from 'react';
import { Table, TextInput, Button, Select } from 'flowbite-react';

export default function HomeTable() {
    const [data, setData] = useState([
        {
            title: 'Breaking Bad - Season 1',
            description:
                'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.',
            mpa_rating: 'R',
            released_year: 2008,
            studio: 'bk_entertainment',
            trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
            genre: ['action', 'animation', 'comedy'],
            rate: '9',
        },
        {
            title: "Schindler's List",
            description:
                'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
            mpa_rating: 'PG-13',
            released_year: 1993,
            studio: 'bk_film',
            trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
            genre: ['action', 'animation', 'drama', 'experimental'],
            rate: '8',
        },
        {
            title: "Singin' in the Rain",
            description:
                'A silent film star falls for a chorus girl when he and his jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.',
            mpa_rating: 'G',
            released_year: 1952,
            studio: 'bk_entertainment',
            trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
            genre: ['action', 'comedy'],
            rate: '2',
        },
        {
            title: 'Breaking Bad - Season 2',
            description:
                'Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them first.',
            mpa_rating: 'NC-17',
            released_year: 2009,
            studio: 'bk_film',
            trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
            genre: ['animation', 'comedy'],
            rate: '3',
        },
    ]);

    // State for search terms
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAge, setSearchAge] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchStudio, setSearchStudio] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [searchRate, setSearchRate] = useState('');

    // State for filtered data
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = () => {
        const mpa_age = {
            G: 0,
            PG: 10,
            'PG-13': 13,
            R: 18,
            'NC-17': 18,
        };

        // Tách các genre từ chuỗi searchGenre
        const searchGenres = searchGenre
            .toLowerCase()
            .split(', ')
            .filter((genre) => genre !== ''); // Loại bỏ các chuỗi rỗng

        const result = data.filter((row) => {
            // Kiểm tra điều kiện từng trường
            const isTitleMatch =
                row.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                searchTitle === '';

            const isAgeMatch =
                mpa_age[row.mpa_rating] <= Number(searchAge) ||
                searchAge === '';

            const isYearMatch =
                row.released_year >= Number(searchYear) || searchYear === '';

            const isStudioMatch =
                row.studio.toLowerCase().includes(searchStudio.toLowerCase()) ||
                searchStudio === '';

            const isGenreMatch =
                searchGenres.every((genre) =>
                    row.genre.map((g) => g.toLowerCase()).includes(genre)
                ) || searchGenre === '';

            const isRateMatch =
                row.rate.toLowerCase().includes(searchRate.toLowerCase()) ||
                searchRate === '';

            // Kết hợp tất cả điều kiện
            return (
                isTitleMatch &&
                isAgeMatch &&
                isYearMatch &&
                isStudioMatch &&
                isGenreMatch &&
                isRateMatch
            );
        });

        // Cập nhật dữ liệu đã lọc vào state
        setFilteredData(result);
    };

    return (
        <div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Title
                        </label>
                        <TextInput
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Title"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Studio
                        </label>
                        <TextInput
                            type="text"
                            value={searchStudio}
                            onChange={(e) => setSearchStudio(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Studio"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Released Year
                        </label>
                        <TextInput
                            type="number"
                            value={searchYear}
                            onChange={(e) => setSearchYear(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Age
                        </label>
                        <TextInput
                            type="number"
                            value={searchAge}
                            onChange={(e) => setSearchAge(e.target.value)}
                            className="mb-2"
                            placeholder="Less Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Genre
                        </label>
                        <TextInput
                            type="text"
                            value={searchGenre}
                            onChange={(e) => setSearchGenre(e.target.value)}
                            className="mb-2"
                            placeholder="action, comedy, ..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Rate
                        </label>
                        <Select
                            value={searchRate}
                            onChange={(e) => setSearchRate(e.target.value)}
                            className="mb-2"
                            placeholder="Select Rate"
                        >
                            <option value="">Select Rate</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </Select>
                    </div>
                    <div className="flex justify-start">
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>
            </form>

            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Number</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>MPA Rating</Table.HeadCell>
                        <Table.HeadCell>Released Year</Table.HeadCell>
                        <Table.HeadCell>Studio</Table.HeadCell>
                        <Table.HeadCell>Trailer</Table.HeadCell>
                        <Table.HeadCell>Genre</Table.HeadCell>
                        <Table.HeadCell>Rate</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {filteredData.map((row, index) => (
                            <Table.Row
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="text-center">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell>{row.title}</Table.Cell>
                                <Table.Cell>{row.description}</Table.Cell>
                                <Table.Cell>{row.mpa_rating}</Table.Cell>
                                <Table.Cell>{row.released_year}</Table.Cell>
                                <Table.Cell>{row.studio}</Table.Cell>
                                <Table.Cell>
                                    <a
                                        href={row.trailer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Link
                                    </a>
                                </Table.Cell>
                                <Table.Cell>{row.genre.join(', ')}</Table.Cell>
                                <Table.Cell className="text-center">
                                    {row.rate}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
