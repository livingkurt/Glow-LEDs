import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { humanize } from "../../../utils/helper_functions";

const AllProductRevenue = ({ all_product_revenue }) => {
  return (
    <>
      {all_product_revenue.isSuccess && (
        <GLDisplayTable
          title="Product Sales"
          loading={all_product_revenue.isLoading && all_product_revenue?.data}
          rows={
            !all_product_revenue.isLoading &&
            all_product_revenue?.data &&
            [...all_product_revenue.data].sort((a, b) => b.totalRevenue - a.totalRevenue)
          }
          columnDefs={[
            { title: "Name", display: "name" },
            { title: "Revenue", display: row => `$${row.totalRevenue.toFixed(2)}` },
            { title: "Quantity Sold", display: "totalQuantity" }
          ]}
        />
      )}
    </>
  );
};

export default AllProductRevenue;
