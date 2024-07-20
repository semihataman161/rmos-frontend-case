import { IBlackListAddOrUpdateForm } from "@/types/BlackList";

export function initializeBlackListAddOrUpdateForm(): IBlackListAddOrUpdateForm {
    return {
        Id: 0, 
        Adi: null, 
        Soy: null,
        Tcno: null,
        Kimlik_no: null,
        Dogum_tarihi: null,
        Sistem_tarihi: null,
        Aciklama: null,
        Sistem_grubu: null,
        Ulke_xml: null,
        Kulanici: null
    };
}