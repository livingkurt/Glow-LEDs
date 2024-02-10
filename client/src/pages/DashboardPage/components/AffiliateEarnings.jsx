import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

const AffiliateEarnings = ({ year, month, affiliate_earnings_code_usage }) => {
  return (
    <GLDisplayTable
      title={`${
        year && month ? `${year} ${month}` : year ? year : month ? month : "All Time"
      } Affiliate Earnings Code Usage`}
      loading={affiliate_earnings_code_usage.isLoading && affiliate_earnings_code_usage.data}
      defaultSorting={[2, "desc"]}
      rows={
        !affiliate_earnings_code_usage.isLoading &&
        [...affiliate_earnings_code_usage.data].sort((a, b) => b.number_of_uses - a.number_of_uses)
      }
      columnDefs={[
        { title: "Ranking", display: (row, index) => `${index + 1}.`, sortable: true },
        { title: "Affiliate", display: row => row?.artist_name, sortable: true },
        { title: "Code Usage", display: row => (row.number_of_uses ? row?.number_of_uses : "0"), sortable: true },
        { title: "Earnings", display: row => `$${row.earnings ? row?.earnings?.toFixed(2) : "0:00"}`, sortable: true },
        { title: "Revenue", display: row => `$${row?.revenue ? row?.revenue?.toFixed(2) : "0:00"}`, sortable: true },
      ]}
    />
  );
};

export default AffiliateEarnings;
