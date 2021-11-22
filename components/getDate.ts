export const getDate = (howManyDaysAgo: number) => {
    const dateOfTheDay = new Date();
    dateOfTheDay.setDate(dateOfTheDay.getDate()-howManyDaysAgo);
    const dateOfTheDayString = dateOfTheDay.toISOString().slice(0,10);
    return dateOfTheDayString;
  }