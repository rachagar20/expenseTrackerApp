import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Box, Grid, Card, Typography } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js"
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const LineChartDash= ({ transactionDetails }) => {
    const now = dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();

    // Filter transactions for the current month
    const monthlyTransactions = transactionDetails.filter(transaction => {
        const transactionDate = dayjs(transaction.date);
        return transactionDate.year() === currentYear && transactionDate.month() === currentMonth;
    });

    const incomeData = monthlyTransactions
        .filter(item => item.typeOfTrans === "income")
        .map(eachTransactionObject => ({
            date: dayjs(eachTransactionObject.date).format("DD-MM-YYYY"),
            amount: eachTransactionObject.amount
        }));

    const expenseData = monthlyTransactions
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

    const chartOptions = {
        maintainAspectRatio:false,
        responsive:true,
        plugins: {
            title: {
                display: true,
                text: 'TRANSACTIONS FOR CURRENT MONTH', // Set your desired title here
                font: {
                    size: 18, // Adjust the font size as needed
                    weight: 'bold', // Set font weight (optional)
                },
            },
        },
    };

    return (
        <Card sx={{ border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#f7f9fc",width: "100%" }}>
                    <div className="canvas-container">
                    <Line data={totalData} options={chartOptions} />
                    </div>
        </Card>
    );
};

export default LineChartDash;
