export const setNextInterval = (dispenserId, slotIndex, interval, setDispensers) => {
    const now = new Date();
    let nextTime = new Date(now);

    switch (interval) {
        case '15min':
            nextTime.setMinutes(now.getMinutes() + 15);
            break;
        case '30min':
            nextTime.setMinutes(now.getMinutes() + 30);
            break;
        case '1hr':
            nextTime.setHours(now.getHours() + 1);
            break;
        case '4hrs':
            nextTime.setHours(now.getHours() + 4);
            break;
        case '6hrs':
            nextTime.setHours(now.getHours() + 6);
            break;
        case '12hrs':
            nextTime.setHours(now.getHours() + 12);
            break;
        case '1day':
            nextTime.setDate(now.getDate() + 1);
            break;
        default:
            nextTime = null;
    }

    setDispensers(prevDispensers =>
        prevDispensers.map(dispenser =>
            dispenser._id === dispenserId
                ? {
                    ...dispenser,
                    slots: dispenser.slots.map((slot, index) =>
                        index === slotIndex ? { ...slot, nextInterval: nextTime } : slot
                    )
                }
                : dispenser
        )
    );

    if (nextTime) {
        const timeout = nextTime - now;
        setTimeout(() => {
            alert(`Time to take your medicine for slot ${slotIndex + 1}`);
        }, timeout);
    }
};