import { useToast } from "@/components/ui/use-toast";
import { finalSpaceCharacters } from "@/constants/constants";
import { addTemplate } from "@/services/reducer/ScreenReducer";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

let a = {
  templateId: "create",
  templateName: "Create Work Flow",
  description: "Creating an new workflow",
};

const columns = [
  { field: "templateId", headerName: "Template Id", width: 170 },
  { field: "templateField", headerName: "Template Field", width: 230 },
  { field: "templateName", headerName: "Template Name", width: 230 },
];

const rows = [
  {
    id: "1",
    templateId: "6659dd046e35a10301c586d9",
    templateField: "kyc_form",
    templateName: "KYC Form",
    templateType: "multiStepForm",
    icon: "",
  },
  {
    id: "2",
    templateId: "6659dd046e35a10301c586d3",
    templateField: "kyc_form",
    templateName: "No KYC Form",
    templateType: "multiStepForm",
    icon: "",
  },
];

const Template = () => {
  const naviagte = useNavigate();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  // const templateVisited = useSelector((state) => state.screen.templateVisited);
  const [templateVisited, setTemplateVisited] = useState([]);
  const dispatch = useDispatch();
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
    fetch(`http://15.207.88.248:8080/api/getAllTemplateForOrg/${101}`, {
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
  const handleSaveTempalteAgainstOrgId = (template) => {
    template.orgId = 101;
    fetch(`http://15.207.88.248:8080/api/saveCustomTemplate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(template),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code == 200) {
          naviagte(`/getScreens/${template?.templateId}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(templateVisited, "templateVisited");
  return (
    <div className="w-full   min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {template?.map(
          (
            // { id, templateName, templateType, description, templateId }
            template,
            index
          ) => (
            <>
              {template?.templateId === "create" ? (
                <button
                  className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:Rdllb6la:"
                  data-state="closed"
                  onClick={() => naviagte("/createTemplate")}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    class="h-8 w-8 text-muted-foreground group-hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"></path>
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"></path>
                  </svg>
                  <p class="font-bold text-xl text-muted-foreground group-hover:text-primary">
                    {template?.templateName}
                  </p>
                </button>
              ) : (
                <div class="rounded-xl border bg-card text-card-foreground shadow">
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="font-semibold leading-none tracking-tight flex items-center gap-2 justify-between">
                      <span class="truncate font-bold">
                        {template?.templateName}
                      </span>
                      <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">
                        {template?.templateType}
                      </div>
                    </h3>
                  </div>
                  <div class="p-6 pt-0 h-[20px] truncate text-sm text-muted-foreground">
                    {template?.description}
                  </div>
                  <div className="flex items-center p-6 pt-0">
                    <Button
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full mt-2 text-md gap-4"
                      onClick={() => handleSaveTempalteAgainstOrgId(template)}
                    >
                      View Screen{" "}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
      <div className="max-w-full mt-4 overflow-x-auto">
        <Table className="min-w-full border border-gray-200">
          {/* <TableCaption className="text-left font-semibold text-lg p-4 bg-gray-100">
            Recently Visited
          </TableCaption> */}
          <TableHeader className="bg-gray-200">
            <TableRow>
              {columns.map((item, index) => (
                <TableHead
                  key={index}
                  className="w-40 p-4 text-left text-gray-700 font-medium border-b border-gray-300"
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
  );
};

export default Template;
