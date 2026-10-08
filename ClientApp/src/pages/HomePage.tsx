import CoffeeBeanBag from "../assets/coffee-bean-bag.png";

export function HomePage() {
  return (
    <div>
      <p>Pick a page from the menu.</p>
        <h1 >welcome to the Zetsel coffeegroup site</h1>
        <h3 >hier is de tekst voor introductie</h3>

        <p>dit is normale tekst Lorem ipsum dolor sit amet consectetur adipisicing elit. Et architecto temporibus maiores vel aliquid ullam quos aliquam? Nostrum similique exercitationem alias! Consequatur corporis dolor officiis incidunt fugiat ipsum maxime ea.</p>
        <img
                className="align-right medium"
                src={CoffeeBeanBag}
                alt="Coffee bean bag"
            />
    </div>
  );
}