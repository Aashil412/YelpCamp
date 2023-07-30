const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
        author: '64bdb80ae625ac21910061cb',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        price,
        geometry: {
          type: 'Point',
          coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude,
          ]
      },
        images: [
          {
            url: 'https://res.cloudinary.com/dygreelt2/image/upload/v1690409000/YelpCamp/totkgpet7ew3rgng7cqn.jpg',
            filename: 'YelpCamp/totkgpet7ew3rgng7cqn',
          },
          {
            url: 'https://res.cloudinary.com/dygreelt2/image/upload/v1690409000/YelpCamp/uvlkpaxd6gyzquusxhyj.jpg',
            filename: 'YelpCamp/uvlkpaxd6gyzquusxhyj',
          }
        ]
      })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
