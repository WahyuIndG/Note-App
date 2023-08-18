let some = 0;

const showFormattedDate = (date) => {
  some++;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export { showFormattedDate };
