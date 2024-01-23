const useData = () => {
    const data = {
        font: 'font',
        text: 'Naam',
        count: '10',
        totalCount: '12',
    }

    localStorage.setItem('chantData', data);

    return data;
}
export default useData