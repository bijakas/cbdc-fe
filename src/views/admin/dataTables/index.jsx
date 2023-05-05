/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataMonitoring
} from "views/admin/dataTables/variables/columnsData";
//import tableDataMonitoring from "views/admin/dataTables/variables/tableDataMonitoring.json";
import React from "react";
import { useQueries } from "@tanstack/react-query";
import axios from 'axios';


export default function Settings() {
  const hostAddress = localStorage.getItem('host')
  const apiStatus = (query, components) => {
    if (query.isLoading) { return <Spinner/>; }
    if (query.error) { return 'service temporarily not available'; }
    return components;
  }
  const [tableSummary] = useQueries({
    queries: [
      {
        refetchInterval: 4000,
        queryKey: ['posts'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/transaction-history`)
            .then((res) => res.data).catch(error => {
              throw new Error('Network response was not ok')
           })
      }
    ],
  });
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {apiStatus(tableSummary, <ComplexTable
          columnsData={columnsDataMonitoring}
          tableData={tableSummary.data}
        />) }

      </SimpleGrid>
    </Box>
  );
}
