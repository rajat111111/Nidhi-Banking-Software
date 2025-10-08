import React from 'react'
import PagesMainContainerStyle from '../../../components/PagesMainContainerStyle'
import PageHeader from '../../../components/PageHeader'
import DynamicForm from '../../../components/DynamicForm'
import PageTopContent from '../../../components/PageTopContent'

const CreateReceipt = () => {
    const formList=[
        {
            label:"Member ID",
            type:"number",
            placeholder:"#2136542356",
            name:"memberId",
            id:"memberId"
        },
        {
            label:"Account Number",
            type:"number",
            placeholder:"Enter Account Number",
            name:"accountNuo",
            id:"accountNuo"
        },
         {
            label:"Member Name",
     readOnly: true,
            disabled:true,
            placeholder:"Auto-filled after Enter Account No",
            name:"accountNuo",
            id:"accountNuo"
        },
         {
            label:"Transaction Type",
            type:"select",
            name:"accountNuo",
            id:"accountNuo"
        },
         {
            label:"Receipt Date",
            type:"date",
            name:"accountNuo",
            id:"accountNuo"
        },
         {
            label:"Amount",
            type:"number",
            name:"amount",
            placeholder:"Enter Amount",
            id:"amount"
        },
        {
            label:"Mode Of Payment",
            type:"select",
            name:"paymentMode",
            id:"paymentMode"
        },
        {
            label:"Check Number",
            type:"number",
            name:"checkNumber",
            placeholder:"Enter Check Number",
            id:"checkNumber"
        },
         {
            label:"Bank Name",
      
            name:"bankName",
            placeholder:"Enter Bank Name",
            id:"bankName"
        },
         {
            label:"Branch Name",
      
            name:"branchName",
            placeholder:"Enter Branch Name",
            id:"branchName"
        },
         {
            label:"Remarks",
            type:"textarea",
            name:"remarks",
            placeholder:"Enter Remarks",
            id:"remarks"
        },
    ]
  return (
    <PagesMainContainerStyle>
        <PageTopContent title="Create Receipt"/>
        <DynamicForm formList={formList} />
    </PagesMainContainerStyle>
  )
}

export default CreateReceipt