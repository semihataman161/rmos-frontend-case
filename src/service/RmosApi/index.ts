import Api from "@/service/Api";
import { ICreateTokenRequest } from "@/types/Token";
import { IGetReservationRequest } from "@/types/Forecast";
import { IBlackListGetRequest, IBlackListAddOrUpdateRequest  } from "@/types/BlackList";

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

export async function getReservation(data: IGetReservationRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/Procedure/StpRmforKlasik_2`,
        data,
    });

    return response.data;
}

export async function getBlackList(data: IBlackListGetRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/Kara/Getir_Kod`,
        data,
    });

    return response.data;
}

export async function addOrUpdateBlackList(data: IBlackListAddOrUpdateRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/Kara/Ekle`,
        data,
    });

    return response.data;
}