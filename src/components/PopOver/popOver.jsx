import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VscExpandAll } from "react-icons/vsc";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function PopoverDemo({ id }) {
  const handleSave=()=>{
    const itemsToUpdate = screen.filter((item) => item.id === id.id);
      itemsToUpdate.forEach((item) => {
        Object.assign(item, formValue);
      });
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <VscExpandAll />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Change Screen</h4>
            <p className="text-sm text-muted-foreground">
              Set the feature of the screen.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="screenName">Screen Name</Label>
              <Input
                id="width"
                defaultValue={"screen Name"}
                className="col-span-2 h-8"
                onChange={() => ""}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={"description"}
                className="col-span-2 h-8"
                onChnage={() => ""}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="isMandatory">Is Mandatory</Label>
              <Checkbox
                id="isMandatory"
                defaultValue="25px"
                className="col-span-2 h-4 w-4"
                onChnage={() => ""}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="draggable">Draggable</Label>
              <Checkbox
                id="draggable"
                defaultValue="25px"
                className="col-span-2 h-4 w-4"
                onChnage={() => ""}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={()=>handleSave()}>Save</Button>
            <Button onClick={()=>handleDelete()}>
            <HoverCard>
              <HoverCardTrigger>Delete</HoverCardTrigger>
              <HoverCardContent>
                Are you sure you wants to delete this
              </HoverCardContent>
            </HoverCard>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
