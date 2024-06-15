import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from '@mui/x-charts/BarChart';
import { fetchDataAndExtractFilters, selectFilteredData } from "../store/slice/table";
import EmptyData from '../errorpage/EmptyData';

const GraphChart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataAndExtractFilters());
    }, [dispatch]);

    // Retrieve filtered data from Redux store
    const filteredData = useSelector(selectFilteredData);

    // Function to format data for the bar chart
    const formatDataForChart = (data) => {
        if (!data || data.length === 0) {
            return [];
        }
        
        // Extract necessary data for the chart
        return data.map((item) => ({
            name: `${item.Make}`, // Combine Make and Model for the bar label
            value: item.Electric_Range, // Use Electric_Range for the bar value
        }));

        // Extract necessary data for the chart
        // return data.map((item) => ({
        //     name: `${item.Make}`, // Combine Make and Model for the bar label
        //     value: item.Legislative_District, // Use Electric_Range for the bar value
        // }));
    };

    return (
        <div>
            <h2 className='view-subheading'>Electric Range Data Bar Chart</h2>
            {filteredData && filteredData.length > 0 ? (
                <BarChart
                    xAxis={[{ scaleType: 'band', data: formatDataForChart(filteredData).map((item) => item.name) }]}
                    series={[{ data: formatDataForChart(filteredData).map((item) => item.value) }]}
                    width={1200}
                    height={450}
                />
            ) : (
                <EmptyData />
            )}
        </div>
    );
};

export default GraphChart;
