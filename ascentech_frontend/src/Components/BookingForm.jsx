import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; 

const BookingForm = ({ onBack, onSuccess, editingBooking }) => {
    const getTodayString = () => {
        return new Date().toISOString().split('T')[0];
    };
    const today = getTodayString();

    const initialState = {
        mobile: '',
        hall_name: '',
        applicant_name: '',
        email: '',
        purpose: '',       
        start_date: '',
        end_date: '',
        rent: 0,
        additional_charges: 0,
        total: 0,
        remark: '',
        receipt_no: '',    
        receipt_date: '',
        booking_type: '', 
        time_slot: '',    
        status: 'Confirm'
    };

    const [formData, setFormData] = useState(initialState);
    
    useEffect(() => {
        if (editingBooking) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                return dateString.split('T')[0];
            };

            setFormData({
                ...editingBooking,
                start_date: formatDate(editingBooking.start_date),
                end_date: formatDate(editingBooking.end_date),
                receipt_date: formatDate(editingBooking.receipt_date)
            });
        } else {
            setFormData(initialState);
        }
    }, [editingBooking]);

    
    useEffect(() => {
        const rent = parseFloat(formData.rent || 0);
        const charges = parseFloat(formData.additional_charges || 0);
        const safeRent = rent < 0 ? 0 : rent;
        const safeCharges = charges < 0 ? 0 : charges;
        setFormData(prev => ({ ...prev, total: safeRent + safeCharges }));
    }, [formData.rent, formData.additional_charges]);

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'rent' || name === 'additional_charges') {
            if (value.length > 10) return; 
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFocus = (e) => {
        if (formData[e.target.name] === 0) {
            setFormData({ ...formData, [e.target.name]: '' });
        }
    };

    const handleBlur = (e) => {
        if (formData[e.target.name] === '') {
            setFormData({ ...formData, [e.target.name]: 0 });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            alert("Error: Mobile Number must be exactly 10 digits.");
            return;
        }

        if (!formData.start_date || !formData.end_date || !formData.receipt_date) {
            alert("Error: Please select all dates.");
            return;
        }

        if (formData.end_date < formData.start_date) {
            alert("Error: End Date cannot be before Start Date.");
            return;
        }

        if (!formData.booking_type || !formData.time_slot) {
            alert("Error: Please select Booking Type and Time Slot.");
            return;
        }

        const dataToSend = {
            ...formData,
            rent: parseFloat(formData.rent) || 0,
            additional_charges: parseFloat(formData.additional_charges) || 0,
            total: parseFloat(formData.total) || 0
        };

        try {
            if (editingBooking) {
                
                await axios.put(`${API_URL}/${editingBooking.id}`, dataToSend);
                alert('Booking Updated Successfully!');
            } else {
                
                await axios.post(API_URL, dataToSend);
                alert('Booking Saved Successfully!');
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving booking:', error);
            const serverMsg = error.response?.data?.error || error.message;
            alert(`Save Failed: ${serverMsg}`);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h5>{editingBooking ? 'Edit Booking Entry' : 'New Booking Entry'}</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Mobile No.</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="e.g. 9876543210" maxLength="10" required />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Hall Name</label>
                            <div className="col-sm-9">
                                <select className="form-select" name="hall_name" value={formData.hall_name} onChange={handleChange} required>
                                    <option value="">-- Select Option --</option>
                                    <option value="Nagarbhavan">Nagarbhavan</option>
                                    <option value="Budhavihar">Budhavihar</option>
                                    <option value="Town Hall">Town Hall</option>
                                    <option value="Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha">Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Booking Type</label>
                            <div className="col-sm-9">
                                <select className="form-select" name="booking_type" value={formData.booking_type} onChange={handleChange} required>
                                    <option value="">-- Select Type --</option>
                                    <option value="Marriage">Marriage</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Function">Function/Party</option>
                                    <option value="Exhibition">Exhibition</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Time Slot</label>
                            <div className="col-sm-9">
                                <select className="form-select" name="time_slot" value={formData.time_slot} onChange={handleChange} required>
                                    <option value="">-- Select Slot --</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Morning Shift">Morning Shift</option>
                                    <option value="Evening Shift">Evening Shift</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Applicant Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Email</label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Purpose Of Use</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="purpose" value={formData.purpose} onChange={handleChange} required />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-3">
                                <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} min={today} required />
                            </div>
                            <label className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-3">
                                <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} min={formData.start_date || today} required />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Rent</label>
                            <div className="col-sm-9">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="rent" 
                                    value={formData.rent} 
                                    onChange={handleChange} 
                                    onFocus={handleFocus} 
                                    onBlur={handleBlur} 
                                    min="0" 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Additional Charges</label>
                            <div className="col-sm-9">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="additional_charges" 
                                    value={formData.additional_charges} 
                                    onChange={handleChange} 
                                    onFocus={handleFocus} 
                                    onBlur={handleBlur} 
                                    min="0" 
                                />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Total</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="total" value={formData.total} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Remark</label>
                            <div className="col-sm-9">
                                <textarea className="form-control" name="remark" value={formData.remark} onChange={handleChange} rows="2"></textarea>
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label text-danger">* Receipt No.</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" name="receipt_no" value={formData.receipt_no} onChange={handleChange} required />
                            </div>
                            <label className="col-sm-3 col-form-label text-danger">* Receipt Date</label>
                            <div className="col-sm-3">
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="receipt_date" 
                                    value={formData.receipt_date} 
                                    onChange={handleChange} 
                                    min={today} 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center gap-2 mt-4">
                            <button type="submit" className="btn btn-primary px-4">Submit</button>
                            <button type="button" className="btn btn-dark px-4" onClick={onBack}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;