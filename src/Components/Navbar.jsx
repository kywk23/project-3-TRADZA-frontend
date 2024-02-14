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
        className="text-white p-4 m-4"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div>
            {/* Logo or brand name */}
            <a className="btn btn-ghost font-bold text-4xl" href="/">
              T R A D I Z A
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-lg">
              <li>
                <a href="/home">Home</a>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <details>
                      <summary>
                        <a>Trades</a>
                      </summary>
                      <ul className="p-2 bg-black rounded-t-none text-sm w-48">
                        <li>
                          <a href="/browse-listings">Browse</a>
                        </li>
                        <li>
                          <a href="/user-trades">My Trades</a>
                        </li>

                        <li>
                          <a href="/mylistings">My Listings</a>
                        </li>
                        <li>
                          <a href="/add-listing">Add Listing</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
