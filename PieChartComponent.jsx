import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchDataAndExtractFilters, selectFilteredData } from "../store/slice/table";
import EmptyData from '../errorpage/EmptyData';

const PieGraphChart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataAndExtractFilters());
    }, [dispatch]);

    // Retrieve filtered data from Redux store
    const filteredData = useSelector(selectFilteredData);

    // Function to format data for the pie chart
    const formatDataForChart = (data) => {
        if (!data || data.length === 0) {
            return [];
        }

        // Create a map to store the total value for each label
        const labelMap = new Map();

        // Iterate over the data to calculate the total value for each label
        data.forEach((item) => {
            const label = `${item.Make}`; // Combine Make and Model for the label
            const value = item.Electric_Range;

            // If the label already exists in the map, update its total value
            if (labelMap.has(label)) {
                labelMap.set(label, labelMap.get(label) + value);
            } else {
                // Otherwise, add the label to the map with its initial value
                labelMap.set(label, value);
            }
        });

        // Convert the map to an array of objects with id, value, and label properties
        return Array.from(labelMap).map(([label, value]) => ({
            id: label, // Use label as the id for the pie slice
            value,
            label,
        }));
    };

    return (
        <div>
            <h2 className='view-subheading'>Electric Range Data Pie Chart</h2>
            {filteredData && filteredData.length > 0 ? (
                <PieChart
                    series={[{ data: formatDataForChart(filteredData) }]}
                    width={1200}
                    height={450}
                    options={{
                        pie: {
                            label: {
                                visible: false, // Hide labels
                            },
                        },
                    }}
                />
            ) : (
                <EmptyData />
            )}
        </div>
    );
};

export default PieGraphChart;
