import React from "react";
import UserTradeList from "./UserTradeList";

export default function TradeRoom() {
  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl p-5 bg-gray-200 my-4 rounded-lg shadow">
      <h1 className="text-3xl">Trade Room</h1>
      <div className="flex justify-between w-full p-2 my-4">
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
          <UserTradeList />
        </div>
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-96">
          ChatRoom
        </div>
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
          <UserTradeList />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-black border-2 w-full h-72 my-4">
        Trading Space
      </div>
    </div>
  );
}
