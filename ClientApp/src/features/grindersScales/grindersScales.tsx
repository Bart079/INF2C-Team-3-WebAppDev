import "../../css/grindersScales.css";
import type {Item } from "../../types/Item";
import {ItemCard } from "../../components/ItemCards";
import coffeegrinder from "../../assets/coffeegrinder.jpg";
import coffeescale from "../../assets/coffeescale.jpg";
import "../../css/styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";

// npm run dev
//--host

export function GrindersScalesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
        async function loadItems() {
            try { /*fetch items */
                const response = await fetch("/items.json");

                if (!response.ok) { /* failed to fetch data */
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error(err);
                setError("Could not load items.");
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []);

    if (loading) {
        return <p>Loading items...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

  return (
    <>
    <h1>Grinders and Scales</h1>
    <GrindersScales items={items} />
    </>
  );
}
//de 4 blokken available, on hold, request, calibration props meegegeven
export function GrindersScales({items}: { items: Item[] }) {

    const { user } = useAuth();


    const requestedItems = items.filter(
    item => item.status === "requested"
    );

    const onholdItems = items.filter(
    item => item.status === "on hold"
    );

    const availableItems = items.filter(
    item => item.status === "available"
    );

    const calibratedItems = items.filter(
    item => item.status === "not available"
    );


  return (
    <>
      <section className="grinders_scales_intro">
        <h2 className="sub">
        Lend your scales and grinders here!
        </h2>

        <p className="text boxedintro">
        See what is available to borrow from other members of the Zetsel community. Sometimes we need to calibrate our scales and grinders, they will be available again after a few days.
        </p>

    </section>
    <div className="pagina">
      <div className= "card_list">
      <div className="status_groep">
          <h2>Available</h2>
          {availableItems.map(item => (
          <ItemCard key={item.name} item={item} />
          ))}
      </div>

        <div className="status_groep">
          <h2>On Hold</h2>
          {onholdItems.map(item => (
          <ItemCard key={item.name} item={item} 
          />
          ))}
        </div>

        <div className="status_groep">
          <h2>Request</h2>
          {requestedItems.map(item => (
          <ItemCard key={item.name} item={item} />
          ))}
        </div>

        <div className="status_groep">
          <h2>Calibration Needed</h2>
          {calibratedItems.map(item => (
          <ItemCard key={item.name} item={item} />
          ))}
        </div>
      </div>
      
      
      <div className="images">
        {user ? (
                <Link className="button-link spacedbutton" to="/requests">
                Make request
                </Link>
              ) : (
                <p>
                  <Link className="button-link spacedbutton" to="/login">login first to make requests</Link>
                </p>
              )}
        <img
        className="large coffee_grinder"
        src={coffeegrinder}
        alt="coffee grinder"
        />

        <img
          className="large scale"
          src={coffeescale}
          alt="scale"
        />
      </div>
    </div>
      </>
    )
  }

