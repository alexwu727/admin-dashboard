import React, { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api'


const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery()
    const [totalSalesLine, totalUnitsLine, accumulatedSalesLine, accumulatedUnitsLine] = useMemo(() => {
        if (!data) return []
        const { monthlyData } = data
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
        const accumulatedSalesLine = {
            id: 'Accumulated Sales',
            color: theme.palette.secondary.main,
            data: [],
        }
        const accumulatedUnitsLine = {
            id: 'Accumulated Units',
            color: theme.palette.secondary[600],
            data: [],
        }
        console.log("monthlyData: ", Object.values(monthlyData));
        Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
            acc.totalSales += totalSales
            acc.totalUnits += totalUnits
            totalSalesLine.data.push({ x: month, y: totalSales })
            totalUnitsLine.data.push({ x: month, y: totalUnits })
            accumulatedSalesLine.data.push({ x: month, y: acc.totalSales })
            accumulatedUnitsLine.data.push({ x: month, y: acc.totalUnits })
            return acc
        }, { totalSales: 0, totalUnits: 0 })
        return [totalSalesLine, totalUnitsLine, accumulatedSalesLine, accumulatedUnitsLine]
    }, [data])
    if (!data || isLoading) return "Loading..."


    return (
        <ResponsiveLine
            // data decided by view, there are 4 options
            data={view === 'totalSales' ? [totalSalesLine] : view === 'totalUnits' ? [totalUnitsLine] : view === 'accumulatedSales' ? [accumulatedSalesLine] : [accumulatedUnitsLine]}
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
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3)
                    return v;
                },
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : `${view === 'totalSales' ? 'Total Sales' : view === 'totalUnits' ? 'Total Units' : view === 'accumulatedSales' ? 'Accumulated Sales' : 'Accumulated Units'}`,
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard ? [
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        justify: false,
                        translateX: 50,
                        translateY: 30,
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
                ] : undefined}
        />
    )
}

export default OverviewChart