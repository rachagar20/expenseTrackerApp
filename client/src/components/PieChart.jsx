import React from "react";
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { Box, Card, Grid } from "@mui/material";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js"

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);
const PieChart = ({ transactionDetails }) => {
    const user = useSelector((state) => state.auth.user)
    const categoryMapExpense = new Map();
    const categoryMapIncome = new Map();
    const generateRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.7)`;
            colors.push(color);
        }
        return colors;
    };
    function getNameById(category_id) {
        const category = user.categories?.find((eachCategoryObject) => category_id === eachCategoryObject._id)
        return category ? category.label : "NA"
    }

    transactionDetails?.forEach((transactions) => {
        const { category_id, amount, typeOfTrans } = transactions;
        if (typeOfTrans === "expense") {
            const category = getNameById(category_id);
            const existingAmount = categoryMapExpense.get(category) || 0;
            categoryMapExpense.set(category, existingAmount + amount);
        }else{
            const category = getNameById(category_id);
            const existingAmount = categoryMapIncome.get(category) || 0;
            categoryMapIncome.set(category, existingAmount + amount);
        }
    })
    const labelsExpense= Array.from(categoryMapExpense.keys());
    const dataPointsExpense = Array.from(categoryMapExpense.values());
    const labelsIncome= Array.from(categoryMapIncome.keys());
    const dataPointsIncome = Array.from(categoryMapIncome.values());



    const pieChartDataExpense = {
        labels: labelsExpense,
        datasets: [
            {
                data: dataPointsExpense,
                backgroundColor: generateRandomColors(labelsExpense.length),
            },
        ],
    }
    const optionsExpense = {
        plugins: {
            responsive: true,
            title: {
                display: true,
                text: 'EXPENSE FOR DIFFERENT CATEGORIES',
                font: {
                    size: 15,
                    weight: 'bold',
                },
            },
        },
    };
    const pieChartDataIncome = {
        labels: labelsIncome,
        datasets: [
            {
                data: dataPointsIncome,
                backgroundColor: generateRandomColors(labelsIncome.length),
            },
        ],
    }
    const optionsIncome = {
        plugins: {
            responsive: true,
            title: {
                display: true,
                text: 'INCOME FOR DIFFERENT CATEGORIES',
                font: {
                    size: 15,
                    weight: 'bold',
                },
            },
        },
    };
    return (
        <Box sx={{ width: "90%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Card sx={{ marginTop: 10, border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#FCF6F9", width: "40%" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Pie options={optionsExpense} data={pieChartDataExpense} />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ marginTop: 10, border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#FCF6F9", width: "40%" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Pie options={optionsIncome} data={pieChartDataIncome} />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )

}

export default PieChart;