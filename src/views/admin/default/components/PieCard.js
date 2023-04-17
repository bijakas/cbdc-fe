// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartData } from "variables/charts";

import { VSeparator } from "components/separator/Separator";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;
  const pieChartOptions = {
    labels: props.series,
   // colors: ["#4318FF", "#6AD2FF", "#EFF4FB", "#EFF4FB"],
    chart: {
      width: "60px",
      type: 'donut'
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#111']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderWidth: 0
      }
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: true,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      //colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    
  };
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p='20px' align='center' direction='column' w='100%'  h='100%'  {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
        {props.title}
        </Text>
        {/* <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='daily'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select> */}
      </Flex>

      <PieChart
        
        chartData={props.pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
          
              </Card>
    </Card>
  );
}
