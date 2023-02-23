import React, { useState, useMemo } from 'react'
import { useGetSalesQuery } from 'state/api'
import { Box, useTheme, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import Header from 'components/Header'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Daily = () => {
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery()
    const [startDate, setStartDate] = useState(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState(new Date("2021-03-01"));

    const formattedData = useMemo(() => {
        if (isLoading) return []
        const { dailyData } = data
        const totalSalesLine = {
            id: 'Total Sales',
            color: theme.palette.secondary.main,
            data: [],
        }
        const totalUnitsLine = {
            id: 'Total Units',
            color: theme.palette.secondary[600],
            data: [],
        }
        dailyData.forEach(({ date, totalSales, totalUnits }) => {
            const dateObj = new Date(date);

            if (dateObj >= startDate && dateObj <= endDate) {
                const subDate = date.substring(date.indexOf('-') + 1)
                totalSalesLine.data.push({ x: subDate, y: totalSales })
                totalUnitsLine.data.push({ x: subDate, y: totalUnits })
            }
        })
        const formattedData = [totalSalesLine, totalUnitsLine]
        return formattedData
    }, [data, startDate, endDate])

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Daily Sales" subtitle="Daily sales and profit" />
            <Box height="75vh">
                <Box display="flex" justifyContent="flex-end" gap="1rem">
                    <Box>
                        <InputLabel> Start Date </InputLabel>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>
                    <Box>
                        <InputLabel> End Date </InputLabel>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>
                </Box>
                {data
                    ?
                    <ResponsiveLine
                        // data decided by view, there are 4 options
                        data={formattedData}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                    }
                                },

                                legend: {
                                    text: {
                                        fill: theme.palette.secondary[200],
                                        fontSize: 14,
                                    }
                                },
                                ticks: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: theme.palette.secondary[200],
                                    }
                                }
                            },
                            legends: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                    fontSize: 14,
                                }
                            },
                            tooltip: {
                                container: {
                                    color: theme.palette.primary.main,
                                }
                            }
                        }}
                        colors={{ datum: "color" }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 40,
                            legend: "Date",
                            legendOffset: 60,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Amount",
                            legendOffset: -50,
                            legendPosition: 'middle'
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={8}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 20,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                    :
                    <div>Loading...</div>
                }
            </Box>
        </Box>
    )
}

export default Daily