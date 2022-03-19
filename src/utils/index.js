export const parsePaths = object => {
  let result = [];
  for (const item in object) {
    let _values = Object.values(object[item]);
    Object.keys(object[item]).map((it, idx) => {
      result.push({
        path: item,
        method: it,
        values: _values[idx],
      });
    })
  }
  return result;
}
