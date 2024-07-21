import Api from "@/service/Api";
import { ICreateTokenRequest } from "@/types/Token";
import { IGetReservationRequest } from "@/types/Forecast";
import { IBlackListGetRequest, IBlackListAddOrUpdateRequest } from "@/types/BlackList";
import { SERVICE_URL, API_URL } from "@/constants/Api";

export async function createToken(data: ICreateTokenRequest) {
    const response = await Api({
        method: "POST",
        url: `${SERVICE_URL}/security/createToken`,
        data,
        withCredentials: false,
    });


    return response.data;
}

export async function getReservation(data: IGetReservationRequest) {
    const response = await Api({
        method: "POST",
        url: `${API_URL}/api/Procedure/StpRmforKlasik_2`,
        data,
    });

    return response.data;
}

export async function getBlackList(data: IBlackListGetRequest) {
    const response = await Api({
        method: "POST",
        url: `${API_URL}/api/Kara/Getir_Kod`,
        data,
    });

    return response.data;
}

export async function addOrUpdateBlackList(data: IBlackListAddOrUpdateRequest) {
    const response = await Api({
        method: "POST",
        url: `${API_URL}/api/Kara/Ekle`,
        data,
    });

    return response.data;
}