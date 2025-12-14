import React, { useState } from 'react';
import BookingList from './Components/BookingsList.jsx';
import BookingForm from './Components/BookingForm.jsx';

function App() {
  const [view, setView] = useState('list'); 
  const [editingBooking, setEditingBooking] = useState(null); 


  const handleAdd = () => {
    setEditingBooking(null); 
    setView('form');
  };

 
  const handleEdit = (booking) => {
    setEditingBooking(booking); 
    setView('form');
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Hall Booking Records</span>
        </div>
      </nav>

      {view === 'list' ? (
        <BookingList 
            onAddClick={handleAdd} 
            onEditClick={handleEdit} 
        />
      ) : (
        <BookingForm 
            editingBooking={editingBooking} 
            onBack={() => setView('list')} 
            onSuccess={() => setView('list')} 
        />
      )}
    </div>
  );
}

export default App;