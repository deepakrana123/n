import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TemplateDialog } from "./dailog";
import { Separator } from "@/components/ui/separator";
import Loadings from "@/components/Loading/Loading";
import useApiCallHandler from "@/useApiCallHandler";
import { templateTypes, timeAgo } from "@/constants";
import { Delete, DeleteIcon, Trash, Trash2Icon } from "lucide-react";
const TemplateCard = ({ template, handleSaveTemplate }) => {
  return (
    <div className="rounded-xl min-w-[290px] border bg-card text-card-foreground shadow relative">
      <div className="flex flex-col  pt-6 pr-6 pl-6">
        <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{template?.templateName}</span>
          <div
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-black text-destructive-foreground shadow hover:bg-destructive/80"
            style={{
              position: "absolute",
              top: 0,
              right: -10,
            }}
          >
            {templateTypes[template?.templateType]}
          </div>
        </h3>
      </div>
      <div className="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
        {template?.description}
      </div>
      <div className="flex items-center p-6 pt-8">
        <Button
          className="
      inline-flex items-center bg-black justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  h-9 px-4 py-2 w-full mt-2 text-md gap-4"
          onClick={() => handleSaveTemplate(template)}
        >
          Use This Template
        </Button>
      </div>
    </div>
  );
};
let a = {
  templateId: "create",
  templateName: "Create your own",
  description: "Creating a new workflow",
};

const columns = [
  // { field: "templateId", headerName: "Template Id", width: 170 },
  { field: "templateField", headerName: "Template Name", width: 230 },
  { field: "templateName", headerName: "Template Type", width: 230 },
  { field: "insertedOn", headerName: "Created on", width: 230 },
  { field: "remove", headerName: "Remove", width: 230 },
];

const Template = () => {
  const naviagte = useNavigate();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const [templateVisited, setTemplateVisited] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleApiCall, data: template } = useApiCallHandler({});
  const { handleApiCall: handleGetAllTemplateForOrg } = useApiCallHandler({
    onSuccess: (response) => {
      response.data?.data.forEach((item, index) => {
        item.id = index;
      });
      setTemplateVisited([...response.data?.data]);
    },
  });
  useEffect(() => {
    handleApiCall({ id: `/api/findAll` }, "GET");
    getUserTemplate();
  }, []);
  const getUserTemplate = () => {
    handleGetAllTemplateForOrg(
      { id: `/api/getAllTemplateForOrg/${user.orgId}` },
      "GET"
    );
  };
  const { handleApiCall: handleSaveTemplate } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      naviagte(`/getScreens/${response?.data?.data}`);
    },
    showToast: true,
    successMessage: "Template Added to your library successfully",
    errorMessage: "Not able to add template to your library, try again",
  });
  const { handleApiCall: handleRemove } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      getUserTemplate();
    },
    showToast: true,
    successMessage: "Template removed successfully",
    errorMessage: "Not able to remove template, try again",
  });
  const handleSaveTemplateAgainstOrgId = (newTemplate) => {
    handleSaveTemplate({
      id: "/api/saveCustomTemplate",
      data: newTemplate,
    });
  };
  const handleRemoveTemplate = (id) => {
    handleRemove({ id: `/api/deleteTemplate/${id}` }, "GET");
  };
  return (
    <div
      className="w-full   min-h-screen p-6 flex flex-col  h-screen overflow-hidden bg-white sm:bg-gray-25 mainOpacity"
      style={{
        backgroundImage: `
            radial-gradient(at 50% 0%, rgba(114, 101, 230, 0.1) 0px, transparent 50%), 
            radial-gradient(at 0% 0%, rgba(88, 41, 245, 0.08) 0px, transparent 50%), 
            radial-gradient(at 100% 0%, rgba(103, 228, 193, 0.4) 0px, transparent 50%)
          `,
      }}
    >
      <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  relative">
        <TemplateDialog type="template" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            width: "100%",
            flex: 0.8,
            gap: 20,
          }}
        >
          {template?.map((template, index) => (
            <TemplateCard
              template={template}
              handleSaveTemplate={handleSaveTemplateAgainstOrgId}
            />
          ))}
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="max-w-full  overflow-x-auto">
        <div className="flex">
          <Table className="border border-gray-200 w-full flex-1">
            <TableHeader className="bg-gray-700 z-10 flex-1 ">
              <TableRow
                className={" bg-gray-700  w-full  flex-1 hover:bg-gray-700"}
              >
                {columns.map((item, index) => (
                  <TableHead
                    key={index}
                    className="flex-1 p-4 text-left text-white font-medium border-b border-gray-300 "
                  >
                    {item.headerName}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {templateVisited?.map((rowData) => (
                <TableRow
                  key={rowData.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="p-4 flex-1 border-b border-gray-200">
                    <Link
                      to={`/getScreens/${rowData.templateId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {rowData.templateName}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4  border-b border-gray-200">
                    {templateTypes[rowData.templateType]}
                  </TableCell>
                  <TableCell className="p-4  border-b border-gray-200">
                    {timeAgo(rowData.insertedOn)}
                  </TableCell>
                  <TableCell className=" flex-1 font-medium p-4 border-b border-gray-200 items-center">
                    <div
                      onClick={() => handleRemoveTemplate(rowData.templateId)}
                      className="text-blue-600 hover:underline"
                    >
                      <Trash2Icon color="red" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Template;
