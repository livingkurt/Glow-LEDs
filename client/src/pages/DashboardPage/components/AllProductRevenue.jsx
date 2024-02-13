import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

const AllProductRevenue = ({ all_product_revenue }) => {
  return (
    <>
      {all_product_revenue.isSuccess && (
        <GLDisplayTable
          title="Product Sales"
          loading={all_product_revenue.isLoading && all_product_revenue?.data}
          rows={!all_product_revenue.isLoading && all_product_revenue?.data}
          defaultSorting={[2, "desc"]}
          columnDefs={[
            { title: "Name", display: "name", sortable: true },
            { title: "Revenue", display: row => `$${row.totalRevenue.toFixed(2)}`, sortable: true },
            { title: "Quantity Sold", display: "totalQuantity", sortable: true },
          ]}
        />
      )}
    </>
  );
};

export default AllProductRevenue;
