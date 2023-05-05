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
import { Box, SimpleGrid, Text, Flex, Spacer, Container, Spinner } from "@chakra-ui/react";

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
    var todayDate = new Date().toISOString().slice(0, 10).replaceAll("-", "/");
    const [tableIndices, tableSpent, tableTransaction, processingTime] = useQueries({
        queries: [
            {
                // refetchInterval: 5000,
                queryKey: ['indices'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/statistical-indicator`)
//                         .get(`http://localhost:8080/statistical-indicator`)
                        .then((res) => res.data),
            },
            {
                // refetchInterval: 5000,
                queryKey: ['spent'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/get-summarized-state-by-time?date=${todayDate}`)
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

                    barChartOptionsGroupByParticipants["xaxis"]["categories"] = parties
                    const chartData = [{ name: "Issuance", data: issuanceArr }, { name: "IFT", data: transferArr }, { name: "Redemption", data: redemptionArr }]
                    return chartData;
                },
            }, {
                refetchInterval: 5000,
                queryKey: ['processingtime'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/processing-time`)
                        .then((res) => res.data),
            },
        ],
    });

    const getProcessingTime = (processingTime) => {
        if (processingTime.isLoading) return <Spinner />;
        if (processingTime.error)
            return 'An error has occurred: ' + processingTime.error.message;
        return <><Box>
            <Container centerContent fontSize={"35pt"}>
                <p>{processingTime.data.timeInMilisecond / 1000}<sup>ms</sup></p>
            </Container >
        </Box>
            <Spacer />
            <Box align='center' p='4' bg={processingTime.data.timeInMilisecond / 1000 < 2 ? "green.400" : "red.400"} fontSize={"15pt"} color={"white"}>
                {processingTime.data.timeInMilisecond / 1000 < 2 ? "Normal" : "Slow"}
            </Box></>
    }
    const getTableSpent = (tableSpent) => {
        if (tableSpent.isLoading) return <Spinner />;
        if (tableSpent.error)
            return 'An error has occurred: ' + tableSpent.error.message;
        return <ReactApexChart
            options={getLineChartOptionsTotalSpent(tableSpent.data[0].data)}
            series={[tableSpent.data[1], tableSpent.data[2], tableSpent.data[3]]}
            type='line'
            height={"230px"}
        />
    }
    const getTableIndices = (tableIndices) => {
        if (tableIndices.isLoading) return <Spinner />;
        if (tableIndices.error)
            return 'An error has occurred: ' + tableSpent.error.message;
        return <ComplexTable 
            width='100%'
            columnsData={columnsDataStatIndices}
            tableData={tableIndices.data.detail}
        />
    }
    const getTableTransaction = (tableTransaction) => {
        if (tableTransaction.isLoading) return <Spinner />;
        if (tableTransaction.error)
            return 'An error has occurred: ' + tableSpent.error.message;
        return <BarChart
        
            chartData={tableTransaction.data}
            chartOptions={barChartOptionsGroupByParticipants}
            height="100px"
        />
    }
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 1, xl: 2 }}
                spacing={{ base: "5px", xl: "5px" }}>

                <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} justifyContent={'center'} gap='10px' alignItems={"center"}>
                    <Card m='0px' align="center" border='1px'>

                        <Text fontSize='xl' fontWeight='bold'>
                            Operational Indicators
                        </Text>



                    </Card>
                    <SimpleGrid m='0px' columns={{ sm: 2, md: 2, xl: 2 }} justifyContent={'center'} gap='10px' alignItems={"center"} >
                        <Card align={"center"} border='1px'>
                            Business Day
                            <br />
                            <Text fontSize='m' fontWeight='bold'>
                                { new Date().toDateString()}
                            </Text>

                        </Card>
                        <Card align={"center"} border='1px'>
                            Connected Participants
                            <br />

                            <Text fontSize='m' fontWeight='bold' >
                                3
                            </Text>


                        </Card>
                    </SimpleGrid>

                    <Card border='1px'>
                        Processing Status
                        <Flex align='center' justifyContent={'center'} alignItems={'center'}>
                            {getProcessingTime(processingTime)}
                            {/* <Box>
                                <Container centerContent fontSize={"55pt"}>
                                    <p>{processingTime.data.timeInMilisecond/1000}<sup>ms</sup></p>
                                </Container >
                            </Box>
                            <Spacer />
                            <Box align='center' p='4' bg={processingTime.data.timeInMilisecond/1000 < 2 ? "green.400" : "red.400"} fontSize={"20pt"} color={"white"}>
                                {processingTime.data.timeInMilisecond/1000 < 2 ? "Normal" : "Slow"}
                            </Box> */}
                        </Flex>
                    </Card>
                </SimpleGrid>
                {/* <ComplexTable
                    columnsData={columnsDataStatIndices}
                    tableData={tableIndices.data.detail}
                /> */}
                {getTableIndices(tableIndices)}
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }}
                minH='400px'
                gap='10px'
                mb='20px'>
                {/* <Box bg='tomato' w='100%' p={4} color='white'>
  This is the Box
</Box> */}
                <Card maxH="350px">
                    Total Transaction Volume
                    {getTableSpent(tableSpent)}
                    {/* <ReactApexChart
                        options={getLineChartOptionsTotalSpent(tableSpent.data[0].data)}
                        series={[tableSpent.data[1], tableSpent.data[2], tableSpent.data[3]]}
                        type='line'
                        width='100%'
                        mW='300px'
                    /> */}

                </Card>
                <Card  maxH="350px">
                    Transaction Amount By Participants
                    {getTableTransaction(tableTransaction)}
                    {/* <BarChart
                        chartData={tableTransaction.data}
                        chartOptions={barChartOptionsGroupByParticipants}
                    /> */}
                </Card>
            </SimpleGrid>
        </Box>
    );
}
