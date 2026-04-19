import bcrypt from 'bcrypt'
const data ={
    products: [
        {
          
          name: 'RedBull',
          category:'Drink',
          image: 'https://www.kindpng.com/picc/m/138-1383804_red-bull-png-image-background-red-bull-energy.png',
          price: 320,
          countInStock: 10,
          type:'Veg',
          rating: 4.5,
          numReviews: 10,
          description: 'Red Bull is a brand of energy drinks sold by Austrian company Red Bull GmbH. ',
        },
        {
          
          name: 'Mountain Dew',
          category: 'Drink',
          image: 'http://assets.stickpng.com/thumbs/587186d27b7f6103e35c6cc8.png',
          price: 60,
          countInStock: 20,
          type:'Veg',
          rating: 4.0,
          numReviews: 10,
          description: 'Mountain Dew is a carbonated soft drink brand produced and owned by PepsiCo',
        },
        {
         
          name: 'Sting',
          category: 'Drink',
          image: 'https://www.seekpng.com/png/detail/888-8887796_sting-strawberry-sting-energy-drink-india.png',
          price: 20,
          countInStock: 10,
          type:'Non-Veg',
          rating: 4.8,
          numReviews: 17,
description: 'Sting Energy Drink is a carbonated energy drink from PepsiCo International and produced by Rockstar Inc.',
        },
        {
          name: "McAloo Tikki Burger",
          category: "Burger",
          image: "/images/McAloo Tikki Burger.png",
          price: 89,
          countInStock: 100,
          type: "Veg",
          rating: 4.5,
          numReviews: 120,
          description: "Spicy potato patty burger"
        },
        {
          name: "McChicken Burger",
          category: "Burger",
          image: "/images/McChicken Burger.png",
          price: 109,
          countInStock: 80,
          type: "Non-Veg",
          rating: 4.6,
          numReviews: 150,
          description: "Crispy chicken burger"
        },
        {
          name: "McSpicy Chicken Burger",
          category: "Burger",
          image: "/images/McSpicy Chicken Burger.png",
          price: 129,
          countInStock: 70,
          type: "Non-Veg",
          rating: 4.8,
          numReviews: 200,
          description: "Spicy chicken delight"
        },
        {
          name: "McVeggie Burger",
          category: "Burger",
          image: "/images/McVeggie Burger.png",
          price: 79,
          countInStock: 90,
          type: "Veg",
          rating: 4.2,
          numReviews: 100,
          description: "Veggie patty burger"
        },
        {
          name: "Paneer Barbeque Sandwich",
          category: "Sandwich",
          image: "/images/Paneer Barbeque Sandwich.png",
          price: 99,
          countInStock: 60,
          type: "Veg",
          rating: 4.4,
          numReviews: 80,
          description: "BBQ paneer sandwich"
        },
        {
          name: "Cheese Macaroni Sandwich",
          category: "Sandwich",
          image: "/images/Cheese Macaroni Sandwich.png",
          price: 89,
          countInStock: 70,
          type: "Veg",
          rating: 4.3,
          numReviews: 90,
          description: "Cheesy macaroni sandwich"
        },
        {
          name: "Chocolate Peanut Butter",
          category: "Smoothy",
          image: "/images/Chocolate Peanut Butter.png",
          price: 110,
          countInStock: 40,
          type: "Veg",
          rating: 4.7,
          numReviews: 60,
          description: "Creamy chocolate peanut butter smoothy"
        },
        {
          name: "Dry fruit Smoothie",
          category: "Smoothy",
          image: "/images/Dry fruit Smoothie.png",
          price: 130,
          countInStock: 35,
          type: "Veg",
          rating: 4.9,
          numReviews: 50,
          description: "Nutritious dry fruit smoothy"
        },
        {
          name: "Samosa",
          category: "Snak",
          image: "/images/Samosa.png",
          price: 25,
          countInStock: 200,
          type: "Veg",
          rating: 4.6,
          numReviews: 300,
          description: "Traditional crispy samosa"
        },
        {
          name: "Kachori",
          category: "Snak",
          image: "/images/Kachori.png",
          price: 30,
          countInStock: 150,
          type: "Veg",
          rating: 4.5,
          numReviews: 250,
          description: "Fried kachori snack"
        }
      ],

}

export default data