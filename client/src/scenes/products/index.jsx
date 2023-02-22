import React, { useState } from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import { useGetProductsQuery } from 'state/api'
const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.ult,
                borderRadius: "0.55rem"
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating name="read-only" value={rating} readOnly />
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Hide" : "Show"}
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography> Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                    <Typography> Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card >
    )
}

const LoadingCards = ({ count }) => {
    const result = [];
    const theme = useTheme();
    for (let i = 0; i < count; i++) {
        result.push(
            <Card key={i}
                sx={{
                    height: "200px",
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.ult,
                    borderRadius: "0.55rem"
                }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                        Loading
                    </Typography>
                    <Typography variant="h5" component="div">
                        Loading
                    </Typography>
                    <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                        Loading
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return result;
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const isNotMobile = useMediaQuery("(min-width:1000px)");
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Products" subtitle="Browse our products" />
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns={isNotMobile ? "repeat(3, 1fr)" : "1fr"}
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                    "& > div": { gridColumn: isNotMobile ? undefined : "span 4" }
                }}
            >
                {data || !isLoading
                    ?
                    <>
                        {data.map(({ _id, name, description, price, rating, category, supply, stat }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                name={name}
                                description={description}
                                price={price}
                                rating={rating}
                                category={category}
                                supply={supply}
                                stat={stat}
                            />
                        ))}
                    </>
                    :
                    <LoadingCards count={24} />}
            </Box>
        </Box>
    )
}

export default Products