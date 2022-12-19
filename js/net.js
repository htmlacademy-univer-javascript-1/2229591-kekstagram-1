export async function get (success, fail) {
  const response = await fetch('https://26.javascript.pages.academy/kekstagram/data').catch(fail);
  const photos = await response.json();
  success(photos);
}

export async function post(data) {
  const response = await fetch('https://26.javascript.pages.academy/kekstagram',{
    method: 'POST',
    body: data
  }).catch(() => false
  );
  return response.ok;
}
