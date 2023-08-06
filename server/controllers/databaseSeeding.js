const Destination = require('../models/destinations');

const destinations = [
    {
        img: "/place1_c.jpg",
        place: "Gardens by the Bay",
        description: "A mesmerizing fusion of nature and innovation, where lush gardens and iconic Supertrees create an enchanting urban oasis in Singapore.",
        location: "Mariana, Singapore",
        price: "79,999",
        url: "",
        id: 1
    },
    {
        img: "/place2_c.jpg",
        place: "South Island",
        description: "Nature's masterpiece awaits, a captivating realm of rugged landscapes and pristine beauty in New Zealand.",
        location: "South Island, New Zealand",
        price: "89,990",
        url: "",
        id: 2
    },
    {
        img: "/place3_c.jpg",
        place: "Grand Canyon",
        description: "Awe-inspiring testament to the Earth's history, where towering rock formations reveal the grandeur of time itself in the heart of the American Southwest.",
        location: "Grand Canyon, USA",
        price: "99,990",
        url: "",
        id: 3
    },
    {
        img: "/place4_c.jpg",
        place: "Jungfraujoch",
        description: "The 'Top of Europe,' where an extraordinary alpine journey leads to a snow-kissed haven and panoramic vistas in Switzerland.",
        location: "Jungfraujoch, Switzerland",
        price: "89,990",
        url: "",
        id: 4
    },
    {
        img: "/place5_c.jpg",
        place: "Eiffel Tower",
        description: "Paris' timeless emblem, an elegant iron masterpiece that stands as a symbol of romance and architectural grandeur.",
        location: "Eiffel Tower, France",
        price: "79,990",
        url: "",
        id: 5
    },
    {
        img: "/place6_c.jpg",
        place: "Colosseum",
        description: "Ancient echoes come alive, as history unfolds within the majestic walls of Rome's legendary amphitheater.",
        location: "Colosseum, Italy",
        price: "99,990",
        url: "",
        id: 6
    },
    {
        img: "/place7_c.jpg",
        place: "Tower Bridge",
        description: "London's iconic passage, a harmonious blend of Victorian engineering and architectural splendor spanning the River Thames.",
        location: "Tower Bridge, London",
        price: "99,990",
        url: "",
        id: 7
    },
    {
        img: "/place8_c.jpg",
        place: "Burj Khalifa",
        description: "Touch the sky at the world's tallest tower, an architectural marvel illuminating Dubai's skyline with modern grandeur.",
        location: "Burj Khalifa, UAE",
        price: "89,990",
        url: "",
        id: 8
    }
];

const clearDatabase = async () => {
  try {
    // Remove all records from the 'destinations' collection
    await Destination.deleteMany({});

    console.log('Database cleared successfully.');
  } catch (err) {
    console.error('Error clearing the database:', err);
  }
};

const seedDatabase = async () => 
{
    try 
    {
      for (const destination of destinations) 
      {
        const existingDestination = await Destination.findOne({ id: destination.id });
        
        if (!existingDestination) 
        {
          await Destination.create(destination);
          console.log(`Destination with id ${destination.id} inserted into the database.`);
        }
      }
  
      console.log('Database seeding complete.');
    } 
    catch (err) 
    {
      console.error('Error seeding the database:', err);
    }
};

module.exports = {
  seedDatabase,
  clearDatabase
};
