export const formatDate = (dateString: string | null): string => {
    if(!dateString) return '';
    const [year, month, day] = dateString.split('T')[0].split('-');
    if(!day || !month || !year) return dateString;
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