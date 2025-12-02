import { styled } from "@mui/material";

const InformationPage = ({ key1 = [], pair1 = [], key2 = [], pair2 = [] }) => {
  return (
    <InfoPageMainContainer>
      <InfoColumn>
        {key1.map((key, index) => (
          <InformationContainer key={index}>
            <KeyValue>{key || "N/A"}</KeyValue>
            <p>:</p>
            <PairValue>{pair1[index] || "N/A"}</PairValue>
          </InformationContainer>
        ))}
      </InfoColumn>

      <InfoColumn>
        {key2.map((key, index) => (
          <InformationContainer key={index}>
            <KeyValue>{key || "N/A"}</KeyValue>
            <p>:</p>
            <PairValue>{pair2[index] || "N/A"}</PairValue>
          </InformationContainer>
        ))}
      </InfoColumn>
    </InfoPageMainContainer>
  );
};

export default InformationPage;

// ✅ Styles
const InfoPageMainContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "50px",
  padding: "15px",
  backgroundColor: "#F2F3F6BF",
  flexWrap: "wrap",
  marginTop: "20px"
});

const InfoColumn = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "300px",
});

const InformationContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "8px 12px",
  borderRadius: "6px",
});

const KeyValue = styled("p")({
  width: "200px",
  // backgroundColor:"green",
  color: "#8F8F8F",
  font: "400 14px Poppins",

});
const PairValue = styled("p")({
  width: "250px",
  // backgroundColor:"red",
  color: "#2C2C2C",
  font: "400 14px Poppins",

});
