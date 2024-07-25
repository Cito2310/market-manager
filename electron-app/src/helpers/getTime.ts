export const getTime = () => {
    const date = new Date();
    const dateComplete =    ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear();
    const hourComplete =    ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    return `${dateComplete} ${hourComplete}`;
}