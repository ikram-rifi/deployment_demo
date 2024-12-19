import React, { useState } from 'react';

function Tableau() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddItem = () => {
    if (editIndex === -1) {
      setItems([...items, newItem]);
    } else {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(-1);
    }
    setNewItem('');
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  return (
    <div class="Tableau">
      <h1>Gestion Du Tableau</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>
        {editIndex === -1 ? 'Ajouter' : 'Modifier'}
      </button>
      <ul>
        {items.map((item, index) => (
          <div key={index}>
            {item}
            <button onClick={() => handleEditItem(index)}>Modifier</button>
            <button onClick={() => handleDeleteItem(index)}>Supprimer</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Tableau;