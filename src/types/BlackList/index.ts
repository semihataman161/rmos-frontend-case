interface IBlackList {
    Id: number;
    Adi: string | null;
    Soy: string | null;
    Tcno: string | null;
    Kimlik_no: string | null;
    Dogum_tarihi: string | null;
    Sistem_tarihi: string | null;
    Aciklama: string | null;
    Sistem_grubu: string | null;
    Ulke_xml: string | null;
    Kulanici: string | null;
}

export interface IBlackListTableData extends IBlackList {
    id: number;
    Acenta: string | null;
    Otel_kodu: string | null;
}

export interface IBlackListAddOrUpdateForm extends IBlackList {
}

export interface IBlackListRow extends IBlackList {
    id: number;
}

export interface IBlackListAddOrUpdateRequest extends IBlackList {
    db_Id: string;
}

export interface IBlackListGetRequest {
    db_Id: string;
    Adi: string;
}