import React from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { logout } from "@/services/reducer/ScreenReducer";

const Alert = () => {
  const dispatch=useDispatch()
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size={"xs"} className="bg-blue-600">
            Logout
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you wants to logout
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => ""}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => dispatch(logout({}))}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Alert;
