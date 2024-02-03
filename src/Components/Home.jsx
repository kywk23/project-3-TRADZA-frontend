import { Link } from "react-router-dom";
export default function Home() {
  const categories = [
    "electronics",
    "household",
    "books",
    "repair",
    "chores",
    "tuition",
  ];

  return (
    <>
      <h4 className="flex justify-center py-4 text-3xl">Home Page</h4>
      <div className="flex justify-center py-4 text-3xl">
        <div className="grid grid-cols-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex justify-center items-center border border-black p-4 h-32"
            >
              <Link to={"/categories/electronics"}>{category}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
