import { styled, Switch } from "@mui/material";
import InformationPage from "../../../../components/InformationPage";
import DynamicButton from "../../../../components/DynamicButton";
import SubmitButtonLoader from "../../../../components/SubmitButtonLoader";

const UpgradeAccountPlan = () => {

    const key1 = [
    "Plan Code",
    "Minimum Lockin Period",
    "Minimum Amount",
    "Tenure Type",
    "Interest Payout",
    "Saving Min Monthly Avg Bal",
    "Ladies Interest Rate",

  ];

  const pair1 = [
    "John Doe",
    "Savings",
    "01/01/2025",
    "Active",
    "Brother",
    "Main Branch",
    "Manager",
    "02/01/2025",
  ];

  const key2 = [
    "Plan Name",
    "Interest Locking Period",
    "Interest Rate",
    "Period",
    "Saving Lock in Amount",
    "Senior Citizen Interest Rate",
    "Ex-Service Interest Rate",
  ];

  const pair2 = [
    "hi",
    "Savings",
    "01/01/2025",
    "Active",
    "Brother",
    "Main Branch",
    "Manager",
  ];
  return (
    <UpgradeAccountPlanMainContainer>
     <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
     <UpgradeAccountSection>
      <FirstSection>
        <Text>Upgrade Account</Text>
        <Switch color="success" />
      </FirstSection>
         <FormContainer>
        {/* Member & Branch */}
        <FormRow>
          <FormContent>
            <FormLabel>Plan Name</FormLabel>
           <select name="" id="">
            <option value="">Select Plan</option>
           </select>
          </FormContent>
          <FormContent>
            <FormLabel>Balance</FormLabel>
            <input
              type="number"
              readOnly
              disabled
              placeholder="0.00"
              name="memberId"
            />
          </FormContent>
        </FormRow>




        {/* Actions */}
        <FormAction>
          <DynamicButton
            color="#7858C6"
            textColor="#FFFFFF"
            text={
              <SubmitButtonLoader
                //   isLoading={isLoading}
                text="Upgrade"
                texting="Upgrading"
              />
            }
            type="submit"
          />
          <DynamicButton
            borderColor="#ECEBF3"
            textColor="#000"
            color="#FFFFFF"
            text="Cancel"
          />
        </FormAction>
      </FormContainer>
     </UpgradeAccountSection>
    </UpgradeAccountPlanMainContainer>
  )
}

export default UpgradeAccountPlan


const UpgradeAccountPlanMainContainer=styled("div")({
  width:"100%",
  height:"auto",
  display:"flex",
  flexDirection:"column",

  gap:"30px"
})
const FirstSection=styled("div")({
  width:"100%",
  height:"auto",
  display:"flex",
justifyContent:"flex-start",
alignItems:"center",
  gap:"20px"
})
const FormContainer = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FormRow = styled("div")({
  width: "95%",
  display: "flex",
  alignItems: "center",
  gap: "5%",
});

const FormContent = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});



const FormLabel = styled("label")({
  font: "400 16px Poppins",
  color: "#2C2C2C",
});

const FormAction = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
const UpgradeAccountSection=styled("div")({
  width:"100%",
  height:"auto",
  display:"flex",
  flexDirection:"column",
  gap:"20px",
  backgroundColor:"#F2F3F6BF",
    padding:"30px",
})

const Text=styled("div")({
  font:"400 14px Poppins",
  color:"#2C2C2C"
})