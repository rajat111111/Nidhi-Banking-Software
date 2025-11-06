import { styled } from "@mui/material";

const FormLabel = ({ label }) => {
  return <Lable>{label}</Lable>;
};

export default FormLabel;

const Lable = styled("label")({
  font: "400 16px Poppins",
  color: "#2C2C2C",
});
