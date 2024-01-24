
const useData = () => {
    // Retrieve data from local storage
    const storedData = JSON.parse(localStorage.getItem('chantData'));

    // Set default values if data is not available
    const defaultData = {
        username: 'username',
        font: '',
        text: 'Chant',
        totalCount: 0,
        totalTime: 0,
        hasVisited: false,
    };

    // Merge stored data with default data
    const data = { ...defaultData, ...storedData };

    // Update local storage with merged data
    const updateData = (updatedData) => {
        const newData = { ...data, ...updatedData };
        localStorage.setItem('chantData', JSON.stringify(newData));
    };

    return { ...data, updateData };
};

export default useData;
