import Api from "@/service/Api";
import { ICreateTokenRequest } from "@/types";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export async function createToken(data: ICreateTokenRequest) {
    const res = await Api({
        method: "POST",
        url: `${apiUrl}/security/createToken`,
        data,
    });

    return res;
}