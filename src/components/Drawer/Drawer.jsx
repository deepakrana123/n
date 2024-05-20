import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { HiOutlinePencilSquare } from "react-icons/hi2";

// const SheetSide = ({ rowValue, sheetWidth = 'w-[500px]' }) => {
//   const [inputFields, setInputFields] = useState([
//     { id: 'required', type: 'checkbox', label: 'Field is required', value: 'required' },
//     { id: 'placeholder', type: 'text', label: 'Change field placeholder', value: 'placeholder' },
//     { id: 'label', type: 'text', label: 'Change the label', value: 'Label' },
//     { id: 'required', type: 'checkbox', label: 'Field is required', value: 'required' },
//     { id: 'placeholder', type: 'text', label: 'Change field placeholder', value: 'placeholder' },
//     { id: 'maxLength', type: 'number', label: 'Enter the maxlength', value: '0' },
//     { id: 'maxLengthMessage', type: 'text', label: 'Enter the maxlength Message', value: '0' },
//     { id: 'minLengthMessage', type: 'text', label: 'Enter the maxlength', value: '0' },
//   ]);

//   return (
//     <div className="flex flex-col gap-2">
//       <Sheet>
//         <SheetTrigger asChild>
//           <HiOutlinePencilSquare className="cursor-pointer"/>
//         </SheetTrigger>
//         <SheetContent className={`bg-white shadow-md rounded-lg ${sheetWidth}`} size="large" side="right">
//           <SheetHeader>
//             <SheetTitle>{rowValue.label}</SheetTitle>
//             <SheetDescription>Edit {rowValue.label} Properties</SheetDescription>
//           </SheetHeader>
//           <div className="p-4 grid gap-4">
//             {inputFields.map((field) => (
//               <div key={field.id} className="grid grid-cols-6 items-center gap-4">
//                 <Label htmlFor={field.id} className="col-span-1 text-right font-medium">
//                   {field.label}
//                 </Label>
//                 {field.type === 'checkbox' ? (
//                   <input
//                     id={field.id}
//                     type="checkbox"
//                     defaultChecked={field.value}
//                     className="col-span-1 p-2 border rounded appearance-none"
//                     onChange={(e) => handleInputChange(e, field.id)}
//                   />
//                 ) : field.type === 'text' || field.type === 'number' ? (
//                   <Input
//                     id={field.id}
//                     placeholder={field.placeholder}
//                     defaultValue={field.value}
//                     className="col-span-3 p-2 border rounded"
//                     type={field.type}
//                     onChange={(e) => handleInputChange(e, field.id)}
//                   />
//                 ) : (
//                   <select
//                     id={field.id}
//                     className="col-span-2 p-2 border rounded"
//                     onChange={(e) => handleInputChange(e, field.id)}
//                   >
//                     {field.options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>
//             ))}
//           </div>
//           <SheetFooter className="flex justify-end">
//             <SheetClose asChild>
//               <Button type="submit" onClick={}>Save</Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default SheetSide;


const SheetSide = ({ rowValue,handleSepratedFunction, sheetWidth = 'w-[500px]' }) => {
    const [inputFields, setInputFields] = useState([
    { id: 'required', type: 'checkbox', label: 'Field is required', value: 'required' },
    { id: 'placeholder', type: 'text', label: 'Change field placeholder', value: 'placeholder' },
    { id: 'label', type: 'text', label: 'Change the label', value: 'Label' },
  { id: 'maxLength', type: 'number', label: 'Enter the maxlength', value: '0' },
    { id: 'maxLengthMessage', type: 'text', label: 'Enter the maxlength Message', value: '0' },
    { id: 'minLength', type: 'number', label: 'Enter the minlength', value: '0' },
    { id: 'minLengthMessage', type: 'text', label: 'Enter the minlength', value: '0' },
  ]);
  const [formData, setFormData] = useState({
    required:'',
    placeholder:'',
    label:'',
    maxLength:'',
    maxLengthMessage:'',
    minLengthMessage:'',
    minLength:''
  });
  const handleInputChange = (e, fieldId) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };
  // const handleSave = (rowValue,) => {
  //   console.log('Saved changes:', formData);
  // };

  return (
    <div className="flex flex-col gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <HiOutlinePencilSquare className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent className={`bg-white shadow-md rounded-lg ${sheetWidth}`} size="large" side="right">
          <SheetHeader>
            <SheetTitle>{rowValue.label}</SheetTitle>
            <SheetDescription>Edit {rowValue.label} Properties</SheetDescription>
          </SheetHeader>
          <div className="p-4 grid gap-4">
            {inputFields.map((field) => (
              <div key={field.id} className="grid grid-cols-6 items-center gap-4">
                <Label htmlFor={field.id} className="col-span-1 text-right font-medium">
                  {field.label}
                </Label>
                {field.type === 'checkbox' ? (
                  <input
                    id={field.id}
                    type="checkbox"
                    defaultChecked={formData[field.id]}
                    className="col-span-1 p-2 border rounded appearance-none"
                    onChange={(e) => handleInputChange(e, field.id)}
                  />
                ) : field.type === 'text' || field.type === 'number' ? (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    defaultValue={formData[field.id]}
                    className="col-span-3 p-2 border rounded"
                    type={field.type}
                    onChange={(e) => handleInputChange(e, field.id)}
                  />
                ) : (
                  <select
                    id={field.id}
                    className="col-span-2 p-2 border rounded"
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(e, field.id)}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          <SheetFooter className="flex justify-end">
            <SheetClose asChild>
              <Button type="submit" onClick={()=>handleSepratedFunction(rowValue,formData)}>Save</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetSide;


 