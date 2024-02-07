import { useState } from "react";

export default function InitiateTrade() {
  const [wantedListing, setWantedListing] = useState([])
  const [offeredListing, setOfferedListing] = useState([]);

  const handleClick = () => {
    //API Call: post request to trade table
    
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Trade Initiation</h1>
        <div className="text-3xl p-2 my-4">You want this: </div>
        <img src="src/Assets/Electronics.jpg" className="my-8 w-80 h-60"></img>
        <div className="text-3xl p-2 my-4">What would you offer in return?</div>
        <Button
          style={{ margin: "1rem", backgroundColor: "darkcyan" }}
          onClick={handleClick}
        >
          Initiate Trade
        </Button>
      </div>
    </div>
  );
}
