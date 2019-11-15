const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));

//for post data
app.use(express.urlencoded({ extended: true }));

//for reading json
app.use(express.json());

//for angular app
app.use(express.static(__dirname + '/public/dist/public'));

//require Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exam', { useNewUrlParser: true });

const ReviewSchema = new mongoose.Schema({
    customer: { type: String, required: [true, " customer Required"], minlength: [3, "customer must have at least 3 characters"] },
    star: { type: Number, required: [true, "star Required"] },
    description: { type: String, required: [true, " description Required"], minlength: [3, "description must have at least 3 characters"] }
}, { timestamps: true })
const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name Required"], minlength: 3, unique: [true, "Name should be unique"] },
    cuisine: { type: String, required: [true, "cuisine Required"], minlength: 3 },
    reviews: [ReviewSchema]
}, { timestamps: true })

const Review = mongoose.model("Review", ReviewSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);


//get all
app.get('/apis', (request, response) => {
    Restaurant.find()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
});

//get one
app.get('/api/:id', (request, response) => {
    Restaurant.findById({ _id: request.params.id })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

//add one
app.post('/api', (request, response) => {
    const one_Restaurant = new Restaurant(request.body);
    one_Restaurant.save()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.post('/api/:id', (request, response) => {
    const one_review = new Review(request.body);
    Restaurant.findOneAndUpdate({ _id: request.params.id }, { $push: { reviews: one_review } }, { runValidators: true })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

//update one
app.put('/api/:id', (request, response) => {
    Restaurant.update({ _id: request.params.id }, request.body, { runValidators: true })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

//delete one
app.delete('/api/:id', (request, response) => {
    Restaurant.remove({ _id: request.params.id })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

//require path
const path = require("path");
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});