import React from "react";
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { Box, Card, Grid } from "@mui/material";
import dayjs from "dayjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ transactionDetails }) => {
    const user = useSelector((state) => state.auth.user);
    const incomeDataByYear = {};
    const expenseDataByYear = {};

    transactionDetails?.forEach((transaction) => {
        const { amount, typeOfTrans, date } = transaction;
        const transactionDate = dayjs(date);
        const year = transactionDate.year();
        const month = transactionDate.month();

        if (!incomeDataByYear[year]) {
            incomeDataByYear[year] = new Array(12).fill(0);
            expenseDataByYear[year] = new Array(12).fill(0);
        }

        if (typeOfTrans === "income") {
            incomeDataByYear[year][month] += amount;
        } else if (typeOfTrans === "expense") {
            expenseDataByYear[year][month] += amount;
        }
    });

    const years = Object.keys(incomeDataByYear);
    const datasets = [];

    years.forEach((year) => {
        datasets.push({
            label: `Income ${year}`,
            data: incomeDataByYear[year],
            backgroundColor: `rgba(75, 192, 192, 0.7)`,
        });
        datasets.push({
            label: `Expense ${year}`,
            data: expenseDataByYear[year],
            backgroundColor: `rgba(255, 99, 132, 0.7)`,
        });
    });

    const barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: datasets,
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'INCOME AND EXPENSES PER MONTH',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        maintainAspectRatio:false,
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ width: "90%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Card sx={{ marginTop: 10, border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#f7f9fc", width: "90%" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <div className="canvas-container">
                        <Bar options={options} data={barChartData} />

                        </div>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default BarChart;
