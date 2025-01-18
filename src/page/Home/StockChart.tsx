import { Button } from '@/components/ui/button';
import React from 'react'
import ReactApexChart from 'react-apexcharts'

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
    }
];

const StockChart = () => {
    const [activeTime, setActiveTime] = React.useState(1);
    const handleActiveLabel = (value: number) => { setActiveTime(value) };
    const series = [
        {
            data: [
                [1734591822717, 101127.784397697],
                [1734595431802, 101633.081546774],
                [1734598972754, 101673.239994366],
                [1734602464092, 101744.02466948],
                [1734606229410, 102392.354753159],
                [1734609838230, 102387.297922233],
                [1734613434700, 101909.814249702],
                [1734617033949, 101863.069270146],
                [1734620496158, 101197.407100025],
                [1734624229233, 100551.818014283],
                [1734627740724, 100586.345455708],
                [1734631666483, 98143.2079733104],
                [1734634856008, 98759.7378515825],
                [1734638635279, 97157.3241180719],
                [1734642112531, 96448.901752501],
                [1734645634716, 97634.6174442195],
                [1734649432130, 98136.5193271677],
                [1734653028547, 97851.3537707581],
                [1734656627246, 97198.7968509462],
                [1734660194782, 96029.7899967946],
                [1734663830978, 97516.2050419872],
                [1734667438587, 97026.8582608009],
                [1734670800000, 97231.1783251926],
                [1734674573787, 96660.245673343],
                [1734678236172, 97418.381220568],
                [1734681827744, 97712.8300043893],
                [1734685398901, 95276.0133072501],
                [1734689033139, 94655.0077082303],
                [1734692636271, 94192.5046551231],
                [1734696153181, 92805.756669961],
                [1734699843486, 93865.8516499566],
                [1734703426073, 95496.0829761106],
                [1734707037744, 95642.3227598209],
                [1734710638433, 96855.1010785732],
                [1734714035762, 96645.7110175975],
                [1734717832106, 97234.7539505596],
                [1734721328246, 97267.9383846706],
                [1734725033849, 97048.5727819503],
                [1734728796024, 96362.6019522681],
                [1734732069790, 96608.9977811831],
                [1734735833509, 97430.3527686133],
                [1734739429174, 97691.4343169265],
                [1734743035587, 97507.8416204419],
                [1734746615347, 97367.8938904173],
                [1734750143621, 97359.7664052978],
                [1734753742955, 97412.5091877044],
                [1734757423874, 97516.5221543344],
            ]
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
            type: "datetime",
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
            <div className="space-x-3">
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