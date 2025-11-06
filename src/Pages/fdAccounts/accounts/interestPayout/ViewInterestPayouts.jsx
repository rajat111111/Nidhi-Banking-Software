import InformationPage from "../../../../components/InformationPage";
import { useGetUserAllInterestPayoutlistQuery } from "../../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import PageLoader from "../../../../components/PageLoader";
import PageHeader from "../../../../components/PageHeader";

const ViewInterestPayouts = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserAllInterestPayoutlistQuery({ id });

  const payoutData = data?.data || [];

  console.log("payoutData:", payoutData);

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

          {payoutData.length > 0 ? (
            payoutData.map((account, index) => (
              <div key={index} style={{ marginBottom: "40px" }}>
                

                {account.payouts?.length > 0 ? (
                  account.payouts.map((payout, pIndex) => {
                    const key1 = [
                      "Year",
                      "No. of Days",
                      "Interest",
                      "Net Interest",
                      "Status",
                    ];

                    const pair1 = [
                      payout.year || "N/A",
                      payout.noOfDays || "N/A",
                      `₹ ${payout.interest}` || "N/A",
                      `₹ ${payout.netInterest}` || "N/A",
                      payout.status === "Processed" ? (
                        <strong style={{ color: "#1F9C00" }}>Processed</strong>
                      ) : (
                        <strong style={{ color: "#de1313ff" }}>Pending</strong>
                      ),
                    ];

                    const key2 = [
                      "Period",
                      "Principal",
                      "TDS",
                      "Due By",
                      "Processed",
                    ];

                    const pair2 = [
                      payout.period || "N/A",
                      `₹ ${payout.principal}` || "N/A",
                      `₹ ${payout.tds}` || "N/A",
                      payout.dueBy || "N/A",
                      payout.processed ? "Yes" : "No",
                    ];

                    return (
                      <InformationPage
                        key={pIndex}
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
                      padding: "20px",
                      textAlign: "center",
                      background: "#fafafa",
                      borderRadius: "10px",
                    }}
                  >
                    No payouts found for this account.
                  </div>
                )}
              </div>
            ))
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
              No Data Found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewInterestPayouts;
