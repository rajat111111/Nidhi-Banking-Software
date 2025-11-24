import InformationPage from "../../../../components/InformationPage";
import { useGetUserAllInterestPayoutlistQuery } from "../../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import PageLoader from "../../../../components/PageLoader";
import PageHeader from "../../../../components/PageHeader";

const ViewInterestPayouts = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserAllInterestPayoutlistQuery({ id });

  // API returns a single object, not an array
  const payoutData = data?.data || {};
  const payouts = payoutData?.payouts || [];

  console.log("API Response:", payoutData);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <PageHeader
            paddingBottom="0px"
            marginTop="30px"
            title="Interest Payout Details"
          />

          {payouts.length > 0 ? (
            payouts.map((payout, index) => {
              const key1 = ["Year", "No. of Days", "Interest", "Net Interest", "Status"];

              const pair1 = [
                payout.year || "N/A",
                payout.noOfDays || "N/A",
                payout.interest ? `₹ ${payout.interest}` : "N/A",
                payout.netInterest ? `₹ ${payout.netInterest}` : "N/A",
                payout.status === "Processed" ? (
                  <strong style={{ color: "#1F9C00" }}>Processed</strong>
                ) : (
                  <strong style={{ color: "#de1313ff" }}>Pending</strong>
                ),
              ];

              const key2 = ["Period", "Principal", "TDS", "Due By", "Processed"];

              const pair2 = [
                payout.period || "N/A",
                payout.principal ? `₹ ${payout.principal}` : "N/A",
                payout.tds ? `₹ ${payout.tds}` : "N/A",
                payout.dueBy || "N/A",
                payout.processed ? "Yes" : "No",
              ];

              return (
                <InformationPage
                  key={index}
                  key1={key1}
                  pair1={pair1}
                  key2={key2}
                  pair2={pair2}
                />
              );
            })
          ) : (
            <div
              style={{
                height: "30vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              No Payouts Found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewInterestPayouts;
