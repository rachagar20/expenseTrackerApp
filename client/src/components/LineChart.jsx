import React from "react";
import { Line } from 'react-chartjs-2';
import { Card, Grid } from "@mui/material";
import dayjs from "dayjs";

const LineChart = ({ transactionDetails }) => {

    const incomeData = transactionDetails
        .filter(item => item.typeOfTrans === "income")
        .map(eachTransactionObject => ({
            date: dayjs(eachTransactionObject.date).format("DD-MM-YYYY"),
            amount: eachTransactionObject.amount
        }));

    const expenseData = transactionDetails
        .filter(item => item.typeOfTrans === "expense")
        .map(eachTransactionObject => ({
            date: dayjs(eachTransactionObject.date).format("DD-MM-YYYY"),
            amount: eachTransactionObject.amount
        }));

    // Combine and deduplicate labels
    const allDates = [...incomeData, ...expenseData]
        .map(item => item.date)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => dayjs(a, "DD-MM-YYYY").unix() - dayjs(b, "DD-MM-YYYY").unix());

    // Align data points to labels
    const getDataPoints = (data, allDates) => {
        const dataMap = new Map(data.map(item => [item.date, item.amount]));
        return allDates.map(date => dataMap.get(date) || 0);
    };

    const incomePoints = getDataPoints(incomeData, allDates);
    const expensePoints = getDataPoints(expenseData, allDates);

    // Define dataset for the chart
    const totalData = {
        labels: allDates,
        datasets: [
            {
                label: "Income",
                data: incomePoints,
                borderColor: "green",
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            },
            {
                label: "Expense",
                data: expensePoints,
                borderColor: "red",
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }
        ]
    };

    // Chart options for responsiveness
    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'GRAPH REPRESENTING INCOME AND EXPENSES V/S DATE',
                font: {
                    size: 18,
                    weight: 'bold',
                }
            }
        },
        responsive: true,
    };

    return (
        <Card sx={{ marginTop: 10, border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#f7f9fc", width: "80%" }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <div className="canvas-container">
                        <Line data={totalData} options={chartOptions} />
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
};

export default LineChart;
