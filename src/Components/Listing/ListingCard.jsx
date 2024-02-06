import { Card, Row, Col } from "react-bootstrap";

export default function ListingCard({ listing }) {
  return (
    <Card style={{ width: "500px", height: "150px", marginTop: "1rem" }}>
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src="../src/Assets/Electronics.jpg"
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{listing.name}</Card.Title>
            <Card.Text style={{ fontSize: "16px" }}>
              Listing Unique ID: {listing.id}
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