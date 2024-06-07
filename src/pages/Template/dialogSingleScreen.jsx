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
import { useRef } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function SingleScreenDialog() {
  const navigate = useNavigate();
  const user = JSON.parse(useSelector((state) => state.screen.user));
  const { state: singleForm } = useLocation();
  const screenRef = useRef();
  const descriptionRef = useRef();
  console.log(singleForm, "singleForm");
  const handleSave = async () => {
    singleForm.screenName = screenRef.current.value;
    singleForm.description = descriptionRef.current.value;
    singleForm.orgId = user.orgId;
    fetch("http://10.101.29.80:8080/api/saveScreenTemplateDetails", {
      method: "POST",
      body: JSON.stringify({"screenTemplateMasterDtoList":[singleForm]}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status === 400) {
          toast({
            title: "Email or password is wrong",
            description: response.message,
            position: "top-",
          });
        } else if (response.status === 403) {
          toast({
            title: "Email or password is wrong",
            description: "Email or password is wrong",
            // position: "top-",
          });
        }
        if (response.code === 200) {
          // dispatch(login(response.data));

          // navigate("/");
          singleForm.screenId=response?.data[0]
          navigate("/createSingleForm", { state: { ...singleForm } });
        }
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
            Create Single Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Single Form</DialogTitle>
          <DialogDescription>
            Create a new Single to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  space-x-2 space-y-4">
          <div className="grid flex-1 gap-2">
            <Label>Change Screen Name</Label>
            <Input
              type="text"
              placeholder="Enter your screen"
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
              onClick={() => handleSave()}
            >
              <span>Save</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
