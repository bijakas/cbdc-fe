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
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Stat,
  StatGroup,
  StatHelpText,
  StatArrow,
  Flex,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniStatisticsParties from "components/card/MiniStatisticsParties";
import IconBox from "components/icons/IconBox";
import React from "react";
import { ExternalLinkIcon, ArrowDownIcon } from '@chakra-ui/icons'
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataStatIndices,
} from "views/admin/dataTables/variables/columnsData";
import tableDataStatIndices from "views/admin/dataTables/variables/tableDataStatIndices.json";

import {
  MdDeleteForever,

} from "react-icons/md";
import BannerParties from "views/admin/default/components/BannerParties";
// import LineChart from "components/charts/LineChart";

import {
  // lineChartDataTotalSpent,
  // lineChartOptionsTotalSpent,
  getLineChartOptionsTotalSpent
} from "variables/charts";

import { useQueries } from "@tanstack/react-query";
import axios from 'axios';
import ReactApexChart from "react-apexcharts";


export default function ParticipantDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("#045498", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "secondaryGray.100");
  const hostAddress = localStorage.getItem('host')
  const [tableSummary, tableHolder, tableIndices, tableTransaction] = useQueries({
    queries: [
      {
        refetchInterval: 4000,
        queryKey: ['dashboard'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/get-participant-dashboard`)
            .then((res) => res.data),
      },
      {
        refetchInterval: 4000,
        queryKey: ['holder'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/rupiah-holder`)
            .then((res) => res.data),
      },
      {
        // refetchInterval: 5000,
        queryKey: ['indices'],
        queryFn: () =>
            axios
                //.get(`${hostAddress}/statistical-indicator`)
                .get(`http://localhost:8080/statistical-indicator`)
                .then((res) => res.data),
    },
      {
        // refetchInterval: 5000,
        queryKey: ['spent'],
        queryFn: () =>
            axios
                .get(`${hostAddress}/get-summarized-state-by-time?date=2023/04/13`)
                //.get(`http://localhost:8080/get-summarized-state-by-time?date=2023/04/13`)
                .then((res) => res.data),
    },
    ],
  });

  if (tableIndices.isLoading) return 'Loading data...';
  if (tableIndices.error)
    return 'An error has occurred: ' + tableSummary.error.message;
  if (tableHolder.isLoading) return 'Loading data...';
  if (tableHolder.error)
    return 'An error has occurred: ' + tableHolder.error.message;
  if (tableTransaction.isLoading) return 'Loading data...';
  if (tableTransaction.error)
    return 'An error has occurred: ' + tableTransaction.error.message;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <SimpleGrid
        gap='20px'
        mb='20px'>
        <BannerParties />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatisticsParties
          progressValue={50}
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={ArrowDownIcon} color={brandColor} />
              }
            />
          }
          endContent={
            <>
              <StatGroup>
                <Stat>
                  <Flex justifyContent={"center"}>
                    <StatHelpText fontSize={"2xl"} >
                     {tableSummary.data.currentBalance}
                    </StatHelpText>
                  </Flex>

                </Stat>


              </StatGroup>
            </>
          }
          name='Current Balance'
          value='IDR 350 M'
        />
        <MiniStatisticsParties
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdDeleteForever} color={brandColor} />
              }
            />
          }
          endContent={
            <>
              <StatGroup>
                <Stat>
                  <StatHelpText fontSize={"xl"}>
                    <StatArrow type='increase' />
                    {tableSummary.data.issuance}
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatHelpText fontSize={"xl"}>
                    <StatArrow type='decrease' />
                    {tableSummary.data.redemption}
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </>
          }
          name='Issuance & Redemption'
          value='IDR 350 M'
        />
        <MiniStatisticsParties
          progressValue={70}
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={ExternalLinkIcon} color={brandColor} />
              }
            />
          }
          endContent={
            <>
              <StatGroup>
                <Stat>
                  <StatHelpText fontSize={"xl"}>
                    <StatArrow type='increase' />
                    {tableSummary.data.iftsender}
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatHelpText fontSize={"xl"}>
                    <StatArrow type='decrease' />
                    {tableSummary.data.iftreceiver}
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </>
          }
          name='Transfer'
          value='IDR 350 M'
        />
      </SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px' h="100%">
      <ComplexTable
                    columnsData={columnsDataStatIndices}
                    tableData={tableIndices.data.detail}
                />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
        
          <Box minH='260px' minW='75%' mt='auto' h="100%">
          <ReactApexChart
                        options={getLineChartOptionsTotalSpent(tableTransaction.data[0].data)}
                        series={[tableTransaction.data[1], tableTransaction.data[2], tableTransaction.data[3]]}
                        type='line'
                        width='100%'
                        mW='300px'
                    />
          </Box>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
