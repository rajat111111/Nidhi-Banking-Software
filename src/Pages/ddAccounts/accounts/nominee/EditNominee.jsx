// src/Pages/savingAccounts/accounts/nominee/EditNominee.jsx
import React, { useMemo } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../../../components/DynamicForm";
import PageTopContent from "../../../../components/PageTopContent";

const validationSchema = Yup.object().shape({
    nomineeName: Yup.string().required("Nominee name is required"),
    nomineeRelation: Yup.string().required("Relation is required"),
    nomineeMobile: Yup.string().required("Mobile number is required"),
    nomineeAadhar: Yup.string().nullable(),
    nomineePan: Yup.string().nullable(),
    nomineeVoterId: Yup.string().nullable(),
    nomineeRationCard: Yup.string().nullable(),
    nomineeAddress: Yup.string().nullable(),
});

const EditNominee = () => {
    const navigate = useNavigate();
    const { accountId, nomineeId } = useParams(); // route: /saving-accounts/:accountId/update-nominee/:nomineeId

    // static dummy data — replace with API fetch if available
    const staticNominee = {
        id: Number(nomineeId) || 1,
        nomineeName: "Rakesh Sharma",
        nomineeRelation: "Brother",
        nomineeMobile: "9999995258",
        nomineeAadhar: "12365123654563",
        nomineePan: "",
        nomineeVoterId: "",
        nomineeRationCard: "",
        nomineeAddress: "",
    };

    const initialValues = useMemo(
        () => ({
            nomineeName: staticNominee.nomineeName,
            nomineeRelation: staticNominee.nomineeRelation,
            nomineeMobile: staticNominee.nomineeMobile,
            nomineeAadhar: staticNominee.nomineeAadhar,
            nomineePan: staticNominee.nomineePan,
            nomineeVoterId: staticNominee.nomineeVoterId,
            nomineeRationCard: staticNominee.nomineeRationCard,
            nomineeAddress: staticNominee.nomineeAddress,
        }),
        [nomineeId]
    );

    const formList = [
        { label: "Nominee Name", name: "nomineeName", type: "text" },
        { label: "Nominee Relation", name: "nomineeRelation", type: "text" },
        { label: "Mobile Number", name: "nomineeMobile", type: "text" },
        { label: "Nominee Aadhar Number", name: "nomineeAadhar", type: "text" },
        { label: "Nominee Pan Number", name: "nomineePan", type: "text" },
        { label: "Nominee Voter ID Number", name: "nomineeVoterId", type: "text" },
        { label: "Nominee Ration Card Number", name: "nomineeRationCard", type: "text" },
        { label: "Nominee Address", name: "nomineeAddress", type: "textarea", grid: { xs: 12, sm: 12, md: 12 } },
    ];

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // call update API here (mutation). Example:
            // await updateNomineeMutation({ accountId, nomineeId, ...values }).unwrap()
            // For now just log and navigate back
            console.log("updating nominee", { accountId, nomineeId, values });
            setSubmitting(false);
            navigate(-1); // go back to nominee list or account view
        } catch (err) {
            setSubmitting(false);
            // handle error (toast/snackbar)
        }
    };

    return (
        <>
            <PageTopContent title="Edit Nominee" />
            <DynamicForm
                headerTitle={null}
                formList={formList}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                actionButtonText="Update"
                isLoading={false}
            />
        </>
    );
};

export default EditNominee;
