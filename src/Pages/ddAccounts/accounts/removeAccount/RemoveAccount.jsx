// // src/Pages/ddAccounts/removeAccount/RemoveAccount.jsx
// import React, { useState } from "react";
// import { Box, Typography, Divider } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import DynamicButton from "../../../../components/DynamicButton";


// const Container = styled("div")({
//     width: "100%",
//     maxWidth: 1100,
//     margin: "0 auto",
//     padding: "20px 24px",
// });

// const InfoList = styled("ul")({
//     marginTop: 12,
//     marginBottom: 24,
//     paddingLeft: 20,
//     color: "#333",
//     lineHeight: 1.8,
// });

// const ButtonRow = styled("div")({
//     display: "flex",
//     justifyContent: "center",
//     gap: 16,
//     marginTop: 24,
// });

// const RemoveAccount = ({ onRemoved, setActiveTab }) => {
//     const [busy, setBusy] = useState(false);
//     const [msg, setMsg] = useState(null);

//     const handleRemove = async () => {
//         if (!window.confirm("Are you sure you want to remove this account? This action cannot be undone.")) return;
//         setBusy(true);
//         try {
//             // call API to remove account here, example:
//             // await removeAccountMutation({ accountId }).unwrap()
//             // For now simulate:
//             await new Promise((r) => setTimeout(r, 700));
//             setMsg({ type: "success", text: "Account removed successfully." });
//             setBusy(false);
//             if (typeof onRemoved === "function") onRemoved();
//             if (typeof setActiveTab === "function") setActiveTab("basic");
//         } catch (err) {
//             setMsg({ type: "error", text: err?.message || "Failed to remove account." });
//             setBusy(false);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//                 Remove Account
//             </Typography>

//             <Divider />

//             <Typography sx={{ mt: 2 }}>
//                 Remove RD will delete following details:
//             </Typography>

//             <InfoList>
//                 <li>Remove DD and all its transactions.</li>
//                 <li>Remove transactions from accounting module.</li>
//                 <li>Remove all the tracking if any.</li>
//                 <li>Sequence numbers will get unused in future.</li>
//                 <li>May lead to data corruption if any inter link account transactions are present.</li>
//                 <li>No data backup will be provided for this action.</li>
//             </InfoList>

//             <ButtonRow>
//                 <DynamicButton
//                     text="Remove Account"
//                     color="#7858C6"
//                     textColor="#fff"
//                     onClick={handleRemove}
//                     disabled={busy}
//                 />
//                 <DynamicButton
//                     variant="outlined"
//                     text="Cancel"
//                     onClick={() => {
//                         if (typeof setActiveTab === "function") setActiveTab("basic");
//                     }}
//                 />
//             </ButtonRow>

//             {msg && (
//                 <Typography sx={{ mt: 2, textAlign: "center", color: msg.type === "success" ? "green" : "red" }}>
//                     {msg.text}
//                 </Typography>
//             )}
//         </Container>
//     );
// };

// export default RemoveAccount;

// src/Pages/ddAccounts/removeAccount/RemoveAccount.jsx
import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import DynamicButton from "../../../../components/DynamicButton";
import { useParams } from "react-router-dom";
import { useRemoveDdAccountMutation } from "../../../../features/api/ddAccountsApi";

const Container = styled("div")({
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
});

const InfoList = styled("ul")({
    marginTop: 12,
    marginBottom: 24,
    paddingLeft: 20,
    color: "#333",
    lineHeight: 1.8,
});

const ButtonRow = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginTop: 24,
});

const RemoveAccount = ({ setActiveTab }) => {
    const { id } = useParams(); // dd account ID
    const [removeDdAccount] = useRemoveDdAccountMutation();
    const [msg, setMsg] = useState(null);
    const [busy, setBusy] = useState(false);

    const handleRemove = async () => {
        if (!window.confirm("Are you sure you want to delete this DD Account?"))
            return;

        setBusy(true);

        try {
            await removeDdAccount(id).unwrap();

            setMsg({ type: "success", text: "DD Account removed successfully." });

            if (setActiveTab) setActiveTab("basic");
        } catch (err) {
            setMsg({
                type: "error",
                text: err?.data?.message || "Failed to remove DD account.",
            });
        } finally {
            setBusy(false);
        }
    };

    return (
        <Container>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Remove Account
            </Typography>

            <Divider />

            <Typography sx={{ mt: 2 }}>
                Removing DD Account will delete the following:
            </Typography>

            <InfoList>
                <li>All DD details and its transactions.</li>
                <li>Entries from accounting module.</li>
                <li>Tracking records associated with this account.</li>
                <li>Sequence numbers will not be reused.</li>
                <li>No data backup will be available after deletion.</li>
            </InfoList>

            <ButtonRow>
                <DynamicButton
                    text="Remove Account"
                    color="#7858C6"
                    textColor="#fff"
                    disabled={busy}
                    onClick={handleRemove}
                />

                <DynamicButton
                    variant="outlined"
                    text="Cancel"
                    onClick={() => setActiveTab && setActiveTab("basic")}
                />
            </ButtonRow>

            {msg && (
                <Typography
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        color: msg.type === "success" ? "green" : "red",
                    }}
                >
                    {msg.text}
                </Typography>
            )}

        </Container>
    );
};

export default RemoveAccount;
