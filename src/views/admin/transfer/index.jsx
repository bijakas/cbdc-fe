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
import { Box, SimpleGrid, FormControl, FormLabel, Text, Flex, Divider, Select, Input, Stack, Textarea, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

// Assets
import React, { useState } from "react";
import Card from "components/card/Card.js";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default function Transfer() {
    const defaultValue = (new Date()).toLocaleDateString('en-CA');
    const hostAddress = localStorage.getItem('host');
    const [amount, setAmount] = useState(0);
    const [receiver, setReceiver] = useState("");
    const sendRedemptionRequest = (amount) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${hostAddress}/transfer-with-priority?amount=${amount}&receiver=O=${receiver}, L=Jakarta, C=ID&priority=3`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // const resObj = JSON.parse(result);
                if (result.statusCode === 200) {
                    Toastify({
                        text: "Permintaan redemtion berhasil dikirim",
                        duration: 3000,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast();
                    setAmount(0);
                    setReceiver("");
                } else {
                    Toastify({
                        text: result.statusMessage,
                        duration: 3000,
                        style: {
                            background: "red",
                        }
                    }).showToast()
                }

            })
            .catch(error => {
                console.log('error', error);
                Toastify({
                    text: "Redemption failed",
                    duration: 3000,
                    style: {
                        background: "red",
                    }
                }).showToast();
            });
       
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(receiver === ""){
            Toastify({
                text: "Mohon pilih coresponder",
                duration: 3000,
                style: {
                    background: "red",
                }
            }).showToast();
        }
        if(amount<=0){
            Toastify({
                text: "Jumlah amount harus lebih besar dari 0",
                duration: 3000,
                style: {
                    background: "red",
                }
            }).showToast();
        } else {
            sendRedemptionRequest(amount);
        }
        // toast({
        //     title: 'Account created.',
        //     description: "We've created your account for you.",
        //     status: 'success',
        //     duration: 9000,
        //     isClosable: true,
        //   })
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <form onSubmit={handleSubmit}>
                <Card><SimpleGrid
                    mb='20px'
                    columns={{ sm: 1, md: 1, xl: 2 }}
                    spacing={{ base: "20px", xl: "20px" }}>
                    <Stack spacing={4}>
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Reference
                            </FormLabel>
                            <Input id="first-name" placeholder="First name" />
                        </FormControl>

                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Amount
                            </FormLabel>
                            <Flex align={'stretch'}>
                                <NumberInput placeholder='Amount' mr={"5px"} minW={"400px"} max={1000000000000000000} defaultValue={0} clampValueOnBlur={false} onChange={(e) => setAmount(e)} step={100000}>

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
                        <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
                            Debit
                        </Text>
                        <Divider orientation='horizontal' />
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Sender’s Correspondent

                            </FormLabel>
                            <Select placeholder='Select' onChange={(e) => setReceiver(e.target.value)}>
                                <option value='BMRIIDJA'>BMRIIDJA</option>
                                <option value='CENAIDJA'>CENAIDJA</option>
                            </Select>
                        </FormControl>

                        <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
                            Details
                        </Text>
                        <Divider orientation='horizontal' />
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Remittance Information
                            </FormLabel>
                            <Textarea placeholder='Remittance Information' />
                        </FormControl>


                    </Stack>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Priority
                            </FormLabel>
                            <Select placeholder='Priority' defaultValue={"NORMAL"}>
                                <option value='LOW'>LOW</option>
                                <option value='NORMAL'>NORMAL</option>
                                <option value='HIGH'>HIGH</option>

                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Date
                            </FormLabel>
                            <Input
                                placeholder="Select Date and Time"
                                type="date"
                                defaultValue={defaultValue}
                            />
                        </FormControl>
                        <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
                            Credit
                        </Text>
                        <Divider orientation='horizontal' />
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                Account with Institution
                            </FormLabel>
                            <Select placeholder='Select'>
                                <option value='CENAIDJA'>CENAIDJA – PT. BANK CENTRAL ASIA </option>
                                {/* <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option> */}
                            </Select>
                        </FormControl>
                        <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
                            Regulatory Reporting
                        </Text>
                        <Divider orientation='horizontal' />
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                FEAB
                            </FormLabel>
                            <Input id="first-name" placeholder="First name" />
                        </FormControl>
                        <FormControl mr="5%">
                            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                PTR
                            </FormLabel>
                            <Input id="first-name" placeholder="First name" />
                        </FormControl>
                    </Stack>

                    <Flex align={"end"}>
                        <Button colorScheme='blue' type="submit">Create</Button>
                    </Flex>


                </SimpleGrid>
                </Card>
            </form>
        </Box>
    );
}
