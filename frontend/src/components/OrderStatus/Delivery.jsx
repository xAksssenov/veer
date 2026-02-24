import Lottie from "lottie-react";
import truckAnimation from "./animations/Truck.json";
import './Delivery.css';

export default function TruckDeliveryAnimation() {
  return (
    <div className="truck">
      <Lottie 
        animationData={truckAnimation} 
        loop={true}
        style={{ width: 300, height: 300}} 
      />
    </div>
  );
}
