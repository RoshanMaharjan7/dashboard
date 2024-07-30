export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    return `${day} ${month}, ${year}`;
}

export function getTodayDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return {day: day, month: month, year: year};
}

export function checkDateStatus(dateString: string): string {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    if (inputDate < currentDate) {
        return "Closed";
    } else {
        return "Applying";
    }
}


export function getRelativeDate(dateString:string) {
    const inputDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Reset time part for accurate comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    
    const oneWeekFromNow = new Date(today);
    oneWeekFromNow.setDate(today.getDate() + 7);

    if (inputDate.toDateString() === today.toDateString()) {
        return "today";
    } else if (inputDate.toDateString() === tomorrow.toDateString()) {
        return "tomorrow";
    } else if (inputDate > today && inputDate < oneWeekFromNow) {
        return "this week";
    } else {
        return "not within the next week";
    }
}
