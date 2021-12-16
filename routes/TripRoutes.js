const express = require('express');
const Sample = require('../models/TripModel');
const router = new express.Router();

router.get('/', async (req, res) => {
    try{
        const out = await Sample.find();
        res.json(out);
    } catch (error){
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const sample = new Sample({
        name: req.body.name,
        completed: req.body.completed,
        participants: req.body.participants,
        events: req.body.events,
        budget: req.body.budget,
        home: req.body.home,
        destination: req.body.destination,
        preferances: req.body.preferances
    });
    
    try{
        const newSample = await sample.save();
        res.status(201).json(sample);
    } catch (err) {
        console.log(err);
        res.status(400).json({message:err.message});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const updatte = await Sample.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatte);
    } catch (err) {
        console.log(err);
        res.status(400).json({message:err.message});
    }
	
});


module.exports = router;