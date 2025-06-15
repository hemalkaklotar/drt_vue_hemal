 export const  saveToLocal = (obj:Record<string, any>) =>{
    console.log("obj",obj)
const cleaned = cleanObject(obj);
 localStorage.setItem('filters', JSON.stringify(cleaned));
}
export const loadFromLocal = (): Record<string, any> => {
  try {
    const raw = localStorage.getItem("filters");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
function cleanObject(obj: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue; 
    }
    cleaned[key] = value;
  }

  return cleaned;
}


export function buildQueryParams(filters: Record<string, any>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      params.append(key, value.join(','));
    } else if (typeof value === 'string' || typeof value === 'number') {
      params.append(key, String(value));
    }
  }

  return params.toString();
}
