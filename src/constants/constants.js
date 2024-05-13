// import MobileForm from "../components/MobileComponent";

export const ItemTypes = {
    Hii: "hii",
  };
  
  export const moveHii = (x, y) => {
    console.log(x, y);
  };
  export const canMoveHii = (x, y) => {
    console.log(x, y);
  };
  export const finalSpaceCharacters = [
    {
      id: "screen1",
      name: "Screen One",
      thumb: "/images/screen1.png",
      draggable: true
    },
    {
      id: "screen2",
      name: "Screen Two",
      thumb: "/images/screen2.png",
      draggable: true
    },
    {
      id: "screen3",
      name: "Screen Three",
      thumb: "/images/screen3.png",
      draggable: false
    },
    {
      id: "mooncake",
      name: "Mooncake",
      thumb: "/images/mooncake.png",
      draggable: false
    },
    {
      id: "quinn",
      name: "Quinn Ergon",
      thumb: "/images/quinn.png",
      draggable: true
    },
  ];
  export const idProofs = [
    {
      id: "aadhaar",
      label: "Aadhaar Card",
      validations: {
        minLength: 12,
        maxLength: 12,
        format: /^\d{12}$/
      },
      style: {
        backgroundColor: "#FF5733",
        color: "#FFFFFF",
        borderColor: "#FF5733"
      }
    },
    {
      id: "pan",
      label: "PAN Card",
      validations: {
        minLength: 10,
        maxLength: 10,
        format: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      },
      style: {
        backgroundColor: "#F6BF27",
        color: "#FFFFFF",
        borderColor: "#F6BF27"
      }
    },
    {
      id: "voter",
      label: "Voter ID Card",
      validations: {
        minLength: 10,
        maxLength: 10,
        format: /^[A-Z]{3}[0-9]{7}$/
      },
      style: {
        backgroundColor: "#1ABC9C",
        color: "#FFFFFF",
        borderColor: "#1ABC9C"
      }
    },
    {
      id: "passport",
      label: "Passport",
      validations: {
        minLength: 8,
        maxLength: 8,
        format: /^[A-Z]{1}[0-9]{7}$/
      },
      style: {
        backgroundColor: "#3498DB",
        color: "#FFFFFF",
        borderColor: "#3498DB"
      }
    },
    {
      id: "driving_license",
      label: "Driving License",
      validations: {
        minLength: 15,
        maxLength: 20,
        format: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/
      },
      style: {
        backgroundColor: "#9B59B6",
        color: "#FFFFFF",
        borderColor: "#9B59B6"
      }
    },
    {
      id: "ration",
      label: "Ration Card",
      validations: {
        minLength: 10,
        maxLength: 15,
        format: /^\d{10,15}$/
      },
      style: {
        backgroundColor: "#27AE60",
        color: "#FFFFFF",
        borderColor: "#27AE60"
      }
    },
  ];
  
  
  