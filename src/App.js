import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addItem = () => {
    if (form.name && form.price && form.quantity) {
      setItems([...items, { ...form, id: Date.now() }]);
      setForm({ name: '', price: '', quantity: '' });
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const buyItem = (id,buyQuantity) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity - buyQuantity } : item
    );
    setItems(newItems.filter(item => item.quantity > 0));
  };

  const total = items.length;

  return (
    <div className="App">
      <h1>VEG SHOP</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="ex-Potato"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="ex-70"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="ex-5KG"
          value={form.quantity}
          onChange={handleChange}
        />
        <button onClick={addItem}>ADD TO SHOP</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} RS: {item.price} {item.quantity}KG
            <input type="number" min="1" max={item.quantity} defaultValue="1" ref={el => item.inputRef = el} />
            <button onClick={() => buyItem(item.id,Number(item.inputRef.value))}>Buy</button>
            <button onClick={() => deleteItem(item.id)}>delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Total: {total}</h2>
      </div>
    </div>
  );
}

export default App;
