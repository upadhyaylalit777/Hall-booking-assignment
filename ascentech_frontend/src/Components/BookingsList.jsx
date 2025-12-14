import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; 

const BookingList = ({ onAddClick, onEditClick }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            
            const result = await axios.get(API_URL);
            setBookings(result.data);
        } catch (error) {
            console.error("Error loading bookings:", error);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this booking?")) {
            
            await axios.delete(`${API_URL}/${id}`);
            loadBookings(); 
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-').toUpperCase();
    };

    return (
        <div className="container-fluid mt-4">
            
            <div className="d-flex justify-content-center mb-3">
                <button 
                    className="btn text-white fw-bold" 
                    onClick={onAddClick}
                    style={{ backgroundColor: '#003366' }}
                >
                    ADD NEW
                </button>
            </div>

            <div className="table-responsive" style={{ maxHeight: '75vh', overflowY: 'auto', border: '1px solid #dee2e6' }}>
                <table className="table table-bordered table-hover table-sm mb-0" style={{ fontSize: '0.85rem' }}>
                    
                    <thead className="text-white text-nowrap" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#003366' }}>
                        <tr>
                            <th style={{ backgroundColor: '#003366' }}>Applicant Name</th>
                            <th style={{ backgroundColor: '#003366' }}>Email</th>
                            <th style={{ backgroundColor: '#003366' }}>Mobile</th>
                            <th style={{ backgroundColor: '#003366' }}>Start Date</th>
                            <th style={{ backgroundColor: '#003366' }}>End Date</th>
                            <th style={{ backgroundColor: '#003366' }}>Rent</th>
                            <th style={{ backgroundColor: '#003366' }}>Add. Charges</th>
                            <th style={{ backgroundColor: '#003366' }}>Hall</th>
                            
                            <th style={{ backgroundColor: '#003366' }}>Type</th>
                            <th style={{ backgroundColor: '#003366' }}>Slot</th>
                            
                            <th style={{ backgroundColor: '#003366' }}>Status</th>
                            <th style={{ backgroundColor: '#003366' }}>App No.</th>
                            <th style={{ backgroundColor: '#003366' }}>Remark</th>
                            <th className="text-center" style={{ backgroundColor: '#003366' }}>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="align-middle"> 
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="fw-bold">{booking.applicant_name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.mobile}</td>
                                <td className="text-nowrap">{formatDate(booking.start_date)}</td>
                                <td className="text-nowrap">{formatDate(booking.end_date)}</td>
                                <td>{booking.rent}</td>
                                <td>{booking.additional_charges}</td>
                                <td>{booking.hall_name}</td>
                                
                                <td>{booking.booking_type}</td>
                                <td>{booking.time_slot}</td>
                                
                                <td>
                                    <span className="badge bg-success">{booking.status || 'Confirm'}</span>
                                </td>
                                <td>{booking.receipt_no || booking.id}</td> 
                                <td style={{ maxWidth: '200px', whiteSpace: 'normal' }}>
                                    {booking.remark}
                                </td>
                                
                                <td className="text-center text-nowrap">
                                    <button 
                                        className="btn btn-warning btn-sm me-1" 
                                        onClick={() => onEditClick(booking)}
                                        style={{ fontSize: '0.75rem', padding: '2px 5px' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(booking.id)}
                                        style={{ fontSize: '0.75rem', padding: '2px 5px' }}
                                    >
                                        Del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && <p className="text-center mt-3">No bookings found.</p>}
            </div>
        </div>
    );
};

export default BookingList;