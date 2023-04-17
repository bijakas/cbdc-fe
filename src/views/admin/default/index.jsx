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
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {ExternalLinkIcon, ArrowDownIcon } from '@chakra-ui/icons'
import ReactApexChart from "react-apexcharts";
import {
  MdDeleteForever,
} from "react-icons/md";
import PieCard from "views/admin/default/components/PieCard";
import Banner from "views/admin/marketplace/components/Banner";


import { useQueries } from "@tanstack/react-query";
import axios from 'axios';

export default function UserReports() {

  const hostAddress = localStorage.getItem('host');
  // Chakra Color Mode
  const brandColor = useColorModeValue("#045498", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "secondaryGray.100");
  const [tableSummary, tableHolder, tableHolderByTime, headerStat] = useQueries({
    queries: [
      {
        refetchInterval: 4000,
        queryKey: ['posts'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/all-transaction`)
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
        refetchInterval: 4000,
        queryKey: ['holderByTime'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/money-supply-by-record?numOfData=10&leap=60`,{
              headers: {
                "Content-Type" : 'application/x-www-form-urlencoded '
              }
             })
            .then((res) => res.data),
      },
      {
        refetchInterval: 4000,
        queryKey: ['headerStat'],
        queryFn: () =>
          axios
            .get(`${hostAddress}/get-KDR-info`)
            .then((res) => res.data),
      }
    ],
  });


  if (tableHolderByTime.isLoading) return 'Loading data...';
  var op = {
    series: [tableHolderByTime.data[1]],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: tableHolderByTime.data[0].data,
      }
    },

  };
  if (tableHolderByTime.error)
    return 'An error has occurred: ' + tableSummary.error.message;
    if (tableHolder.isLoading) return 'Loading data...';
    if (tableHolder.error)
      return 'An error has occurred: ' + tableHolder.error.message;
      if (headerStat.isLoading) return 'Loading data...';
    if (headerStat.error)
      return 'An error has occurred: ' + headerStat.error.message;
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
          <SimpleGrid
            gap='20px'
            mb='20px'>
              <Banner/>
          </SimpleGrid>
          <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
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
          name='Issuance'
          value={headerStat.data.TotalIssuance}
        />
        <MiniStatistics
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
          name='Redemption'
          value={headerStat.data.TotalRedemption}
        />
        <MiniStatistics
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
          name='Transfer'
          value={headerStat.data.TotalMoneyInCirculation}
        />
        
        {/* <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        /> */}

        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        /> */}

        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        /> */}

      </SimpleGrid>

      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px' h="100%">
      {/* <LineChart
            data={tableHolderByTime.data[1]}
            series={tableHolderByTime.data[0]}
          /> */}
    <ReactApexChart options={op.options} series={op.series} type="line" height={350} />

      {/* <ReactApexChart
                        // options={getLineChartOptionsTotalSpent(tableHolderByTime.data[0].data)}
                        options= {getLineChartOptionsTotalSpent(tableHolderByTime.data[0].data)}
                        series={[tableHolderByTime.data[1], tableHolderByTime.data[2], tableHolderByTime.data[3]]}
                        type='line'
                        width='100%'
                        mW='300px'
                    /> */}
      {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        <Box minH='260px' minW='75%' mt='auto' h="100%">

          <PieCard title={"W-Digital Rupiah Holder"} pieChartData={tableHolder.data.amount} series= {tableHolder.data.nodes}/>
        </Box>
          {/* <DailyTraffic /> */}
          {/* <PieCard /> */}
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
