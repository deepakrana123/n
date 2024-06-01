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
import { useState } from "react";

export function DialogOpenClose({ open, setCreateScreenHeader }) {
  const [isOpen, setIsOpen] = useState(open);
  const [inputSingleForm, setInputSingleForm] = useState({
    screenName: "",
    description: "",
  });
  return (
    <Dialog open={isOpen}>
      {/* <DialogTrigger asChild open={isOpen}>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  space-x-2 space-y-4">
          <div className="grid flex-1 gap-2">
            <Label>Change Screen Name</Label>
            <Input
              type="text"
              defaultValue="Single Form"
              placeholder="Enter your single form"
              value={inputSingleForm?.screenName}
              onChange={(event) =>
                setInputSingleForm((prev) => {
                  return { ...prev, ["screenName"]: event.target.value };
                })
              }
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label>Description</Label>
            <Textarea
              type="text"
              defaultValue="Single Form"
              placeholder="Enter your single form"
              value={inputSingleForm?.description}
              onChange={(event) =>
                setInputSingleForm((prev) => {
                  return { ...prev, ["description"]: event.target.value };
                })
              }
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen((prev) => !prev)}
              className="bg-blue-400"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className="bg-black text-white"
            onClick={() => setCreateScreenHeader(inputSingleForm)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
