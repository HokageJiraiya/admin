import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
//import DemoContent from "@fuse/core/DemoContent";
import CustomerList from "./CustomerList";
//import { useEffect } from "react";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function Dashboard(props) {
  const { t } = useTranslation("DASHBOARD");
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Dashboard > Salesforce Customers List</h4>
        </div>
      }
      content={
        <div className="p-24" style={{ width: "100%" }}>
          <CustomerList />
        </div>
      }
      scroll="content"
    />
  );
}

export default Dashboard;
