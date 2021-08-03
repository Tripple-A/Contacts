const dateSeparator = (date) => {
  const editDate = date.split(/[TZ]+/);
  return `${editDate[0]} at ${editDate[1]}`;
};
const updates = (audit) => {
  return Object.entries(audit).map(([key, value]) => {
    return (
      <div>
        <p>
          {key}: From {value[0]} to {value[1]}
        </p>
      </div>
    );
  });
};

export { dateSeparator, updates };
