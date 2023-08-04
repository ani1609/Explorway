const Destination = require('../models/destinations');

const destinations = [
    {
        img: "/place1_c.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 1
    },
    {
        img: "/place2_c.jpg",
        place: "South Island",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 2
    },
    {
        img: "/place3_c.jpg",
        place: "Grand Canyon",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 3
    },
    {
        img: "/place4_c.jpg",
        place: "Jungfraujoch",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 4
    },
    {
        img: "/place5_c.jpg",
        place: "Eiffel Tower",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 5
    },
    {
        img: "/place6_c.jpg",
        place: "Closseum",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 6
    },
    {
        img: "/place7_c.jpg",
        place: "Tower Bridge",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 7
    },
    {
        img: "/place8_c.jpg",
        place: "Burj Khalifa",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
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
