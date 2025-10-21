require('dotenv').config();
const mongoose = require("mongoose");

// ✅ use only the URI with embedded credentials
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected - Seeding Data...");
}).catch(err => console.log("DB Connection Error: " + err));

const missionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

const Mission = mongoose.model("missions", missionSchema);

async function seed() {
    try {
        await Mission.deleteMany({}); // clear old data
        await Mission.insertMany([
            {
                id: 1,
                name: "Apollo 11",
                description: "First crewed mission to land on the Moon on July 20, 1969. Neil Armstrong and Buzz Aldrin became the first humans to walk on the lunar surface.",
                image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg",
                velocity: "11.08 km/s",
                distance: "384,400 km"
            },
            {
                id: 2,
                name: "Voyager 1",
                description: "Launched in 1977, Voyager 1 is the most distant human-made object from Earth, now in interstellar space, carrying the Golden Record.",
                image: "https://images-assets.nasa.gov/image/PIA21895/PIA21895~orig.jpg",
                velocity: "17 km/s",
                distance: "24 billion km"
            },
            {
                id: 3,
                name: "Mars Rover Curiosity",
                description: "Landed on Mars in 2012, Curiosity explores Gale Crater, studying Martian climate and geology to assess past habitability.",
                image: "https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jpg",
                velocity: "0.14 km/h",
                distance: "225 million km"
            },
            {
                id: 4,
                name: "Hubble Space Telescope",
                description: "Launched in 1990, Hubble has revolutionized astronomy with stunning images and discoveries about the universe's age, dark energy, and exoplanets.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg",
                velocity: "7.59 km/s",
                distance: "547 km orbit"
            },
            {
                id: 5,
                name: "Cassini-Huygens",
                description: "Studied Saturn and its moons from 2004-2017. Discovered liquid methane seas on Titan and water geysers on Enceladus.",
                image: "https://images-assets.nasa.gov/image/PIA08329/PIA08329~orig.jpg",
                velocity: "34 km/s",
                distance: "1.4 billion km"
            },
            {
                id: 6,
                name: "New Horizons",
                description: "First mission to Pluto in 2015, revealing its heart-shaped glacier and complex atmosphere. Now exploring the Kuiper Belt.",
                image: "https://images-assets.nasa.gov/image/PIA20037/PIA20037~orig.jpg",
                velocity: "14.31 km/s",
                distance: "5.9 billion km"
            },
            {
                id: 7,
                name: "James Webb Space Telescope",
                description: "Launched in 2021, JWST observes the universe in infrared, studying the first galaxies, star formation, and exoplanet atmospheres.",
                image: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000393/GSFC_20171208_Archive_e000393~orig.jpg",
                velocity: "0.4 km/s",
                distance: "1.5 million km"
            },
            {
                id: 8,
                name: "International Space Station",
                description: "A habitable space station in low Earth orbit since 2000, serving as a microgravity research laboratory for 16 nations.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/800px-International_Space_Station_after_undocking_of_STS-132.jpg",
                velocity: "7.66 km/s",
                distance: "408 km orbit"
            }
        ]);
        console.log("Seeding Complete 🚀✅");
    } catch (err) {
        console.error("Seeding failed ❌", err);
    } finally {
        process.exit();
    }
}

seed();
