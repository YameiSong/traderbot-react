import { AppDispatch, RootState } from '@/app/store';
import { Button } from '@/components/ui/button';
import { getMarkectChart } from '@/features/Coin/CoinSlice';
import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';

const timeSeries = [
    {
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1,
    },
    {
        key: "Time Series (Weekly)",
        label: "1 Week",
        value: 7,
    },
    {
        key: "Time Series (Monthly)",
        label: "1 Month",
        value: 30,
    },
    {
        key: "Time Series (Yearly)",
        label: "1 Year",
        value: 365,
    }
];

interface StockChartProps {
    coinId: string;
}

const StockChart: React.FC<StockChartProps> = ( {coinId} ) => {
    const dispatch = useDispatch<AppDispatch>();
    const coin = useSelector((state: RootState) => state.coin);

    const [activeTime, setActiveTime] = React.useState(1);
    const handleActiveLabel = (value: number) => { setActiveTime(value) };

    useEffect(() => {
        dispatch(getMarkectChart({coinId: coinId, days: activeTime}));
    }, [coinId, activeTime])

    const series = [
        {
            name: "Price",
            data: coin.marketChart?.prices?.map(([timestamp, price]: [number, number]) => ({
                x: new Date(timestamp).toISOString(),
                y: price
            })) || []
        }
    ];

    const options = {
        chart: {
            id: "area-datetime",
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime" as "datetime",
            tickAmount: 6
        },
        colors: ["#646cff"],
        markers: {
            colors: ['#FFFFFF'],
            strokeColors: '#FFFFFF',
            strokeWidth: 1,
            size: 0,
            style: 'hollow',
        },
        tooltip: {
            theme: "dark",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: "#47535E",
            strokeDashArray: 4,
            show: true
        }
    };
    return (
        <div>
            <div className="space-x-3 flex justify-start m-4">
                {timeSeries.map((time) =>
                    <Button
                        key={time.key}
                        variant={activeTime === time.value ? "default" : "secondary"}
                        onClick={() => handleActiveLabel(time.value)}
                    >
                        {time.label}
                    </Button>)}
            </div>
            <div className="chart-timelines">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    )
}

export default StockChart