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
import { Box, SimpleGrid} from "@chakra-ui/react";
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

  const [tableSummary] = useQueries({
    queries: [
      {
        refetchInterval: 4000,
        queryKey: ['posts'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/transaction-history`)
            .then((res) => res.data),
      }
    ],
  });

  if (tableSummary.isLoading) return 'Loading data...';
  if (tableSummary.error)
    return 'An error has occurred: ' + tableSummary.error.message;
  //Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        /> */}
        <ComplexTable
          columnsData={columnsDataMonitoring}
          tableData={tableSummary.data}
        />
      </SimpleGrid>
      {/* <Grid
      h='200px'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg='tomato' />
      <GridItem colSpan={2} bg='papayawhip' />
      <GridItem colSpan={2} bg='papayawhip' />
      <GridItem colSpan={4} bg='tomato' />
    </Grid> */}
    </Box>
  );
}
