import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import type {Item} from "../../types/Item";
import {ItemCard} from "../../components/ItemCards";
import "../../css/grindersScales.css";
import "../../css/styles.css";

export function DetailPageGrinders() {

const {id} = useParams(); //haal de id van items op

const [item, setItem] = useState<Item | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function loadItem() {
        try {
        setLoading(true);
        setError(null);
        setItem(null);

        const response = await fetch("/items.json"); // haal de hele lijst op

        if (!response.ok) {
            throw new Error("Unable to load item");
        }

        const data: Item[] = await response.json();

        //item en id 
        const selectedItem = data.find( // zoek de juiste item en vergelijk
        (item) => item.id === Number(id) 
        );

        if (!selectedItem) {
        setError("Item not found");
        return;
        }

        setItem(selectedItem);
        } 
        catch {
            setError("Unable to load item");
        } 
        finally {
            setLoading(false);
        }
    }

    loadItem();
    }, [id]);

    return (
    <section className="status_groep">
        <h1>Item details</h1>

    {loading && <p>Loading item...</p>}

    {error && <p role="alert">{error}</p>}

    {!loading && !error && item && (
        <div>
        <div className="detail_layout">
        <ItemCard item={item} />
        <div className="images">
        <img className="medium"
        src={item.image}
        alt={item.name}
        />
        </div>
        </div>

        <div className="boxedintro">
            <h2>Brand</h2>
            <p>{item.brand}</p>
            <h2>Description</h2>
            <p>{item.description}</p>
            <h2>Instructions</h2>
            <p>{item.instructions}</p>            
        </div>
        </div>
    )}

        <Link to="/grindersScales" className="button-link spacedbutton">
        Back to grinders & scales
        </Link>
    </section>
    );
}
