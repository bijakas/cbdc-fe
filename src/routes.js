import React from "react";

import { Icon } from "@chakra-ui/react";

import {
  MdBarChart,
  MdShuffleOn,
  MdHome,
  MdLock,
  MdMonitorHeart,
  MdDeleteSweep
  // MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/dataTables";
import Monitoring from "views/admin/monitoring";
import Transfer from "views/admin/transfer";
import Redemption from "views/admin/redemption";
import Issuance from "views/admin/issuance";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routesAdmin = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Transaction History​",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Transaction Monitoring",
    layout: "/admin",
    icon: <Icon as={MdMonitorHeart} width='20px' height='20px' color='inherit' />,
    path: "/monitoring",
    component: Monitoring,
  },
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

  {
    name: "Issuance",
    layout: "/admin",
    icon: <Icon as={MdShuffleOn} width='20px' height='20px' color='inherit' />,
    path: "/issuance",
    component: Issuance,
  },

  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routesAdmin;
