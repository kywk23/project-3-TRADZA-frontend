import { useState } from "react";

export default function UserTradeList({ user, userListings }) {
  return (
    <div>
      <h1>
        <strong>Name:</strong> {user.firstName}
      </h1>
      <div className="my-2">
        <div>
          <strong>Unsold Items: </strong>
        </div>
        {userListings.map((listing, index) => (
          <div key={index}>{listing.name}</div>
        ))}
      </div>
    </div>
  );
}
