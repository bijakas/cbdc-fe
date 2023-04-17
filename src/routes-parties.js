import React from "react";

import { Icon } from "@chakra-ui/react";

import {
  MdBarChart,
  MdShuffleOn,
  MdHome,
  MdLock,
  MdHub,
  MdDeleteSweep,
  MdMonitorHeart
  // MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
// import MainDashboard from "views/admin/default";
import ParticipantDashboard from "views/admin/participant";
import DataTables from "views/admin/dataTables";
// import Monitoring from "views/admin/monitoring";
import Transfer from "views/admin/transfer";
import Redemption from "views/admin/redemption";
// Auth Imports

const routesParties = [
  {
    name: "Participant Dashboard",
    layout: "/admin",
    path: "/participant",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: ParticipantDashboard,
  },
  {
    name: "Transaction History​",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  // {
  //   name: "Transaction Monitoring",
  //   layout: "/admin",
  //   icon: <Icon as={MdMonitorHeart} width='20px' height='20px' color='inherit' />,
  //   path: "/monitoring",
  //   component: Monitoring,
  // },
  {
    name: "New Redemption Request​",
    layout: "/admin",
    icon: <Icon as={MdDeleteSweep} width='20px' height='20px' color='inherit' />,
    path: "/redemption",
    component: Redemption,
  },
  {
    name: "New Single Credit Transfer",
    layout: "/admin",
    icon: <Icon as={MdShuffleOn} width='20px' height='20px' color='inherit' />,
    path: "/transfer",
    component: Transfer,
  },

];

export default routesParties;
