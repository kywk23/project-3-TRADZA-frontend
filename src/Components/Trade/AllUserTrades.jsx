import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants.jsx";
import { Link } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";
// css imports
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Badge } from "@mui/material";

export default function AllUserTrades() {
  const [pendingInitiatorTrades, setPendingInitiatorTrades] = useState([]);
  const [pendingAcceptorTrades, setPendingAcceptorTrades] = useState([]);
  const [ongoingTrades, setOngoingTrades] = useState([]);
  const [pendingCompletedTrades, setPendingCompletedTrades] = useState([]);
  const [completedTrades, setCompletedTrades] = useState([]);
  const [value, setValue] = useState("");
  const [pendingTradesCount, setPendingTradesCount] = useState(0);

  const { currentUser } = useUserId();
  const userId = currentUser.id;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/trades/pending/initiator`, {
        params: {
          userId: userId,
          tradeStatus: "Pending",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPendingInitiatorTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/pending/acceptor`, {
        params: {
          userId: userId,
          tradeStatus: "Pending",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPendingAcceptorTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/ongoing`, {
        params: {
          userId: userId,
          tradeStatus: "Ongoing",
        },
      })
      .then((response) => {
        console.log(response.data);
        setOngoingTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/completed`, {
        params: {
          userId: userId,
          tradeStatus: "Completed",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompletedTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const pendingTradesLiCount = document.querySelectorAll("#pendingTradesTab li").length;
    console.log(`li count`, pendingTradesLiCount);
    setPendingTradesCount(pendingTradesLiCount);
  }, [value]);

  return (
    <>
      <Box className="p-4 bg-black rounded-xl text-white" sx={{ width: "80%", mx: "auto", mt: 4 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              {/* Use the Badge component to display the count */}
              <Tab
                className="text-white"
                label={
                  <Badge
                    badgeContent={pendingTradesCount > 0 ? pendingTradesCount : ""}
                    color="error"
                  >
                    Pending Trades
                  </Badge>
                }
                value="1"
              />
              <Tab className="text-white" label="Ongoing Trades" value="2" />
              <Tab className="text-white" label="Completed Trades" value="3" />
            </TabList>
          </Box>
          <TabPanel id="pendingTradesTab" value="1">
            <li>Item One</li>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>

      <div className="flex justify-evenly px-6">
        <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
          <h1 className="text-3xl my-4">Pending Trades</h1>
          <div className="border-black border-2 p-3 h-96 w-96">
            {pendingInitiatorTrades.map((trade, index) => (
              <div key={index}>
                <Link to={`/user-trades/pending/initiator?trade=${trade.id}`}>
                  Trade ID {trade.id} - Waiting for {trade.listingAcceptor} to accept!
                </Link>
              </div>
            ))}
            {pendingAcceptorTrades.map((trade, index) => (
              <div key={index}>
                <Link to={`/user-trades/pending/acceptor?trade=${trade.id}`}>
                  Trade ID {trade.id} - Waiting for you to accept!
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
          <h1 className="text-3xl my-4">Ongoing Trades</h1>
          <div className="border-black border-2 p-3 h-96 w-96">
            {ongoingTrades.map((trade, index) => (
              <div key={index}>
                <Link to={`/traderoom/${trade.id}`}>Trade ID {trade.id}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
          <h1 className="text-3xl my-4">Completed Trades</h1>
          <div className="border-black border-2 p-3 h-96 w-96">
            {completedTrades.map((trade, index) => (
              <div key={index}>
                <Link to={`/traderoom/${trade.id}`}>Trade ID {trade.id}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
