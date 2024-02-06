import { Card, Button } from "react-bootstrap";

export default function ListingCard({listing}) {
  return (
    <Card style={{ width: "500px", height: "150px", marginTop:"1rem" }}>
      <Card.Body>
        <Card.Title>{listing.name}</Card.Title>
        <Card.Text style={{ fontSize: "16px" }}>
          {listing.description} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
