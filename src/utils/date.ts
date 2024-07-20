export const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('T')[0].split('-');
    if (!day || !month || !year) return dateString;
    return `${day}.${month}.${year}`;
};

export const getDayName = (dateString: string): string => {
    const shortDayName = dateString.split('.').pop();

    if (!shortDayName) {
        return '';
    }

    const dayMapper: { [key: string]: string } = {
        "Pzt": "Pazartesi",
        "Sal": "Salı",
        "Car": "Çarşamba",
        "Per": "Perşembe",
        "Cum": "Cuma",
        "Cmt": "Cumartesi",
        "Paz": "Pazar"
    };

    return dayMapper[shortDayName];
};

export const getCurrentDateTime = (): string => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}