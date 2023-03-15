// ************** for name  and all alphabets validation***************
export const onlyAlphabetsValidation = (NameToCheck) => {
    let regex = /^[A-Za-z]*$/;
    return regex.test(NameToCheck);
  };
  
  // **************************** for name contains only capital letter **********************//
  export const stringContainsOnlyCapitalLetter=(nemeforchecking)=>{
     let regex=/^[A-Z]*$/;
     return regex.test(nemeforchecking)
  }
  
    // ************* for email validation **************//
  export const onlyEmailValidation = (emailforValidation) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailforValidation)) {
      return (true)
   }
   return (false)
  }
  
  // ******************* for check passwor pattern**********************//
  export const onlyPasswordPatternValidation =(pass_word)=>{
    let passwordCheck = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/);
    if(passwordCheck.test(pass_word)){
      return true;
    }
    return false;
  }
  
  // var phoneisANumber = isNaN(req.body.phone);
  
  export const phoneNumberValidation=(number)=>{
      return (isNaN(number));
  }
  
  // ******************** for train number verification*****************//
  
  export const trainNumberValidation=(trainNumber)=>{
       if(trainNumber.length >= 4 && trainNumber.length <= 6){
        return true;
       }
       return false;
  }
  
  // ************* percentage cal********************//
  
  export const  percentageCalculator=(num, per)=> {
    return (num / 100) * per;
  }
  
  
  
  
  
  