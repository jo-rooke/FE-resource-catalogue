export function fetchData(url: string, setState: React.SetStateAction<any>) {
  fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => setState(jsonBody.data));
}
