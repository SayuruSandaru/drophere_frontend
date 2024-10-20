// src/api/reservation.ts

import { setRecoil } from "recoil-nexus";
import { reservationState } from "state";
import reservationService from "./services/reservationService";

export const createReservation = async (reservation: {
  driver_id: string;
  ride_id: string;
  status: string;
  price: number;
  passenger_count: number;
  
}) => {
  try {
    const response = await reservationService.createReservation(reservation);
    if (response.status !== "error") {
      setRecoil(reservationState, response.reservation);
      return true;
    } else {
      console.error("Failed to create reservation:", response.message);
      throw new Error(response.message);
    }
  } catch (error) {
    const errorMessage =
      error.message || "An error occurred during reservation creation";
    console.error("Failed to create reservation:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const createDeliveryOrder = async (order: {
  driver_id: string;
  ride_id: string;
  status: string;
  price: number;
  recipient_name: string;
  recipient_address: string;
  recipient_phone: string;
  weight: number;

}) => {

  try {
    const response = await reservationService.createDeliveryOrder(order);
    if (response.status !== "error") {
      setRecoil(reservationState, response.deliveryOrder);
      return true;
    } else {
      console.error("Failed to create delivery order:", response.message);
      throw new Error(response.message);
    }
  } catch (error) {
    const errorMessage =
      error.message || "An error occurred during delivery order creation";
    console.error("Failed to create delivery order:", errorMessage);
    throw new Error(errorMessage);
  }
};

