import { useState } from "react";

export default function InitiatorPendingTrade() {
  const [initiatorListing, setInitiatorListing] = useState({
    name: "XBox",
    description: "Test",
  });
  const [acceptorListing, setAcceptorListing] = useState({
    name: "Iphone",
    description: "Test",
  });

  return (
    <div className="flex flex-col items-center py-1">
      <h1 className="text-3xl my-4">Pending Trade</h1>
      <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
        <div className="text-3xl p-2 my-4">
          Pending Status: Waiting for Other Party...
        </div>
        <div className="text-3xl p-2 my-4">You want this: </div>
        <div>{acceptorListing.name}</div>
        <div className="text-3xl p-2 my-4">You are offering this: </div>
        <div>{initiatorListing.name}</div>
      </div>
    </div>
  );
}
