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

let a = {
  templateId: "create",
  templateName: "Create your own",
  description: "Creating an new workflow",
};

const columns = [
  { field: "templateId", headerName: "Template Id", width: 170 },
  { field: "templateField", headerName: "Template Field", width: 230 },
  { field: "templateName", headerName: "Template Name", width: 230 },
];

const Template = () => {
  const naviagte = useNavigate();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const [templateVisited, setTemplateVisited] = useState([]);
  const [template, setTemplate] = useState([]);
  useEffect(() => {
    (async () => {})();
    fetch("http://15.207.88.248:8080/api/findAll", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer  ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          setTemplate([...data.data, a]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    (async () => {})();
    fetch(`http://15.207.88.248:8080/api/getAllTemplateForOrg/${user.orgId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          data.data.forEach((item, index) => {
            item.id = index;
          });
          setTemplateVisited([...data.data]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSaveTempalteAgainstOrgId = (newTemplate) => {
    newTemplate.orgId = user.orgId;
    fetch(`http://15.207.88.248:8080/api/saveCustomTemplate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTemplate),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log(data, data?.data, "Data");
          naviagte(`/getScreens/${data?.data}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {template?.map((template, index) => (
          <>
            {template?.templateId === "create" ? (
              <TemplateDialog type="template" />
            ) : (
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">
                      {template?.templateName}
                    </span>
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-black text-destructive-foreground shadow hover:bg-destructive/80">
                      {template?.templateType}
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
                    onClick={() => handleSaveTempalteAgainstOrgId(template)}
                  >
                    View Screen{" "}
                  </Button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <Separator className="mt-4" />
      {/* <div className="max-w-full mt-4 overflow-x-auto">
        <Table className=" border border-gray-200">
          <TableHeader className="bg-gray-900 fixed w-full">
            <TableRow>
              {columns.map((item, index) => (
                <TableHead
                  key={index}
                  className="w-80 p-4 text-left text-white font-medium border-b border-gray-300"
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
                <TableCell className="font-medium p-4 border-b border-gray-200">
                  <Link
                    to={`/getScreens/${rowData.templateId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {rowData.templateId}
                  </Link>
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {rowData.templateName}
                </TableCell>
                <TableCell className="p-4 border-b border-gray-200">
                  {rowData.templateType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
      <div className="max-w-full mt-4 overflow-x-auto">
        <div className="relative">
          <Table className="border border-gray-200 w-full">
            <TableHeader className="bg-gray-900  z-10">
              <TableRow>
                {columns.map((item, index) => (
                  <TableHead
                    key={index}
                    className="w-1/3 p-4 text-left text-white font-medium border-b border-gray-300"
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
                  <TableCell className="font-medium p-4 border-b border-gray-200">
                    <Link
                      to={`/getScreens/${rowData.templateId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {rowData.templateId}
                    </Link>
                  </TableCell>
                  <TableCell className="p-4 border-b border-gray-200">
                    {rowData.templateName}
                  </TableCell>
                  <TableCell className="p-4 border-b border-gray-200">
                    {rowData.templateType}
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
