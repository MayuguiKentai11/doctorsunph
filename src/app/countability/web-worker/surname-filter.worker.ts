self.addEventListener('message', (e) =>
{
  // surname-filter.worker.ts
  self.addEventListener('message', (e) => {
    const { surnames, filterValue } = e.data;
    const filteredSurnames = surnames.filter(surname => surname.toLowerCase().includes(filterValue));
    self.postMessage(filteredSurnames);
  }, false);
}, false)
