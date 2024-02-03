import { Card, Button } from "react-bootstrap";

export default function ListingCard() {
  return (
    <Card style={{ width: "500px", height: "150px", marginTop:"1rem" }}>
      <Card.Body>
        <Card.Title>Listing</Card.Title>
        <Card.Text style={{ fontSize: "16px" }}>
          Description 
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
