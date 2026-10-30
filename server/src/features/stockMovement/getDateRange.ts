const DAY_MS = 24 * 60 * 60 * 1000;

const DEFAULT_RANGE_DAYS = 30;

export const getDateRange = (from?: Date, to?: Date) => {
    const end = to ? new Date(to.getTime() + DAY_MS) : new Date();
    const start = from ?? new Date(end.getTime() - DEFAULT_RANGE_DAYS * DAY_MS);

    return { $gte: start, $lt: end };
};
