import Coffee_bevrages from "../assets/coffee-beverages.jpg";

export function HomePage() {
  return (
    <div>
        <h1 >welcome to the Zetsel coffeegroup site</h1>
        <h2> Pick a page from the menu</h2>
        <img
                className="align-right medium"
                src={Coffee_bevrages}
                alt="Coffee beverages"
            />

        <p className="text">dit is normale tekst Lorem ipsum dolor sit amet consectetur adipisicing elit. Et architecto temporibus maiores vel aliquid ullam quos aliquam? Nostrum similique exercitationem alias! Consequatur corporis dolor officiis incidunt fugiat ipsum maxime ea.</p>
        
    </div>
  );
}