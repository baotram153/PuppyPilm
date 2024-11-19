import { useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";

export default function Component() {
  const [checkedRows, setCheckedRows] = useState(new Set());

//   var data = [
//     { id: 1, name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
//     { id: 2, name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
//     { id: 3, name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
//   ];

  const [data, setData] = useState([
    { id: 1, name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
    { id: 2, name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: 3, name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  ]);

  const toggleRow = (id) => {
    setCheckedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleDelete = () => {
    const selectedRows = data.filter((row) => checkedRows.has(row.id));
    console.log("Deleted rows:", selectedRows);
    alert(`Deleted rows:\n${JSON.stringify(selectedRows, null, 2)}`);
    
    // Remove rows from table
    setData(data.filter((row) => !checkedRows.has(row.id)));
    setCheckedRows(new Set());
  };


  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedRows(new Set(data.map((row) => row.id)));
                } else {
                  setCheckedRows(new Set());
                }
              }}
              checked={checkedRows.size === data.length}
            />
          </Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row) => (
            <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="p-4">
                <Checkbox
                  onChange={() => toggleRow(row.id)}
                  checked={checkedRows.has(row.id)}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {row.name}
              </Table.Cell>
              <Table.Cell>{row.color}</Table.Cell>
              <Table.Cell>{row.category}</Table.Cell>
              <Table.Cell>{row.price}</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button
        className="mt-4"
        onClick={handleDelete}
        disabled={checkedRows.size === 0}>Delete</Button>
    </div>
  );
}
