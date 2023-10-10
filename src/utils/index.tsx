const convertDate = (date: string) => {
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return new Date(date).toLocaleDateString('en-US', options);
}
const convertTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if(hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
}
export { convertDate, convertTime }