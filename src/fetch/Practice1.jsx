import { useState, useEffect } from "react";

export default function Practice1() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=4")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add item
  const addItem = () => {
    if (!input.trim()) return;
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input, completed: false }),
    })
      .then((response) => response.json())
      .then((newItem) => setItems([...items, newItem]));
    setInput("");
  };

  // Update item
  const updateItem = () => {
    if (!input.trim() || editId === null) return;
    fetch(`https://jsonplaceholder.typicode.com/todos/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input, completed: false }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setItems(
          items.map((item) => (item.id === editId ? updatedItem : item))
        );
        setEditId(null);
        setInput("");
      });
  };

  // Delete item
  const deleteItem = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  // Set item for editing
  const editItem = (item) => {
    setEditId(item.id);
    setInput(item.title);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl bg-red-300 mt-10 border-red text-center">
      <h2 className="text-xl font-bold mb-4">Simple Fetch CRUD</h2>
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
                className="bg-green-500 text-yellow px-4 py-2 rounded border-2 border-white-500 text-black cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded border-2 border-red-500 text-black cursor-pointer"
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
