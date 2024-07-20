export const formatNumberByPrecision = (value: number, digitNumber: number): string => {
    return value.toLocaleString('tr-TR', {
        minimumFractionDigits: digitNumber,
        maximumFractionDigits: digitNumber,
    });
};