const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    applicant_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: false },
    hall_name: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.STRING },
    
    // --- NEW FIELDS ADDED HERE ---
    booking_type: { 
        type: DataTypes.STRING, 
        allowNull: true // Set to true so old records don't break
    },
    time_slot: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    // -----------------------------

    start_date: { type: DataTypes.DATEONLY },
    end_date: { type: DataTypes.DATEONLY },
    rent: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    additional_charges: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(10, 2) },
    remark: { type: DataTypes.TEXT },
    receipt_no: { type: DataTypes.STRING },
    receipt_date: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.STRING, defaultValue: 'Confirm' }
});

module.exports = Booking;