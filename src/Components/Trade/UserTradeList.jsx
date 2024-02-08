import { useState } from "react";

export default function UserTradeList() {
  const [userListings, setUserListings] = useState(["Bag", "Clothes", "Wallet"]);
  const [user, setUser] = useState({
    id: 1,
    email: "test@gmail.com",
    firstName: "Jack",
  });

  //API Call: Get user details and UnSold userListings based on userId

  return (
    <div>
      <h1>Name: {user.firstName}</h1>
      <div className="my-2">
        <div>Unsold Items: </div>
        {userListings.map((listing, index) => (
          <div key={index}>{listing}</div>
        ))}
      </div>
    </div>
  );
}
