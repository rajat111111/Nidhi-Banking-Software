import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import ForClosureRequrestLater from '../accounts/closeRequestLater/ForClosureRequrestLater'
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";

const ClosureApproval = () => {
     const [setshowDetails, setSetshowDetails] = useState(false);
      const formList = [
        {
          label: "Close ID",
          placeholder: "Enter Close ID",
    
          name: "closeId",
          id: "closeId",
        },
        {
          label: "Customer Name",
          placeholder: "Enter Name",
          type: "text",
          name: "customerName",
          id: "customerName",
        },
        {
          label: "Account Number",
          placeholder: "Enter Account Number",
          type: "number",
          name: "accountNumber",
          id: "accountNumber",
        },
      ];
    
      const initialValues = {
        accountNumber: "",
        customerName: "",
        closeId: "",
      };


        const validationSchema = Yup.object({
          accountNumber: Yup.string().required("Account number is required"),
          customerName: Yup.string().required("Customer name is required"),
          closeId: Yup.string().required("Close ID is required"),
        });
      
        const handleSubmit = (values) => {
          setSetshowDetails(true);
        };
  return (
    <PagesMainContainerStyle>
  <DynamicForm
        headerTitle="Closure Approval"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        md={4}
        width="30%"
      />
    <ForClosureRequrestLater/>
    </PagesMainContainerStyle>
  )
}

export default ClosureApproval