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
import { useRef } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function TemplateDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const templateRef = useRef();
  const descriptionRef = useRef();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const handleSave = async (e) => {
    if (templateRef.current.value) {
      let inputSingleForm = {
        templateField: templateRef.current.value.split(" ").join("_"),
        templateName: templateRef.current.value,
        description: descriptionRef.current.value,
        orgId: user.orgId,
      };
      navigate("/createTemplate", {
        state: { ...inputSingleForm, fieldsMap: [] },
      });
    } else {
      e.preventDefault();
      toast("error", "Template Name is mandatory");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          style={{
            flex: 0.2,
          }}
          className="group border  border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 flex-0.2"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Template</DialogTitle>
          <DialogDescription>
            Create a new Template to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  space-x-2 space-y-4">
          <div className="grid flex-1 gap-2">
            <Label>
              Template Name <span className="text-red-500 text-xs mt-1">*</span>
            </Label>
            <Input
              required
              type="text"
              placeholder="Enter template name"
              ref={templateRef}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Enter template description"
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
