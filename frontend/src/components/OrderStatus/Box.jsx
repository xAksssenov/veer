import Lottie from "lottie-react";
import boxAnimation from "./animations/box.json";

export default function Box() {
  return (
    <div className="box">
      <Lottie 
        animationData={boxAnimation} 
        loop={true}
        style={{ width: 300, height: 300}} 
      />
    </div>
  );
}
