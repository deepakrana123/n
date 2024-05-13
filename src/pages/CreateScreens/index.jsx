import FixedMobileScreen from '@/components/MobileScreen'
import Sidebar from '@/components/Sidebar'
import { idProofs } from "@/constants/constants";
const CreateScreens = () => {
  return (
    <div className='flex justify-between bg-gray-200'>
        <Sidebar IdProofs={idProofs}/>
        <FixedMobileScreen/>
         <div></div>
    </div>
  )
}

export default CreateScreens
