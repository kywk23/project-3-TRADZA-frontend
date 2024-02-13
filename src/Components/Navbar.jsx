import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
//components import

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <nav
        className="z-30 text-white p-4"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div>
            {/* Logo or brand name */}
            <a className="btn btn-ghost font-bold text-4xl" href="/">
              T R A D I Z A
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          </div>
          <ul
            className={`font-mono m-2 md:flex space-x-7 ${
              isOpen ? "block" : "hidden"
            } md:ml-auto`}
          >
            {/* Navigation links */}
            <li>
              <a href="/home">Home</a>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <a href="/user-trades">My Trades</a>
                </li>
                <li>
                  <a href="/browse-listings">Browse</a>
                </li>
                <li>
                  <a href="/mylistings">My Listings</a>
                </li>
                <li>
                  <a href="/add-listing">Add Listing</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
