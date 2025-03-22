import { useState, useEffect } from "react";
import axios from "axios";

export default function Practice2() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=4")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add item
  const addItem = () => {
    if (!input.trim()) return;
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: input,
        completed: false,
      })
      .then((response) => setItems([...items, response.data]));
    setInput("");
  };

  // Update item
  const updateItem = () => {
    if (!input.trim() || editId === null) return;
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${editId}`, {
        title: input,
        completed: false,
      })
      .then((response) => {
        setItems(
          items.map((item) => (item.id === editId ? response.data : item))
        );
        setEditId(null);
        setInput("");
      });
  };

  // Delete item
  const deleteItem = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  // Set item for editing
  const editItem = (item) => {
    setEditId(item.id);
    setInput(item.title);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-red-300 bg-red-300 text-center text-white">
      <h2 className="text-xl font-bold mb-4">Simple Axios CRUD</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
        className="border p-2 mr-2 w-3/4"
      />
      {editId ? (
        <button
          onClick={updateItem}
          className="bg-green-500 text-white px-4 py-2 rounded border-2 border-green-500 text-black cursor-pointer"
        >
          Update
        </button>
      ) : (
        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded border-2 border-green-500 text-black cursor-pointer"
        >
          Add
        </button>
      )}
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between p-2 border-b">
            <span>{item.title}</span>
            <div>
              <button
                onClick={() => editItem(item)}
                className="bg-green-500 text-white px-4 py-2 rounded border-2 border-green-500 text-black cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded border-2 gap-3 border-red-500 text-black cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
