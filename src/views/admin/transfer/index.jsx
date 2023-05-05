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
    Box, SimpleGrid, FormControl, FormLabel, Text, Flex, Divider, Select, Input, Stack, Textarea, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, AlertDialogCloseButton, useDisclosure, Spinner, Progress
} from "@chakra-ui/react";

// Assets
import React, { useState, useContext } from "react";
import Card from "components/card/Card.js";
import { AuthContext } from "../../../AuthContext";
import showAjaxLoader from "Utils";

export default function Transfer() {
    const defaultValue = (new Date()).toLocaleDateString('en-CA');
    const hostAddress = localStorage.getItem('host');
    const { user, allowwedUsers } = useContext(AuthContext);
    const [amount, setAmount] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    let selects = []
    let username = ''
    if (user){
        selects = allowwedUsers.filter(item => item !== user.username)
        username = user.username
    }
    const sendRedemptionRequest = (amount) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        setLoading(true);
        onOpen();
        fetch(`${hostAddress}/transfer-with-priority?amount=${amount}&receiver=O=${receiver.toUpperCase()}, L=Jakarta, C=ID&priority=3`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.statusCode === 200) {
                    showAjaxLoader("Permintaan transfer berhasil dikirim", "success")
                    setMessage("Permintaan transfer berhasil dikirim")
                    setAmount(0);
                    setReceiver("");
                } else {
                    showAjaxLoader("Permintaan transfer berhasil dikirim", "success")
                    setMessage("Permintaan transfer berhasil dikirim")
                }
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                onOpen();
                showAjaxLoader("proses transfer gagal", "error")
                setLoading(false);
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (receiver === "") {
            showAjaxLoader("Mohon pilih account institution", "error")
        }
        if (amount <= 0) {
            showAjaxLoader("Jumlah amount harus lebih besar dari 0", "error")
        } else {
            setLoading(true);
            sendRedemptionRequest(amount);
        }
    };

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

            <form onSubmit={handleSubmit}>
                <Card><SimpleGrid
                    mb='20px'
                    columns={{ sm: 1, md: 1, xl: 2 }}
                    spacing={{ base: "20px", xl: "20px" }}>
                    <Stack spacing={4}>
{/*                         <FormControl mr="5%" > */}
{/*                             <FormLabel htmlFor="first-name" fontWeight={'normal'}> */}
{/*                                 Reference */}
{/*                             </FormLabel> */}
{/*                             <Input id="first-name" placeholder="First name" /> */}
{/*                         </FormControl> */}

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
                            {/* <Select placeholder='Select' onChange={(e) => setReceiver(e.target.value)}>
                                <option value='BMRIIDJA'>BMRIIDJA</option>
                                <option value='CENAIDJA'>CENAIDJA</option>
                            </Select> */}
                            <Text fontWeight={'bold'}>
                                <Input id="first-name" placeholder="First name" value={username.toUpperCase()} readOnly={true} />
                            </Text>
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
                            <Select placeholder='Select' onChange={(e) => setReceiver(e.target.value)}>
                                {selects.map((i) =>
                                    <option value={i.toUpperCase()}>{i.toUpperCase()}</option>
                                )}
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
