import Api from "@/service/Api";
import { ICreateTokenRequest, IReservationRequest } from "@/types/Requests";

const serviceUrl = import.meta.env.VITE_SERVICE_URL;
const apiUrl = import.meta.env.VITE_API_URL;

export async function createToken(data: ICreateTokenRequest) {
    const response = await Api({
        method: "POST",
        url: `${serviceUrl}/security/createToken`,
        data,
        withCredentials: false,
    });


    return response.data;
}

export async function getReservation(data: IReservationRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/Procedure/StpRmforKlasik_2`,
        data,
    });
    
    return response.data;
}