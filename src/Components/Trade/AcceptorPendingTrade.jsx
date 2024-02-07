import { useState } from "react";

export default function AcceptorPendingTrade() {
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
      <div className="flex flex-col items-center py-1">
        <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
          <div className="text-3xl p-2 my-4">
            Pending Status: Waiting for You to Accept
          </div>
          <div className="text-3xl p-2 my-4">Other Party wants this: </div>
          <div>{initiatorListing.name}</div>
          <div className="text-3xl p-2 my-4">Other Part can offer this: </div>
          <div>{acceptorListing.name}</div>
          <div className="flex my-4">
            <button className="bg-green-200 mx-2">Accept Trade</button>
            <button className="bg-green-200 mx-2">Reject Trade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
