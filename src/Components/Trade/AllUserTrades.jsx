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
  const [value, setValue] = useState("1");
  const [pendingTradesLiCount, setPendingTradesLiCount] = useState(0);
  const [ongoingTradesLiCount, setOngoingTradesLiCount] = useState(0);
  const [completedTradesLiCount, setCompletedTradesLiCount] = useState(0);
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
    const pendingTradesLiCount = document.querySelectorAll("#pendingTradesLiTab li").length;
    const ongoingTradesLiCount = document.querySelectorAll("#ongoingTradesLiTab li").length;
    const completedTradesLiCount = document.querySelectorAll("#completedTradesLiTab li").length;
    setPendingTradesLiCount(pendingTradesLiCount);
    setOngoingTradesLiCount(ongoingTradesLiCount);
    setCompletedTradesLiCount(completedTradesLiCount);
  }, [value]);

  return (
    <>
      <Box className="p-4 bg-black rounded-xl text-white" sx={{ width: "80%", mx: "auto", mt: 4 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab
                className="text-white"
                label={
                  <Badge badgeContent={pendingTradesLiCount} color="error">
                    Pending Trades
                  </Badge>
                }
                value="1"
              />
              <Tab
                className="text-white"
                label={
                  <Badge badgeContent={ongoingTradesLiCount} color="primary">
                    Ongoing Trades
                  </Badge>
                }
                value="2"
              />
              <Tab
                className="text-white"
                label={
                  <Badge badgeContent={completedTradesLiCount} color="success">
                    Completed Trades
                  </Badge>
                }
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel id="pendingTradesLiTab" value="1">
            {pendingInitiatorTrades.map((trade, index) => (
              <div key={index}>
                <li>
                  {" "}
                  <Link
                    className="link link-hover"
                    to={`/user-trades/pending/initiator?trade=${trade.id}`}
                  >
                    {console.log(`trade`, trade)}
                    Trade No.: {trade.id} - Awaiting
                    <span className="text-orange-500"> {trade.Acceptor.firstName} </span> to accept
                    the trade.
                  </Link>
                </li>
              </div>
            ))}
            {pendingAcceptorTrades.map((trade, index) => (
              <div key={index}>
                <li>
                  {" "}
                  <Link
                    className="link link-hover"
                    to={`/user-trades/pending/acceptor?trade=${trade.id}`}
                  >
                    Trade No.: {trade.id} - Awaiting your confirmation.
                  </Link>
                </li>
              </div>
            ))}
          </TabPanel>
          <TabPanel id="ongoingTradesLiTab" value="2">
            {ongoingTrades.map((trade, index) => (
              <div key={index}>
                <li>
                  <Link className="link link-hover" to={`/traderoom/${trade.id}`}>
                    Trade No. {trade.id} -{" "}
                    <span className="text-orange-500">{trade.Initiator.firstName}</span> &{" "}
                    <span className="text-orange-500">{trade.Acceptor.firstName}</span>
                  </Link>
                </li>
              </div>
            ))}
          </TabPanel>
          <TabPanel id="completedTradesLiTab" value="3">
            {completedTrades.map((trade, index) => (
              <div key={index}>
                <li>
                  <Link className="link link-hover" to={`/traderoom/${trade.id}`}>
                    Trade No.:{trade.id}
                  </Link>
                </li>
              </div>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
