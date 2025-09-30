import { styled, Switch } from "@mui/material";
import PageTopContent from "../../../components/PageTopContent";
import { useState } from "react";
import DynamicButton from "../../../components/DynamicButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddNewAccount = () => {
  const [paymentMode, setPaymentMode] = useState("");


  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member ID is required"),
    branchId: Yup.string().required("Branch name is required"),
    agentId: Yup.string().required("Agent name is required"),
    accountType: Yup.string().required("Account type is required"),
    depositAmount: Yup.number().required("Deposit amount is required"),
    openDate: Yup.date().required("Open date is required"),
    transactionDate: Yup.date().required("Transaction date is required"),
    paymentMode: Yup.string().required("Select a payment mode"),
    cashAmount: Yup.string().when("paymentMode", {
      is: "cash",
      then: (schema) => schema.required("Cash Amount is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    checkNumber: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    checkDate: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    bankName: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Bank Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    onlineTransactionDate: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) => schema.required("Online Transaction Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    onlineTransactionNumber: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) =>
        schema.required("Online Transaction Number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    onlineTransctionMode: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) => schema.required("Online Transaction Mode is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSubmit = async (values, { resetForm }) => {};

  const formik = useFormik({
    initialValues: {
      memberId: "",
      branchId: "",
      agentId: "",
      accountType: "",
      depositAmount: "",
      openDate: "",
      transactionDate: "",
      paymentMode: "",
      cashAmount: "",
      checkNumber: "",
      checkDate: "",
      bankName: "",
      onlineTransactionDate: "",
      onlineTransactionNumber: "",
      onlineTransctionMode: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const { touched, errors, values, handleBlur, handleChange, resetForm } =
    formik;

  return (
    <AddNewAccountMainContainer>
      <PageTopContent title="New Account" />

      <FormContainer onSubmit={formik.handleSubmit}>
        {/* Member & Branch */}
        <FormRow>
          <FormContent>
            <FormLabel>Member</FormLabel>
            <InputField
              type="number"
              placeholder="Enter Member Id"
              name="memberId"
              value={values.memberId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.memberId && errors.memberId && (
              <div className="validationError">{errors.memberId}</div>
            )}
          </FormContent>

          <FormContent>
            <FormLabel>Branch</FormLabel>
            <InputField
              placeholder="Enter Branch Name"
              type="text"
              name="branchId"
              value={values.branchId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.branchId && errors.branchId && (
              <div className="validationError">{errors.branchId}</div>
            )}
          </FormContent>
        </FormRow>

        {/* Agent & Account Type */}
        <FormRow>
          <FormContent>
            <FormLabel>Agent</FormLabel>
            <InputField
              placeholder="Enter Agent Name"
              type="text"
              name="agentId"
              value={values.agentId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.agentId && errors.agentId && (
              <div className="validationError">{errors.agentId}</div>
            )}
          </FormContent>

          <FormContent>
            <FormLabel>Account Type</FormLabel>
            <InputField
              placeholder="Enter Account Type"
              type="text"
              name="accountType"
              value={values.accountType}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.accountType && errors.accountType && (
              <div className="validationError">{errors.accountType}</div>
            )}
          </FormContent>
        </FormRow>

        {/* Amount Deposit & Open Date */}
        <FormRow>
          <FormContent>
            <FormLabel>Amount Deposit</FormLabel>
            <InputField
              type="number"
              placeholder="Enter Deposit Amount"
              name="depositAmount"
              value={values.depositAmount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.depositAmount && errors.depositAmount && (
              <div className="validationError">{errors.depositAmount}</div>
            )}
          </FormContent>

          <FormContent>
            <FormLabel>Open Date</FormLabel>
            <InputField
              type="date"
              placeholder="Select Date"
              name="openDate"
              value={values.openDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.openDate && errors.openDate && (
              <div className="validationError">{errors.openDate}</div>
            )}
          </FormContent>
        </FormRow>

        {/* Switches */}
        <FormRow>
          <FormContent>
            <FormLabel>Open Account with less than Minimum Amount</FormLabel>
            <Switch color="success" />
          </FormContent>

          <FormContent
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SwitchContainer>
              <FormLabel>Account on hold</FormLabel>
              <Switch color="success" />
            </SwitchContainer>

            <SwitchContainer>
              <FormLabel>Joint Account</FormLabel>
              <Switch color="success" />
            </SwitchContainer>

            <SwitchContainer>
              <FormLabel>Nominee</FormLabel>
              <Switch color="success" />
            </SwitchContainer>
          </FormContent>
        </FormRow>

        {/* Transaction Date & Payment Mode */}
        <FormRow>
          <FormContent>
            <FormLabel>Transaction Date</FormLabel>
            <InputField
              placeholder="Select Date"
              type="date"
              name="transactionDate"
              value={values.transactionDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.transactionDate && errors.transactionDate && (
              <div className="validationError">{errors.transactionDate}</div>
            )}
          </FormContent>

          <FormContent>
            <FormLabel>Payment Mode</FormLabel>
            <SelectField
              name="paymentMode"
              value={paymentMode}
              onChange={(e) => {
                setPaymentMode(e.target.value);
                handleChange(e);
              }}
              onBlur={handleBlur}
            >
              <option value="">Choose Payment</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="online">Online Transaction</option>
            </SelectField>
            {touched.paymentMode && errors.paymentMode && (
              <div className="validationError">{errors.paymentMode}</div>
            )}
          </FormContent>
        </FormRow>

        {/* Conditional Fields */}
        {paymentMode === "cash" && (
          <FormRow>
            <FormContent>
              <FormLabel>Cash Amount</FormLabel>
              <InputField
               name="cashAmount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cashAmount}
                type="number"
                placeholder="Enter Cash Amount"
  
              />
               {touched.cashAmount && errors.cashAmount && (
                  <div className="validationError">{errors.cashAmount}</div>
                )}
            </FormContent>
          </FormRow>
        )}

        {paymentMode === "cheque" && (
          <>
            <FormRow>
              <FormContent>
                <FormLabel>Cheque Number</FormLabel>
                <InputField
                  name="checkNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.checkNumber}
                  type="text"
                  placeholder="Enter Cheque Number"
                />
                {touched.checkNumber && errors.checkNumber && (
                  <div className="validationError">{errors.checkNumber}</div>
                )}
              </FormContent>

              <FormContent>
                <FormLabel>Cheque Date</FormLabel>
                <InputField
                  name="checkDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.checkDate}
                  type="date"
                  placeholder="Select Date"
                />
                {touched.checkDate && errors.checkDate && (
                  <div className="validationError">{errors.checkDate}</div>
                )}
              </FormContent>
            </FormRow>

            <FormRow>
              <FormContent>
                <FormLabel>Bank Name</FormLabel>
                <InputField
                  value={values.bankName}
                  name="bankName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter Bank Name"
                />
                {touched.bankName && errors.bankName && (
                  <div className="validationError">{errors.bankName}</div>
                )}
              </FormContent>
            </FormRow>
          </>
        )}

        {paymentMode === "online" && (
          <>
            <FormRow>
              <FormContent>
                <FormLabel>Online Transaction Date</FormLabel>
                <InputField
                  type="date"
                  value={values.onlineTransactionDate}
                  name="onlineTransactionDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Select Date"
                />
                {touched.onlineTransactionDate &&
                  errors.onlineTransactionDate && (
                    <div className="validationError">
                      {errors.onlineTransactionDate}
                    </div>
                  )}
              </FormContent>

              <FormContent>
                <FormLabel>Online Transaction Number</FormLabel>
                <InputField
                  type="number"
                  value={values.onlineTransactionNumber}
                  name="onlineTransactionNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Online Transaction Number"
                />
                {touched.onlineTransactionNumber &&
                  errors.onlineTransactionNumber && (
                    <div className="validationError">
                      {errors.onlineTransactionNumber}
                    </div>
                  )}
              </FormContent>
            </FormRow>

            <FormRow>
              <FormContent>
                <FormLabel>Online Transaction Mode</FormLabel>
                <InputField
                  type="text"
                  value={values.onlineTransctionMode}
                  name="onlineTransctionMode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Online Transaction Mode"
                />
                {touched.onlineTransctionMode &&
                  errors.onlineTransctionMode && (
                    <div className="validationError">
                      {errors.onlineTransctionMode}
                    </div>
                  )}
              </FormContent>
            </FormRow>
          </>
        )}

        {/* Actions */}
        <FormAction>
          <DynamicButton
            color="#7858C6"
            textColor="#FFFFFF"
            text="Create Account"
            type="submit"
          />
          <DynamicButton
            borderColor="#ECEBF3"
            textColor="#000"
            color="#FFFFFF"
            text="Cancel"
            onClick={() => {
              resetForm();
              setPaymentMode("");
            }}
          />
        </FormAction>
      </FormContainer>
    </AddNewAccountMainContainer>
  );
};

export default AddNewAccount;

//
// Styled Components
//
const AddNewAccountMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FormContainer = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
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

const SwitchContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const FormLabel = styled("label")({
  font: "400 16px Poppins",
  color: "#2C2C2C",
});

const InputField = styled("input")({
  width: "100%",
  height: "40px",
  borderRadius: "5px",
  border: "1px solid #E4E7EB",
  padding: "0px 20px",
  color: "#919198ff",
  font: "400 14px Poppins",
  "&:focus": {
    outline: "1px solid #000",
  },
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": {
    MozAppearance: "textfield",
  },
});

const SelectField = styled("select")({
  width: "100%",
  height: "40px",
  borderRadius: "5px",
  border: "1px solid #E4E7EB",
  padding: "0px 20px",
  color: "#919198ff",
  cursor: "pointer",
  font: "400 14px Poppins",
});

const FormAction = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
