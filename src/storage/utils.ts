export function checkStorage(storage: unknown) {
  if (typeof storage !== 'object' || storage === null) {
    throw new Error('Provided storage is invalid')
  }
  const storageObj = storage as { [key: string]: unknown };
  ['get','set','delete','has'].forEach((method) => {
    if (!(method in storageObj) || typeof storageObj[method] !== 'function') {
      throw new Error(`Provided storage does not have method ${method}`)
    }
  })
}