import { Card, Row, Col } from "react-bootstrap";

export default function ListingCard({ listing }) {
  return (
    <Card style={{ width: "500px", height: "200px", marginTop: "1rem" }}>
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src="../src/Assets/Electronics.jpg"
            style={{
              width: "100%",
              height: "80%",
              marginTop: "2rem",
              marginLeft: "1rem",
            }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{listing.name}</Card.Title>
            <Card.Text style={{ fontSize: "16px" }}>
              Listing Unique ID: {listing.id}
            </Card.Text>
            <Card.Text style={{ fontSize: "16px" }}>
              Listed By: {listing.userId}
            </Card.Text>
            <Card.Text style={{ fontSize: "16px" }}>
              Description: {listing.description}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
