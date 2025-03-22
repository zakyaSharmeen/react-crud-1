// make a simple crud with no api involved
import { useState } from "react";

export default function Practice3() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Add item
  const addItem = () => {
    if (!input.trim()) return;
    setItems([...items, { id: Date.now(), title: input }]);
    setInput("");
  };

  // Update item
  const updateItem = () => {
    if (!input.trim() || editId === null) return;
    setItems(
      items.map((item) =>
        item.id === editId ? { ...item, title: input } : item
      )
    );
    setEditId(null);
    setInput("");
  };

  // Delete item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Set item for editing
  const editItem = (item) => {
    setEditId(item.id);
    setInput(item.title);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg  text-center">
      <h2 className="text-xl font-bold mb-4">Simple CRUD</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
        className=" p-2 mr-2 w-3/4"
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
                className="bg-green-500 text-yellow px-4 py-2 rounded border-2 border-green-500 text-black cursor-pointer"
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
