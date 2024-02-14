import { Card, Row, Col } from "react-bootstrap";
import Electronics from "../../Assets/Electronics.jpg";

export default function ListingCard({ listing }) {
  // Render users_first name instead of userId

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl text-white mb-5">
        <figure>
          <img src={Electronics} alt="elect" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {listing.name}
            <div className="badge badge-secondary">{listing.conditions}</div>
          </h2>
          <p style={{ fontSize: "17px" }}>
            <strong>{listing.description}</strong>
          </p>
          <p style={{ fontSize: "12px" }}>Listing Unique ID: {listing.id}</p>
          <p style={{ fontSize: "12px" }}>Listed By: {listing.userId}</p>

          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion - this is hard coded</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
      <div className="divider divider-info"></div>
    </>
  );
}
