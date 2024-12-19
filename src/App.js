import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmed", email: "ahmed@example.com", status: "Actif" },
    { id: 2, name: "Safaa", email: "safaa@example.com", status: "Inactif" },
    { id: 3, name: "Hamid", email: "hamid@example.com", status: "Banni" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null); // Pour suivre l'utilisateur en cours d'édition
  const [newUser, setNewUser] = useState({ id: "", name: "", email: "", status: "Actif" }); // Pour les nouveaux utilisateurs et les utilisateurs modifiés
  const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour le terme de recherche

  // Handler pour ajouter un nouvel utilisateur
  const handleAddUser = () => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Gérer l'ID automatiquement
    setUsers([...users, { ...newUser, id: newId }]); // Ajoute l'utilisateur avec un nouvel ID
    setNewUser({ id: "", name: "", email: "", status: "Actif" }); // Réinitialiser le formulaire de nouvel utilisateur
  };

  // Handler pour supprimer un utilisateur
  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  // Handler pour commencer à éditer un utilisateur
  const handleEditUser = (index) => {
    setEditingIndex(index);
    setNewUser(users[index]);
  };

  // Handler pour sauvegarder l'utilisateur modifié
  const handleSaveEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = newUser;
    setUsers(updatedUsers);
    setEditingIndex(null); // Quitter le mode d'édition
    setNewUser({ id: "", name: "", email: "", status: "Actif" });
  };

  // Utilisateurs filtrés en fonction du terme de recherche
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1>Gestion Des Utilisateur</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher des utilisateurs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
              </td>
              <td>
                <button className="edit" onClick={() => handleEditUser(index)}>🖊️</button>
                <button className="delete" onClick={() => handleDeleteUser(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form">
        <input
          type="text"
          placeholder="Nom"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
  value={newUser.status}
  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
>
  <option value="" disabled>Select Status</option> {/* Placeholder option */}
  <option value="Actif">Actif</option>
  <option value="Inactif">Inactif</option>
  <option value="Banni">Banni</option>
</select>

        {editingIndex === null ? (
          <button className="add-button" onClick={handleAddUser}>Ajouter</button>
        ) : (
          <button className="save-button" onClick={handleSaveEdit}>Sauvegarder</button>
        )}
      </div>
    </div>
  );
};

export default App;
