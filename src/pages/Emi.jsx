import React ,{useEffect, useState} from 'react';
import "./EmiCalculator.css"
const EmiCalculator = () => {
    const ten=['12','24','36','48','60']
    const [cost ,setCost]=useState(0)
    const [fee ,setFee]=useState(1);
    const [interest , setInterset]=useState(10);
    const [downPayment ,setDownPayment]=useState();
    const [tenure , setTenure]=useState(12);
    const [emi , setEmi]=useState(0)
    const updateEmi=(e)=>{
        if(!cost) return
        const dp=Number(e.target.value)
        setDownPayment(dp.toFixed(0))
        const emi=calulateEmi(dp)
        setEmi(emi)
    }

    const calulateDownPayment=(e)=>{
        if(!cost) return
        const down=100 -(e/calulateEmi(0)*100)
        return ((down/100)*cost).toFixed(0)
    }

    const calulateEmi=(downPayment)=>{
    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;
    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);
    return Number(EMI / 12).toFixed(0);    
    }
    const updateDownPayment=(e)=>{
        if(!cost) return
      const emi=Number(e.target.value)
      setEmi(emi.toFixed(0))
      const dp =  calulateDownPayment(e.target.value)
      setDownPayment(dp)
    } 

    useEffect(()=>{
           if(!(cost>0)){
            setDownPayment(0)
            setEmi(0)
           }
           const emi=calulateEmi(downPayment)
           setEmi(emi)
    },[tenure])
  return (
    <div className="emi">
        <span className="title" style={{"fontSize":"30px"
        ,"margin":"20px"}}>EmiCalculator</span>
        <span className='title'>Total Cost of Assests</span>
         <input value={cost} onChange={(e)=>setCost(e.target.value)}
         placeholder="Cost" type="number"/>
         <span className='title'>Interset Rate %</span>
         <input value={interest} onChange={(e)=>setInterset(e.target.value)}
         placeholder="interest" type="number"/>
         <span className='title'>Processing Fee</span>
         <input value={fee} onChange={(e)=>setFee(e.target.value)}
         placeholder="Processing Fee" type="number"/>
         <div>
         <span className='title'>DownPayment</span>
         {downPayment > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
         Total AMount {Number(downPayment)+((cost-downPayment)*fee/100).toFixed(2)}
        </span>
      )}
         <input type="range"  onChange={updateEmi} min={0} max={cost}
          className='slider'
          value={downPayment}/>
          <div className='labels'>
            <label>0%</label>
            <b>{downPayment}</b>
            <label>100%</label>
          </div>
          </div>
          <div>
          <span className='title'>EMi</span>
        {emi>0  &&( <span className="title" style={{ textDecoration: "underline" }}>
         Total Loan Amount {(Number(emi)**tenure).toFixed(0)}
        </span>)}
         <input type="range"  onChange={updateDownPayment} min={calulateEmi(cost)} max={calulateEmi(0)} className='slider'
         value={emi}/>
         <div className='labels'>
            <label>{calulateEmi(cost)}</label>
            <b>{emi}</b>
            <label>{calulateEmi(0)}</label>
          </div>
         </div>
         <div className="tenureContainer">
         <span className='tenure'>Tenure</span>
         {ten.map((t)=>{
            return (
                <button key={t} className={`tenure ${t===tenure ?"selected":""}` } onClick={(e)=>setTenure(e.target.value)}>{t}</button>
            )
         })}
         </div>
        </div>
  )
}

export default EmiCalculator