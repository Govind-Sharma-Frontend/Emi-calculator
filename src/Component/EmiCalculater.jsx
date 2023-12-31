import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Select from "react-select";
import { calculateEmiApi } from "../Api/calculateEmi";

const EmiCalculater = () => {
  const monthsArray = [
    {
      id: 1,
      label: "12 Month",
      value: 12,
    },
    {
      id: 2,
      label: "6 Month",
      value: 6,
    },
    {
      id: 3,
      label: "3 Month",
      value: 3,
    },
  ];
  const [months, setMonths] = useState({ value: 12 });
  const [loanAmount, setLoanAmount] = useState(0);
  const [intrestRate, setIntrestRate] = useState(0);
  const [netEmiAmount, setNetEmiAmount] = useState(0);

  // console.log("netEmiAmount", netEmiAmount);

  // const CalculateNetAmountOfEmi = useQuery([loanAmount,intrestRate,months],async()=> calculateEmiApi({
  //   loanAmount:loanAmount,
  //   intrestRate:intrestRate,
  //   months:months?.value
  // }))

  // const handleCallEmiApi = async () => {
    
  // };

  const calculateEmi = async() => {
    const interest = (loanAmount * (intrestRate * 0.01)) / months?.value;
    // Calculating total payment
    const total = (loanAmount / months?.value + interest).toFixed(2);
    if (loanAmount && intrestRate) {
      setNetEmiAmount(total);
      console.log('sad');
    } else {
      setNetEmiAmount(0);
    }
    console.log('netEmiAmount',total);
    return await calculateEmiApi({
      loanAmount: loanAmount,
      interestRate: intrestRate,
      months: months?.value,
      netEmiAmount: total,
    });
  };
  return (
    <Container
      sx={{
        background: "#F5F5F5",
        py: 3,
      }}
    >
      <Typography textAlign={"center"} fontSize={30} fontWeight={700} my={3}>
        Emi
      </Typography>

      <Grid container>
        <Grid
          item
          xs={4}
          borderRight={"2px solid #cfc8c8"}
          paddingTop={4}
          paddingBottom={8}
          px={3}
        >
          <Typography
            fontSize={20}
            fontWeight={700}
            lineHeight={2.5}
            textAlign={"center"}
          >
            Loan Amount
          </Typography>
          <Box display={"flex"}>
            <input onInput={(e) => setLoanAmount(e?.target?.value)} />
            <Typography
              borderRadius={"0px 5px 5px 0px"}
              bgcolor={"#FFD40A"}
              width={"fit-content"}
              fontWeight={700}
              p={"10px"}
            >
              {" "}
              P.A{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          borderRight={"2px solid #cfc8c8"}
          paddingTop={4}
          paddingBottom={8}
          px={3}
        >
          {" "}
          <Typography
            fontSize={20}
            fontWeight={700}
            lineHeight={2.5}
            textAlign={"center"}
          >
            No. of payment
          </Typography>
          <Box display={"flex"}>
            {" "}
            <input value={months?.value} />
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={monthsArray[0]}
              onChange={(e) => {
                setMonths(e);
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: "44px",
                  border: "none",
                  width: "105px",
                  borderRadius: "0px 5px 5px 0px",
                  background: "#FFD40A",
                }),
                menuList: () => ({}),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: "2px 0px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  fontSize: "13px",
                  fontWeight: 600,
                  textAlign: "end",
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "#000" : "#000",
                }),
              }}
              options={monthsArray}
            />
            {/* <select
              style={{
                borderRadius: "0px 5px 5px 0px",
                background: "yellow",
                border: "none",
                outline:'none',
                verticalAlign:'center',
                width: "fit-content",
                fontWeight: 700,
                padding: "10px",
                height:'100%'
              }}
            >
              <option> 12 Months </option>
              <option> 6 Months </option>
              <option> 3 Months </option>
            </select> */}
          </Box>
        </Grid>
        <Grid item xs={4} paddingTop={4} paddingBottom={8} px={3}>
          <Typography
            fontSize={20}
            fontWeight={700}
            lineHeight={2.5}
            textAlign={"center"}
          >
            Intrest
          </Typography>
          <Box display={"flex"}>
            <input
              onInput={(e) => {
                setIntrestRate(e?.target?.value);
              }}
            />
            <Typography
              borderRadius={"0px 5px 5px 0px"}
              bgcolor={"#FFD40A"}
              width={"fit-content"}
              fontWeight={700}
              p={"10px"}
            >
              {" "}
              %{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box py={4}>
        <Typography
          fontSize={20}
          fontWeight={700}
          lineHeight={2.5}
          textAlign={"center"}
        >
          Total Loan Amount
        </Typography>
        <Box display={"flex"} width={"fit-content"} m={"auto"}>
          <input value={netEmiAmount} style={{ width: "260px" }} />
          <Typography
            borderRadius={"0px 5px 5px 0px"}
            bgcolor={"#FFD40A"}
            width={"fit-content"}
            fontWeight={700}
            p={"10px"}
          >
            {" "}
            RS
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#FFD40A",
              marginLeft: "10px",
              color: "#000000",
              fontWeight: 800,
              ":hover": {
                background: "#FFD40A",
              },
            }}
            onClick={() => {
              calculateEmi();
              // setTimeout(() => {
              //   handleCallEmiApi();
              // }, 1500);
            }}
            disabled={loanAmount === 0 || intrestRate === 0}
          >
            Calculate
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmiCalculater;
