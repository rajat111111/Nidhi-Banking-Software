import { styled, Switch } from "@mui/material";
import DynamicButton from "../../../../components/DynamicButton";
import SubmitButtonLoader from "../../../../components/SubmitButtonLoader";

const UpgradeAccountType = () => {
  return (
    <UpgradeAccountSection>
      <FirstSection>
        <Text>Joint Account</Text>
        <Switch color="success" />
      </FirstSection>
      <FormContainer>
        {/* Member & Branch */}
        <FormRow>
          <FormContent>
            <FormLabel>Joint Member ID</FormLabel>
            <select style={{ width: "50%" }} name="" id="">
              <option value="">Select Member ID</option>
            </select>
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
  );
};

export default UpgradeAccountType;

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
const UpgradeAccountSection = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  backgroundColor: "#F2F3F6BF",
  padding: "30px",
});

const FirstSection = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
});

const Text = styled("div")({
  font: "400 14px Poppins",
  color: "#2C2C2C",
});
