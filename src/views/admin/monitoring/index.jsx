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
import { Box, SimpleGrid, Text, Flex, Spacer, Container } from "@chakra-ui/react";

// Assets
import React, { useState } from "react";

// import tableDataStatIndices from "views/admin/dataTables/variables/tableDataStatIndices.json";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import Card from "components/card/Card.js";

import {
    columnsDataStatIndices,
} from "views/admin/dataTables/variables/columnsData";

// import LineChart from "components/charts/LineChart";
import BarChart from "components/charts/BarChart";
import alasql from 'alasql';

import {
    lineChartOptionsTotalSpent1,
    getLineChartOptionsTotalSpent,
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
    barChartOptionsGroupByParticipants,
    barChartDataGroupByParticipants,

} from "variables/charts";

import { useQueries } from "@tanstack/react-query";
import axios from 'axios';

import ReactApexChart from "react-apexcharts";

export default function Monitoring() {
    const hostAddress = localStorage.getItem('host')
    const [tableOptionsSpent, setTableOptionsSpent] = useState([])
    // const [a, setA] = useState([{ data: [1, 1] }, { data: [1, 1] }, { data: [1, 1] }])
    const [tableIndices, tableSpent, tableTransaction, processingTime] = useQueries({
        queries: [
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
                onSuccess: (data) => {
                    setTableOptionsSpent(getLineChartOptionsTotalSpent(data[0].data));
                }
            },
            {
                // refetchInterval: 5000,
                queryKey: ['transactions'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/get-amount-by-participant`)
                        //.get(`http://localhost:8080/get-amount-by-participant`)
                        .then((res) => res.data),
                select: (data) => {
                    console.log([data]);
                    const parties = [];
                    let issuanceArr = [];
                    let transferArr = [];
                    let redemptionArr = [];
                    for (let i of data) {
                        parties.push(i.name)
                        issuanceArr.push(i.issuance);
                        transferArr.push(i.ift);
                        redemptionArr.push(i.redemption);
                    }
                    const chartData = [{ data: issuanceArr }, { data: transferArr }, { data: redemptionArr }]
                    return chartData;
                },
            }, {
                refetchInterval: 5000,
                queryKey: ['/processingtime'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/processing-time`)
                        .then((res) => res.data),
            },
        ],
    });

    if (tableIndices.isLoading) return 'Loading data...';
    if (tableIndices.error)
        return 'An error has occurred: ' + tableIndices.error.message;
    if (tableSpent.isLoading) return 'Loading data...';
    if (tableSpent.error)
        return 'An error has occurred: ' + tableSpent.error.message;
    if (tableTransaction.isLoading) return 'Loading data...';
    if (tableTransaction.error)
        return 'An error has occurred: ' + processingTime.error.message;
    if (processingTime.isLoading) return 'Loading data...';
    if (processingTime.error)
        return 'An error has occurred: ' + processingTime.error.message;

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 1, xl: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>

                <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} justifyContent={'center'} gap='20px' alignItems={"center"}>
                    <Card m='0px' align="center" border='1px'>

                        <Text fontSize='2xl' fontWeight='bold'>
                            Operational Indicators
                        </Text>



                    </Card>
                    <SimpleGrid m='0px' columns={{ sm: 2, md: 2, xl: 2 }} justifyContent={'center'} gap='20px' alignItems={"center"} >
                        <Card align={"center"} border='1px'>
                            Business Day
                            <br />
                            <Text fontSize='xl' fontWeight='bold'>
                                Jumat, 31 Maret 2023
                            </Text>

                        </Card>
                        <Card align={"center"} border='1px'>
                            Connected Participants
                            <br />

                            <Text fontSize='2xl' fontWeight='bold' >
                                120
                            </Text>


                        </Card>
                    </SimpleGrid>

                    <Card border='1px'>
                        Processing Status
                        <Flex align='center' justifyContent={'center'} alignItems={'center'}>
                            <Box>
                                <Container centerContent fontSize={"55pt"}>
                                    <p>{processingTime.data.timeInMilisecond/1000}<sup>ms</sup></p>
                                </Container >
                            </Box>
                            <Spacer />
                            <Box align='center' p='4' bg={processingTime.data.timeInMilisecond/1000 < 2 ? "green.400" : "red.400"} fontSize={"20pt"} color={"white"}>
                                {processingTime.data.timeInMilisecond/1000 < 2 ? "Normal" : "Slow"}
                            </Box>
                        </Flex>
                    </Card>
                </SimpleGrid>
                <ComplexTable
                    columnsData={columnsDataStatIndices}
                    tableData={tableIndices.data.detail}
                />
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
                minH='400px'
                gap='20px'
                mb='20px'>
                {/* <Box bg='tomato' w='100%' p={4} color='white'>
  This is the Box
</Box> */}
                <Card>
                    Total Transaction Volume
                    {/* <LineChart
                        chartData={tableSpent.data}
                        chartOptions={lineChartOptionsTotalSpent}
                    /> */}
                    <ReactApexChart
                        options={getLineChartOptionsTotalSpent(tableSpent.data[0].data)}
                        series={[tableSpent.data[1], tableSpent.data[2], tableSpent.data[3]]}
                        type='line'
                        width='100%'
                        mW='300px'
                    />

                </Card>
                <Card>
                    Transaction Amount By Participants<BarChart
                        chartData={tableTransaction.data}
                        chartOptions={barChartOptionsGroupByParticipants}
                    /></Card>
            </SimpleGrid>
        </Box>
    );
}
