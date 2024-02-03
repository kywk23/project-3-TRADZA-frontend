import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold">
            {/* Logo or brand name */}
            <a href="/">Barter Trade</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          </div>
          <ul className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"}`}>
            {/* Navigation links */}
            <li>
              <a href="/categories">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/add-listing">Add Listing</a>
            </li>
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;