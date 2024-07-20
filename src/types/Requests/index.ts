export interface ICreateTokenRequest {
    userName: string;
    password: string;
}

export interface IReservationRequest {
    db_Id: number;
    xRez_Sirket: number;
    xBas_Tar: string;
    xBit_Tar: string;
    xtip: number;
    kon1: string;
    kon2: string;
    xchkFis_Fazla_otel_10: number;
    bas_Yil: number;
    bit_Yil: number;
    fisrci_Kapalioda_10: number;
    xRez_C_W: string;
    xSistem_Tarihi: string;
    xAlis_Tarihi: string;
    sistem_Bas1: string;
    sistem_Bit1: string;
    pmdahil_10: number;
    tip_1: string;
    xFis_Bela_tutar_10: number;
    trace_Dus_10: number;
    cev_01: null;
}

export interface IBlackListRequest {
    db_Id: string;
    Adi: string;
}