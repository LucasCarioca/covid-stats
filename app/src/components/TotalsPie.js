import React, {useEffect, useState} from 'react';
import {makeWidthFlexible, RadialChart} from "react-vis";

const FlexibleRadialChart = makeWidthFlexible(RadialChart);

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TotalsPie = () => {
    const [data, setData] = useState()
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/LucasCarioca/covidScraper/main/data.json')
            .then(async res => {
                const loaded = await res.json();
                setData(loaded);
            })
    }, [])

    const content = () => {
        return (
            <div>
                <FlexibleRadialChart
                    colorType="literal"
                    height={335}
                    data={[
                        {label: `Currently Infected ${numberWithCommas(data.currentlyInfected)}`, angle: data.currentlyInfected, color: '#ffeaa7' },
                        {label: `Dead ${numberWithCommas(data.deaths)}`, angle: data.deaths, color: '#ff7675'},
                        {label: `Recovered ${numberWithCommas(data.recovered)}`, angle: data.recovered, color: '#55efc4'}
                    ]}
                    labelsRadiusMultiplier={1}
                    labelsStyle={{
                        fontSize: '.90rem',
                        color: '#636e72',
                        fontWeight: 'bolder'
                    }}
                    showLabels
                />
            </div>
        )
    }

    return (
        <div>
            {data ? content() : <p>loading...</p>}
        </div>
    );
}

export default TotalsPie;
