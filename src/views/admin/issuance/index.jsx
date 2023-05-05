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
    Box, SimpleGrid, FormControl, FormLabel, Text, Flex, Divider, Select, Input, Stack, Textarea, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton
} from "@chakra-ui/react";
//import { Select, Option } from "@material-tailwind/react";

import showToast  from "Utils";
import showAjaxLoader  from "Utils";

// import 'react-toastify/dist/ReactToastify.css';

// Assets
import React from "react";
import Card from "components/card/Card.js";
import { useState } from "react";
// import Toastify from 'toastify-js'
// import "toastify-js/src/toastify.css"


export default function Isuance() {
    const hostAddress = localStorage.getItem('host');
    const [amount, setAmount] = useState(0);
    const [node, setNode] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sendIssuanceRequest = (amount) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        //fetch(`${hostAddress}/issuance?amount=${amount}&requester=O=${node}, L=Jakarta, C=ID`, requestOptions)
        fetch(`http://10.239.19.74:50005/issuance?amount=${amount}&requester=O=${node}, L=Jakarta, C=ID`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // const resObj = JSON.parse(result);
                               showToast("Permintaan issuance berhasil dikirim", "success");
                                    setAmount(0);
//                 if (result.statusCode === 200) {
//                     showToast("Permintaan issuance berhasil dikirim", "success");
//                     setAmount(0);
//                 } else {
//                     showToast(result.statusMessage, "error");
//                     setAmount(0);
//                 }
            })
            .catch(error => {
                console.log('error', error);
                showToast("transaksi issuance gagal dilakukan");
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (amount <= 0) {
            showToast("Jumlah amount harus lebih besar dari 0", "error");
        } else if (node === "") {
            showToast("Mohon memilih satu recipient", "error");
        }
        else {
            sendIssuanceRequest(amount);
        }
    };
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            {showAjaxLoader}
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
                                <Input id="first-name" defaultValue={"100000000000"} readOnly />
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
                            <FormControl mr="5%">
                                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                                    Sender’s Correspondent

                                </FormLabel>
                                <Select placeholder='Select' onChange={(e) => setNode(e.target.value)}>
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
                                    Additional Information​                        </FormLabel>
                                <Textarea placeholder='Additional Information​' />
                            </FormControl>

                            <Flex align={"start"}>
                                <Button colorScheme='blue' type="submit">Submit</Button>
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
