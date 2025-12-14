const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new booking
router.post('/', async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
       
        const [updatedRows] = await Booking.update(req.body, {
            where: { id: id }
        });

        if (updatedRows > 0) {
            
            const updatedBooking = await Booking.findByPk(id);
            res.json(updatedBooking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Booking.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;