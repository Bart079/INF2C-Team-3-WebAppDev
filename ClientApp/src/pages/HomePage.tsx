import Coffee_bevrages from "../assets/coffee-beverages.jpg";
import "../css/HomePage.css"

export function HomePage() {
  return (
    <div>
        <h1 >welcome to the Zetsel coffeegroup site</h1>
        <h2> Pick a page from the menu</h2>
        <div className= "homepage-images">
          <img
                className= "medium"
                src={Coffee_bevrages}
              alt="Coffee beverages"
            />
        </div>
        <p className="text boxedintro">dit is normale tekst Lorem ipsum dolor sit amet consectetur adipisicing elit. Et architecto temporibus maiores vel aliquid ullam quos aliquam? Nostrum similique exercitationem alias! Consequatur corporis dolor officiis incidunt fugiat ipsum maxime ea.</p>
        
    </div>
  );
}