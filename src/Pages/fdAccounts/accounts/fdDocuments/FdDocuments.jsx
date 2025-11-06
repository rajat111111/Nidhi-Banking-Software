import React from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import { Grid, styled } from "@mui/material";
import FormLabel from "../../../../components/FormLabel";
import DynamicButton from "../../../../components/DynamicButton";
import DynamicDataTable from "../../../../components/DynamicTable";

const FdDocuments = () => {
  const documentLists = [
    { label: "Pan Card" },
    { label: "Aadhar Card" },
    { label: "Voter ID" },
    { label: "Bank Statement" },
    { label: "Signature" },
    { label: "Driving License" },
    { label: "Photo" },
    { label: "Other" },
    { label: "Other Document File" },
  ];


    const columns = [
    { id: "id", label: "#", minWidth: 50 },

 

    { id: "documentName", label: "Document Name", minWidth: 100 },
    { id: "fileName", label: "File Name", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const rows=[]

  return (
    <>
      <PagesMainContainerStyle />
            <PageHeader title="Document Details" paddingBottom="0px"  />
            <DynamicDataTable rows={rows} columns={columns} />

      <PageHeader title="Upload Documents"  borderBottom="1px solid #DDDDEBBF" />

      <UploadingDocumentsForm>
        <Grid container spacing={2}>
          {documentLists.map((curList, i) => (
            <Grid
              item
              xs={12}   
              sm={6}    
              md={3}    
              key={i}
            >
              <FormContent>
                <FormLabel label={curList.label} />
                <input
                  style={{ paddingTop: "8px",cursor:"pointer" }}
                  type="file"
                  name={curList?.name}
                  id={curList?.id}
                  placeholder={curList?.placeholder}
                  value={curList?.value}
                  onChange={curList?.onChange}
                  onBlur={curList?.onBlur}
                />
              </FormContent>
            </Grid>
          ))}
        </Grid>
        <FormAction>
            <DynamicButton color="#7858C6" textColor="#fff" text="Save" />
            <DynamicButton variant="outlined" borderColor="#ECEBF3" text="Cancel" textColor="#212B36" />
        </FormAction>
      </UploadingDocumentsForm>
    </>
  );
};

export default FdDocuments;

// ✅ Styled Components
const UploadingDocumentsForm = styled("div")({
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FormContent = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const FormAction = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

