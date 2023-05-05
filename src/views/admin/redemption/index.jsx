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
    Box, SimpleGrid, FormControl, FormLabel, Text, Flex, Divider, Select, Input, Stack, Textarea, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, AlertDialogCloseButton, useDisclosure, Spinner, Progress
} from "@chakra-ui/react";
//import { Select, Option } from "@material-tailwind/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assets
import React from "react";

// import tableDataStatIndices from "views/admin/dataTables/variables/tableDataStatIndices.json";
// import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import Card from "components/card/Card.js";


// import {
//     columnsDataStatIndices,
// } from "views/admin/dataTables/variables/columnsData";

// import LineChart from "components/charts/LineChart";
// import BarChart from "components/charts/BarChart";

// import {
//     lineChartDataTotalSpent,
//     lineChartOptionsTotalSpent,
//     barChartOptionsGroupByParticipants,
//     barChartDataGroupByParticipants,

// } from "variables/charts";
import { useState } from "react";
// import { HashRouter, Route, Switch, useHistory } from "react-router-dom";
// import { AuthContext } from "../../../AuthContext";
import showAjaxLoader from "Utils";
import { useQueries } from "@tanstack/react-query";
import axios from 'axios';

export default function Redemption() {

    const hostAddress = localStorage.getItem('host');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState((new Date()).toLocaleDateString('en-CA'));
    // const [errmessage, setErrmessage] = React.useState("");
    const [tableSummary] = useQueries({
        queries: [
            {
                refetchInterval: 4000,
                queryKey: ['dashboard'],
                queryFn: () =>
                    axios
                        .get(`${hostAddress}/get-participant-dashboard`)
                        .then((res) => res.data),
            },
        ],
    });

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const sendRedemptionRequest = (amount) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${hostAddress}/redeem-with-priority?amount=${amount}&priority=5`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // const resObj = JSON.parse(result);
                //if (result.statusCode === 200) {
                    setMessage("Permintaan redemtion berhasil dikirim")
                    showAjaxLoader("Permintaan redemtion berhasil dikirim", "success")
                    setAmount(0);
               // } else {
                //     setMessage(result.statusMessage)
                //     showAjaxLoader(result.statusMessage, "success")
                //     setAmount(0);
                // }
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                showAjaxLoader("transaksi redemption gagal dilakukan", "error")
                setLoading(false);
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (amount <= 0) {
            showAjaxLoader("Jumlah amount harus lebih besar dari 0", "error")
        } else {
            setLoading(true);
            onOpen();
            sendRedemptionRequest(amount);
        }
    };
    if (tableSummary.isLoading) return <Spinner />;
        if (tableSummary.error)
            return 'An error has occurred: ' + tableSummary.error.message;
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                    size={"sm"}
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent >
                        <Box align="center" alignContent={"stretch"} alignItems={"stretch"}>
                            <AlertDialogBody>
                                {loading ? <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                /> : message}
                            </AlertDialogBody>
                        </Box>
                        {!loading ? <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Ok
                            </Button>
                        </AlertDialogFooter> : null}
                    </AlertDialogContent>
                </AlertDialog>
            </AlertDialog>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 1, xl: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl mr="5%">
                                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                    Available Balance
                                </FormLabel>
                                <Input id="first-name" defaultValue= {tableSummary.data.currentBalance} readOnly />
                            </FormControl>

                            <FormControl mr="5%" isRequired>
                                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                    Amount
                                </FormLabel>
                                <Flex align={'stretch'}>
                                    <NumberInput step={100000} placeholder='Amount' mr={"5px"} minW={"400px"} max={1000000000000000000} defaultValue={0} clampValueOnBlur={false} onChange={(e) => setAmount(e)}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Select placeholder='Currencies' defaultValue={"IDR"}>
                                        <option value='IDR' defaultChecked>IDR</option>
                                    </Select>
                                </Flex>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                    Date
                                </FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    type="date"
                                    defaultValue={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormControl>



                            <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
                                Details
                            </Text>
                            <Divider orientation='horizontal' />
                            <FormControl mr="5%">
                                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                    Additional Information​                        </FormLabel>
                                <Textarea placeholder='Additional Information​' />
                            </FormControl>

                            <Flex align={"start"}>
                                <Button colorScheme='blue' type="submit">Create</Button>
                                {/* <Toast/> */}
                                {/* <Button
      onClick={() =>
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button> */}
                                <ToastContainer />


                            </Flex>
                        </Stack>
                    </form>
                    {/* <div>
                        <button onClick={Toast({message:"Test"})}>pop!</button>
                    </div> */}
                </Card>


            </SimpleGrid>

        </Box>
    );
}
