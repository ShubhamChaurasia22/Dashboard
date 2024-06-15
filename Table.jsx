import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAndExtractFilters, selectFilteredData } from "../store/slice/table";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import EmptyData from "../errorpage/EmptyData";

export default function Table() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataAndExtractFilters());
  }, [dispatch]);

  // Select filtered data from Redux store
  const filteredData = useSelector(selectFilteredData);
  const isLoading = useSelector((state) => state.table.isLoading);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div className="heading-section">
          <h2 className="title">Table Dashboard</h2>
      </div>
      {/* Render CustomPaginationActionsTable with filtered data */}
      {filteredData.length > 0 ? <CustomPaginationActionsTable data={filteredData} /> : <EmptyData />}
    </>
  );
}
