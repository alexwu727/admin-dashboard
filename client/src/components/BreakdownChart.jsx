import React from 'react'
import { useGetSalesQuery } from 'state/api'
import { ResponsivePie } from '@nivo/pie'
import { Box, Typography, useTheme } from '@mui/material'

const BreakdownChart = ({ isDashboard = false }) => {
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery()

    if (isLoading) return <div>Loading...</div>

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ]
    // format data for nivo, use data.salesByCategory and format in {id, label, value, color}
    console.log(data.salesByCategory);
    const formattedData = Object.entries(data.salesByCategory).map(([key, value], index) => {
        return {
            id: key,
            label: key,
            value,
            color: colors[index],
        }
    })
    return (
        <Box
            height={isDashboard ? "400px" : "75vh"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    fontSize: isDashboard ? 12 : 20,
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
                                fontSize: 14,
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
                colors={{ datum: 'data.color' }}
                margin={
                    isDashboard ?
                        { top: 40, right: 80, bottom: 100, left: 50 } :
                        { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.45}
                padAngle={2}
                cornerRadius={10}
                borderWidth={3}
                borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
                enableArcLabels={!isDashboard}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={{ from: 'color' }}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                slicesLabelsTextColor="#333333"
                activeOuterRadiusOffset={8}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 120,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: theme.palette.secondary[500],
                                },
                            },
                        ],
                    },
                ]}

            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard ? 'translate(-75%, -170%)' : 'translate(-50%, -100%)',
                }}
            >
                <Typography variant="h4">
                    {!isDashboard && "Total:"} ${data.yearlySalesTotal}
                </Typography>
            </Box>
        </Box>

    )
}

export default BreakdownChart