import { styled } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import DynamicButton from "../../../../components/DynamicButton";
import SubmitButtonLoader from "../../../../components/SubmitButtonLoader";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import WarningDialogBox from "../../../../components/WarningDialogBox";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetBasicFdAccountDetailsQuery,
  useRemoveFdAccountMutation,
} from "../../../../features/api/fdAccounts";

const listOfThings = [
  "Remove Saving Account and all its transactions.",
  "Remove transactions from accounting module.",
  "Remove all the tracking if any.",
  "Sequence numbers will get unused in future.",
  "May lead to data corruption if any inter link account transactions are present.",
  "No data backup will be provided for this action.",
];

const FdRemoveAccount = () => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { id } = useParams();
  const [removeFdAccount, { data, isLoading, isError, isSuccess, error }] =
    useRemoveFdAccountMutation();

  const { data: fdAccountBasicDetails } = useGetBasicFdAccountDetailsQuery({
    id,
  });

  const fdAccountId = fdAccountBasicDetails?.data?.fdId || "N/A";

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Remove Account" borderBottom="1px solid #DDDDEBBF" />
      <WarningContainer>
        <WarningText>
          Removing this Saving Account will delete the following details:
        </WarningText>
        <ListContainer>
          {listOfThings.map((item, index) => (
            <CurList key={index}>{item}</CurList>
          ))}
        </ListContainer>
      </WarningContainer>

      <ButtonContainer>
        <DynamicButton
          color="#7858C6"
          textColor="#FFFFFF"
          onClick={() => setOpen(true)}
          text={
            <SubmitButtonLoader
              text="Remove Account"
              texting="Removing"
              isLoading={false}
            />
          }
        />
        <DynamicButton
          borderColor="#ECEBF3"
          textColor="#000"
          color="#FFFFFF"
          text="Cancel"
        />
      </ButtonContainer>

      <WarningDialogBox
        open={open}
        setOpen={setOpen}
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        data={data}
        snackbar={snackbar}
        isLoading={isLoading}
        whereToNavigate="/fd-accounts"
        id={fdAccountId}
        performAction={removeFdAccount}
        setSnackbar={setSnackbar}
      />
    </>
  );
};

export default FdRemoveAccount;

const WarningContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ListContainer = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingLeft: "30px",
});

const WarningText = styled("p")({
  font: "500 16px Poppins",
  color: "#2C2C2C",
});

const CurList = styled("li")({
  font: "400 14px Poppins",
  color: "#2C2C2C",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
