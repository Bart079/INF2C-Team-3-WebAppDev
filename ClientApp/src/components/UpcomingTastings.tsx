import type { Tasting } from "../types/tasting";

type UpcomingTastingsProps = {
  tastings: Tasting[];
};

export function UpcomingTastings({ tastings }: UpcomingTastingsProps) {
  return (
    <table className="upcoming_tastings">
      <tbody>
        {tastings.map((tasting) => (
          <tr key={tasting.id}>
            <td>
              <p>Upcoming Tasting:</p>
              <p>Date: {tasting.date}</p>
              <p>Time: {tasting.time}</p>
              <p>Capacity: {tasting.capacity}</p>
              <p>Available spots: {tasting.availableSpots}</p>
              <p>Beans: {tasting.beans}</p>
              <button>I want to participate</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}