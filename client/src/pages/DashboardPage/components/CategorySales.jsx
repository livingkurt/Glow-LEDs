import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { humanize } from "../../../utils/helper_functions";

const CategorySales = ({ category_range_revenue }) => {
  return (
    <>
      {category_range_revenue.isSuccess && (
        <GLDisplayTable
          title="Category Sales"
          loading={category_range_revenue.isLoading && category_range_revenue?.data}
          rows={
            !category_range_revenue.isLoading &&
            category_range_revenue?.data &&
            [...category_range_revenue.data]
              // .sort((a, b) => a._id.localeCompare(b._id))
              .sort((a, b) => b.revenue - a.revenue)
          }
          columnDefs={[
            { title: "Category", display: row => humanize(row._id) },
            { title: "Revenue", display: row => `$${row.revenue.toFixed(2)}` },
            { title: "Quantity Sold", display: "quantity" }
          ]}
        />
      )}
    </>
  );
};

export default CategorySales;
