import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";

export default function ListingsPage() {
  return (
    <div className="flex flex-col items-center py-1 text-3xl">
      <Link
        to="/categories"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4"
      >
        Back to Home
      </Link>
      <div className="flex flex-col items-center py-1 text-3xl">
        <h1>Listing</h1>
        <Link to={"/listings/index"}>
          <ListingCard />
        </Link>
        <Link to={"/listings/index"}>
          <ListingCard />
        </Link>
        <Link to={"/listings/index"}>
          <ListingCard />
        </Link>
      </div>
    </div>
  );
}
