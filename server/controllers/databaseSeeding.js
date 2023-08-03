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
        img: "/place1_2.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 2
    },
    {
        img: "/place1_3.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 3
    },
    {
        img: "/place1_4.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 4
    },
    {
        img: "/place1_5.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 5
    },
    {
        img: "/place1_6.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 6
    },
    {
        img: "/place7_c.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 7
    },
    {
        img: "/place8_c.jpg",
        place: "Gardens by the Bay",
        description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
        location: "Singapore",
        price: 79999,
        url: "",
        id: 8
    }
];

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
};
