import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useToast from "@/components/ui/useToast";
import useApiCallHandler from "@/useApiCallHandler";
import { useRef } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function SingleScreenDialog({ id }) {
  const navigate = useNavigate();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const { state: singleForm } = useLocation();
  const screenRef = useRef();
  const descriptionRef = useRef();
  const { toast } = useToast();
  const { handleApiCall } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      singleForm.templateId = response.data?.data;
      handleSingleScreenSave(singleForm);
    },
  });
  const { handleApiCall: handleScreenSave } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      singleForm.id = response?.data?.data[0];
      navigate("/createSingleForm", { state: { ...singleForm } });
    },
    showToast: true,
    successMessage: "Screen created successfully",
  });
  const handleSave = async (e) => {
    if (screenRef.current.value) {
      singleForm.screenName = screenRef.current.value;
      singleForm.description = descriptionRef.current.value;
      singleForm.orgId = user.orgId;
      if (id) {
        singleForm.templateType = id;
      }
      if (!singleForm.templateId) {
        handleApiCall({
          id: `/api/saveCustomTemplate`,
          data: {
            templateField: singleForm.templateField,
            templateName: singleForm.templateName,
            description: singleForm.description,
            orgId: user.orgId,
            templateType: singleForm.templateType,
            status: "D",
          },
        });
      } else {
        handleSingleScreenSave({
          ...singleForm,
        });
      }
    } else {
      e.preventDefault();
      toast("error", "Screen Name is mandatory");
    }
  };
  const handleSingleScreenSave = async (singleForm) => {
    handleScreenSave({
      id: `/api/saveScreenTemplateDetails`,
      data: { screenTemplateMasterDtoList: [singleForm] },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[230px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create Single Screen
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Single Screen</DialogTitle>
          <DialogDescription>
            Create a new Single to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  space-x-2 space-y-4">
          <div className="grid flex-1 gap-2">
            <Label>
              Screen Name <span className="text-red-500 text-xs mt-1">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter screen name"
              ref={screenRef}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Enter your screen descrition"
              ref={descriptionRef}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full mt-4 bg-black text-white"
              onClick={(e) => handleSave(e)}
            >
              <span>Save</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
